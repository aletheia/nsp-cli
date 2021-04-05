import inquirer from 'inquirer';
import {basename, join} from 'path';

import {Answer} from '../models/answer-choice';

export async function appNameQuestion(): Promise<Answer> {
  return inquirer.prompt([
    {
      name: 'answer',
      type: 'input',
      message: 'Which is the app name?',
      default: basename(process.cwd()),
    },
  ]);
}

export async function appDirectoryQuestion(appName = ''): Promise<Answer> {
  return inquirer.prompt([
    {
      name: 'answer',
      type: 'input',
      message: 'Where do you want to scaffold the app?',
      default: join(process.cwd(), appName),
    },
  ]);
}
