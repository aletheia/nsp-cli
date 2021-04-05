import inquirer from 'inquirer';

import {Answer, Choice, CommandChoiceValue} from '../models/answer-choice';

export async function commandQuestion(): Promise<Answer> {
  const commands: Choice[] = [
    {
      name: 'Scaffold a new project',
      value: CommandChoiceValue.SCAFFOLD,
    },
  ];
  return inquirer.prompt([
    {
      name: 'command',
      type: 'list',
      message: 'Which action do you want to do?',
      choices: commands,
    },
  ]);
}
