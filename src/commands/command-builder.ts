import {CommandChoiceValue} from '../models/answer-choice';
import {scaffoldQuestion} from '../question/scaffold.question';
import {CommandConfig} from './command-config';
import {ScaffoldCommand} from './scaffold';

export class CommandBuilder {
  private config: CommandConfig;
  constructor(config: CommandConfig) {
    this.config = config;
  }

  async fillAdditionalParams(): Promise<CommandBuilder> {
    if (!this.config.params) {
      this.config.params = {};
    }

    if (this.config.command === CommandChoiceValue.SCAFFOLD) {
      const templates = (await scaffoldQuestion()).answer;
      if (templates.length === 0) {
        throw new Error('Please select at least one scaffold option');
      } else {
        this.config.params.template = templates;
      }
    }
    return this;
  }

  async executeCommand() {
    switch (this.config.command) {
      case CommandChoiceValue.SCAFFOLD:
        return ScaffoldCommand.execute(this.config);
    }
  }
}
