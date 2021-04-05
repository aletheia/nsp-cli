import 'reflect-metadata';

import {Container} from 'inversify';

import {CLI} from './cli';
import {ScaffoldFullstack} from './template/scaffold/scaffold.template';

export function index(): CLI {
  const container: Container = new Container();

  container
    .bind<ScaffoldFullstack>('ScaffoldFullstack')
    .to(ScaffoldFullstack)
    .inSingletonScope();

  container.bind<CLI>('CLI').to(CLI).inSingletonScope();
  return container.get<CLI>('CLI');
}

index();
