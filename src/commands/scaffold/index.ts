import {ensureDir, readdir} from 'fs-extra';
import {exec as execNoPromise} from 'child_process';
import {run as upgradeDeps} from 'npm-check-updates';

import {promisify} from 'util';
import {showInfo} from '../../util/logger.util';
import {CommandConfig} from '../command-config';
import {
  generateAppFile,
  generateStackFile,
  generateStackDirectories,
  generateServiceDirectoryAndFiles,
} from './generate';
import {cleanup} from './remove';
import {updateCdkJson, updateTsconfigJson} from './update';
import {CommandOptionChoiceValue} from '../../models/answer-choice';
import {resolve} from 'path';

const exec = promisify(execNoPromise);

const createDirectoryIfNotExists = async (config: CommandConfig) => {
  const {path} = config;
  showInfo(
    `Checking if ${path} exists. If it dows not exist, it will be created.`
  );
  await ensureDir(path);
  showInfo(`Checking if ${path} is empty`);
  const isEmpty = (await readdir(path)).length === 0;
  if (!isEmpty) {
    throw new Error('Target directory is not empty.');
  }
};

const initCdkApp = async (config: CommandConfig) => {
  const shCommand = 'npx cdk init app --language=typescript --use-npm';
  showInfo('Initializing CDK project..');
  await exec(shCommand, {cwd: config.path});
  showInfo('...done.');
  showInfo('Updating CDK to the latest release..');
  await upgradeDeps({
    packageFile: resolve(config.path, 'package.json'),
    upgrade: true,
  });
  showInfo('...done.');
};

const configureWithGts = async (config: CommandConfig) => {
  const shCommand = 'npx gts init -y';
  showInfo('Configuring with Google GTS...');
  await exec(shCommand, {cwd: config.path});
  showInfo('...done.');
};

const configureWithCRA = async (config: CommandConfig) => {
  const shCommand = 'npx create-react-app client --template typescript';
  showInfo('Configuring with Create React App...');
  await exec(shCommand, {cwd: config.path});
  showInfo('...done.');
};

const installNodeJsFunctionDeps = async (config: CommandConfig) => {
  showInfo(
    'Adding dependency to aws-lambda-nodejs and lambda types definition...'
  );
  await exec('npm i -D  @aws-cdk/aws-lambda-nodejs --force', {
    cwd: config.path,
  });
  showInfo('...done.');
};

const generateClient = async (config: CommandConfig) => {
  // await generateClientDirectoryAndFiles(config);
  await configureWithCRA(config);
};

const generateServices = async (config: CommandConfig) => {
  await installNodeJsFunctionDeps(config);
  await generateServiceDirectoryAndFiles(config);
};

export class ScaffoldCommand {
  static async execute(config: CommandConfig) {
    await createDirectoryIfNotExists(config);
    await initCdkApp(config);
    await configureWithGts(config);
    await generateStackDirectories(config);

    if (config.params) {
      const templates = config.params.template as string[];
      if (templates.includes(CommandOptionChoiceValue.SERVICES)) {
        await generateServices(config);
      }
      if (templates.includes(CommandOptionChoiceValue.CLIENT)) {
        await generateClient(config);
      }
    }
    await generateAppFile(config);
    await generateStackFile(config);
    await updateCdkJson(config);
    await updateTsconfigJson(config);
    await cleanup(config);
    showInfo('Project created successfully.');
  }
}
