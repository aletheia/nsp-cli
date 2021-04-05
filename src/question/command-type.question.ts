import inquirer from 'inquirer';

import {
  Answer,
  Choice,
  CommandOptionChoiceValue,
} from '../models/answer-choice';

export async function commandTypeQuestion(): Promise<Answer> {
  const listOfOptions: Choice[] = [
    {
      name: 'Template for services app (serverless, CDK)',
      value: CommandOptionChoiceValue.SERVICES,
    },
    {name: 'Template for client app', value: CommandOptionChoiceValue.CLIENT},
    {
      name: 'Template for fullstack app',
      value: CommandOptionChoiceValue.FULLSTACK,
    },
  ];

  return inquirer.prompt([
    {
      name: 'options',
      type: 'list',
      message: 'Which template do you want to use?',
      choices: listOfOptions,
    },
  ]);
}
