import inquirer from 'inquirer';

import {
  Answer,
  Choice,
  CommandOptionChoiceValue,
} from '../models/answer-choice';

export const scaffoldChoices: Choice[] = [
  {
    name: 'services - a serverless backend project (with CDK)',
    value: CommandOptionChoiceValue.SERVICES,
  },
  {
    name:
      'web client - a React web app hosted on S3 and delivered  through CloudFront (with CDK)',
    value: CommandOptionChoiceValue.CLIENT,
  },
];

export const scaffoldOptions: string[] = scaffoldChoices.map(el => el.value);

export async function scaffoldQuestion(): Promise<Answer> {
  return inquirer.prompt([
    {
      name: 'answer',
      type: 'checkbox',
      message: 'Which app do you want to scaffold?',
      choices: scaffoldChoices,
    },
  ]);
}
