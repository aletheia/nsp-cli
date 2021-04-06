import {red, green, cyan, blue, yellow} from 'kleur';
import * as figlet from 'figlet';

import {ConsoleMessage} from '../models/console-messages';

const newLine = '';

export const showTitleAndBanner = (): void => {
  console.log(
    blue(
      figlet.textSync(ConsoleMessage.TITLE, {
        horizontalLayout: 'full',
        verticalLayout: 'default',
        font: 'Standard',
      })
    )
  );
  console.info(cyan(ConsoleMessage.BANNER));
};

export const showError = (message: string | Error): void => {
  console.error(red(ConsoleMessage.ERROR) + message);
};

export const showSuccess = (message: string): void => {
  console.log(green(ConsoleMessage.SUCCESS) + message + newLine);
};

export const showInfo = (message: string): void => {
  console.info(blue(ConsoleMessage.INFO) + message + newLine);
};

export const showGenerate = (fileName: string): void => {
  console.log(cyan(ConsoleMessage.GENERATE) + `${fileName}...`);
};

export const showCreate = (fileName: string, filePath: string): void => {
  filePath
    ? console.log(green(ConsoleMessage.CREATE) + `${fileName} in ${filePath}`)
    : console.log(green(ConsoleMessage.CREATE) + `${fileName}`);
};

export const showDelete = (fileOrPath: string): void => {
  console.info(yellow(ConsoleMessage.DELETE) + fileOrPath + newLine);
};

export const showUpdate = (fileName: string, filePath: string): void => {
  filePath
    ? console.log(green(ConsoleMessage.UPDATE) + `${fileName} in ${filePath}`)
    : console.log(green(ConsoleMessage.UPDATE) + `${fileName}`);
};
