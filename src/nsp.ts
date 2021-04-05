import {commandQuestion} from './question/command.question';
import {showError, showTitleAndBanner} from './util/logger.util';

import {appDirectoryQuestion, appNameQuestion} from './question/app.question';
import {CommandConfig, PackageManager} from './commands/command-config';
import {CommandBuilder} from './commands/command-builder';

export async function NSP(): Promise<any> {
  try {
    showTitleAndBanner();

    // const {_: cmdopts} = yargs(process.argv).argv;
    // const params = cmdopts.splice(2);
    // let command = params[0] as string;
    // const options = params[1] as string;

    const commandAnswer = await commandQuestion();
    const appNameAnswer = await appNameQuestion();
    const appDirectoryAnswer = await appDirectoryQuestion(appNameAnswer.answer);

    const commandConfig: CommandConfig = {
      appName: appNameAnswer.answer,
      packageManager: PackageManager.NPX,
      path: appDirectoryAnswer.answer,
      command: commandAnswer.answer,
    };

    const builder = new CommandBuilder(commandConfig);

    await builder.fillAdditionalParams();
    await builder.executeCommand();
  } catch (error) {
    showError(error);
  }
}
