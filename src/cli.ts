import {inject, injectable} from 'inversify';

import {ScaffoldFullstack} from './template/scaffold/scaffold.template';

import {commandQuestion, commandTypeQuestion} from './question';
import {Answer} from './models/answer-choice';

@injectable()
export class CLI {
  constructor(
    @inject('ScaffoldFullstack') private scaffold: ScaffoldFullstack
  ) {
    this.executeCLI();
  }
  public async executeCLI(): Promise<any> {
    const commandAnswer: Answer = await commandQuestion();
    console.log(commandAnswer);
  }
}
