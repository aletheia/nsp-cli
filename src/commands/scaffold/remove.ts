import {remove} from 'fs-extra';
import {showDelete} from '../../util/logger.util';
import {CommandConfig} from '../command-config';

const removeFileOrPath = async (toDelete: string) => {
  await remove(toDelete);
  showDelete(toDelete);
};
export const cleanup = async (config: CommandConfig) => {
  await removeFileOrPath(`${config.path}/bin`);
  await removeFileOrPath(`${config.path}/lib`);
  await removeFileOrPath(`${config.path}/src`);
};
