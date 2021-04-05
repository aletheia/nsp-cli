import {basename} from 'path';
import {boolean} from 'yargs';

export interface CommandConfigParam {
  [key: string]: string | boolean | string[];
}

export interface CommandConfig {
  command: string;
  path: string;
  appName: string;
  packageManager: PackageManager;
  params?: CommandConfigParam;
}

export enum PackageManager {
  NPX = 'npx',
}
