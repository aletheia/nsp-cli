import {emptyDir, ensureDir} from 'fs-extra';
import {readdir as rd} from 'fs';
import {exec as execNoPromise} from 'child_process';
import {promisify} from 'util';
import {showInfo} from '../../util/logger.util';
import {CommandConfig} from '../command-config';

const readdir = promisify(rd);
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
  const shCommand = 'npx cdk init app --language=typescript';
  const cp = await exec(shCommand, {cwd: config.path});
  showInfo(cp.stdout);
};
const updateDirectoryStructure = async (config: CommandConfig) => {};

export class ScaffoldCommand {
  static async execute(config: CommandConfig) {
    console.log(config);
    await createDirectoryIfNotExists(config);
    await initCdkApp(config);
    await updateDirectoryStructure(config);
  }
}
