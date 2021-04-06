import {readFile, writeFile} from 'fs-extra';
import {resolve} from 'path';
import {showUpdate} from '../../util/logger.util';
import {CommandConfig, ConfigJson} from '../command-config';

const updateJson = async (
  fileName: string,
  updateFunction: (json: ConfigJson) => ConfigJson,
  config: CommandConfig
) => {
  const jsonFile = resolve(config.path, fileName);
  const json = JSON.parse(await readFile(jsonFile, 'utf-8'));
  const updatedJson = updateFunction(json);
  await writeFile(jsonFile, JSON.stringify(updatedJson, null, 4));
  showUpdate(jsonFile, config.path);
};
export const updateCdkJson = async (config: CommandConfig) => {
  const cdkJsonFile = resolve(config.path, 'cdk.json');
  const cdkJson = JSON.parse(await readFile(cdkJsonFile, 'utf-8'));
  cdkJson.app = 'npx ts-node --prefer-ts-exts stack/app.ts';
  await writeFile(cdkJsonFile, JSON.stringify(cdkJson, null, 4));
  showUpdate(cdkJsonFile, config.path);
};
export const updateTsconfigJson = async (config: CommandConfig) => {
  updateJson(
    'tsconfig.json',
    json => {
      const includeArray = [
        'stack/**/*.ts',
        'services/**/*.ts',
        'client/**/*.ts',
        'test/**/*.ts',
      ];
      json['include'] = includeArray;
      return json;
    },
    config
  );
};
