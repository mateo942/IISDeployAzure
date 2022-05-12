import tl = require('azure-pipelines-task-lib/task');

import PoolHandler from './handlers/appPool/appPoolHandler';
import WebApplicationHandler from './handlers/webApplication/webApplicationHandler';
import WebSiteHandler from './handlers/webSite/webSiteHandler';
import WebBindingHandler from './handlers/webBinding/webBindingHandler';

async function run() {
  try {
    let command = tl.getInput("command", true);

    switch (command) {
      case "appPool":
        new PoolHandler().execute();
        break;
      case "webSite":
        new WebSiteHandler().execute();
        break;
      case "webApplication":
        new WebApplicationHandler().execute();
        break;
      case "webBinding":
        new WebBindingHandler().execute();
        break;
      default:
        throw new Error(`Invalid command: ${command}`);
    }
  }
  catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();