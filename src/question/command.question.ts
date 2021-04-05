import inquirer from 'inquirer';

import {Answer, Choice, CommandChoiceValue} from '../models/answer-choice';

export const commandChoices: Choice[] = [
  {
    name: 'Scaffold a new project',
    value: CommandChoiceValue.SCAFFOLD,
  },
];

export const commandOptions: string[] = commandChoices.map(el => el.value);

export async function commandQuestion(): Promise<Answer> {
  return inquirer.prompt([
    {
      name: 'answer',
      type: 'list',
      message: 'Which action do you want to do?',
      choices: commandChoices,
    },
  ]);
}
