export interface Answer {
  files: Object;
  answer: string;
}

export interface Choice {
  name: string;
  value: CommandChoiceValue | CommandOptionChoiceValue;
}

export enum CommandChoiceValue {
  SCAFFOLD = 'scaffold',
}

export enum CommandOptionChoiceValue {
  SERVICES = 'services',
  CLIENT = 'client',
}
