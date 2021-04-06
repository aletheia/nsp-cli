import {mkdirp, readFile, writeFile} from 'fs-extra';
import {resolve} from 'path';
import Handlebars from 'handlebars';
import camelcase from 'lodash.camelcase';
import {showCreate, showInfo} from '../../util/logger.util';
import {CommandConfig} from '../command-config';
import {join} from 'path';

export const generateStackDirectories = async (config: CommandConfig) => {
  showInfo('Generating directory structure...');
  await mkdirp(join(config.path, 'stack/lib'));
  showInfo('...done.');
};

// export const generateClientDirectoryAndFiles = async (
//   config: CommandConfig
// ) => {
//   showInfo('Generating client directory structure...');
//   const clientPath = join(config.path, 'client');
//   await mkdirp(clientPath);
//   showInfo('...done.');
// };

export const generateServiceDirectoryAndFiles = async (
  config: CommandConfig
) => {
  showInfo('Generating services directory structure...');
  const lambdaPath = join(config.path, 'services/lambda/hello');
  await mkdirp(lambdaPath);
  await generateFileFromTemplate(
    `${lambdaPath}/index.ts`,
    'lambda.template.hbs',
    config
  );
  showInfo('...done.');
};

const generateFileFromTemplate = async (
  fileName: string,
  templateFileName: string,
  config: CommandConfig
) => {
  const appTemplate = await readFile(
    resolve(__dirname, `./../../../templates/${templateFileName}`),
    'utf-8'
  );
  const template = Handlebars.compile(appTemplate);
  const appFile = template({
    name: camelcase(config.appName),
    params: config.params,
  });
  const destinationDir = resolve(config.path, 'stack');
  const appFileName = fileName;
  await writeFile(appFileName, appFile);
  showCreate(appFileName, destinationDir);
};
export const generateAppFile = async (config: CommandConfig) => {
  const destinationDir = resolve(config.path, 'stack');
  await generateFileFromTemplate(
    `${destinationDir}/app.ts`,
    'app.template.hbs',
    config
  );
};
export const generateStackFile = async (config: CommandConfig) => {
  const destinationDir = resolve(config.path, 'stack/lib');
  const appFileName = `${destinationDir}/${config.appName}-stack.ts`;
  await generateFileFromTemplate(appFileName, 'app-stack.template.hbs', config);
};
