import {basename} from 'path';
import {boolean} from 'yargs';

export interface ConfigJson {
  [key: string]: string | boolean | string[] | ConfigJson;
}

export interface CommandConfig {
  command: string;
  path: string;
  appName: string;
  packageManager: PackageManager;
  params?: ConfigJson;
}

export enum PackageManager {
  NPX = 'npx',
}
