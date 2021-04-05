import {resolve} from 'path';

import {injectable} from 'inversify';

import {Answer} from '../../models/answer-choice';

@injectable()
export class ScaffoldFullstack {
  private cwd?: string;
  constructor() {}

  private resolvePath(path?: string) {
    const cwd = process.cwd();
    if (!path) {
      return cwd;
    } else {
      return resolve(cwd, path);
    }
  }

  public scaffoldClient(path?: string): void {}

  public scaffoldServices(path?: string): void {}

  public scaffoldFullstack(path?: string): void {
    this.scaffoldServices(path);
    this.scaffoldClient(path);
  }
}
