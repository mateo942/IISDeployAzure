import tl = require('azure-pipelines-task-lib/task');
import tr = require('azure-pipelines-task-lib/toolrunner');

import PoolHandler, { AppPoolOptions } from './handlers/appPool/appPoolHandler';
import WebApplicationHandler, { WebApplicationOptions } from './handlers/webApplication/webApplicationHandler';
import WebSiteHandler, {WebsiteOptions} from './handlers/webSite/webSiteHandler';
import WebBindingHandler, { WebsiteBindingOptions } from './handlers/webBinding/webBindingHandler';

async function run() {
  try {
    const poolName = 'Test_Mateusz1';
    const websiteName = 'TestMat';
    const webApplication = "Test1";

    let poolHandler = new PoolHandler();
    if(poolHandler.exists(poolName))
    {
      poolHandler.update(poolName, <AppPoolOptions>{
        use32bit: true
      });
    } else {
      poolHandler.create(poolName, <AppPoolOptions>{
        use32bit: true
      });
    }

    let webSiteHandler = new WebSiteHandler();
    console.log(webSiteHandler.exists(websiteName));

    if(webSiteHandler.exists(websiteName)){
      webSiteHandler.update(websiteName, <WebsiteOptions>{
        physicalPath: 'C:\\AzureEx\\IISDeployAzure\\test',
        appPoolName: poolName,
        binding: "piatek.dev",
        port: 80
      });
    } else {
      webSiteHandler.create(websiteName, <WebsiteOptions>{
        physicalPath: 'C:\\AzureEx\\IISDeployAzure\\test\\test test',
        appPoolName: poolName,
        binding: "piatek.dev",
        port: 80
      });
    }
    

    // let bindings = [] as WebsiteBindingOptions[];
    // bindings.push(
    //   {
    //     port: 80,
    //     hostName: 'ateusz.test.ideo.pl',
    //     protocol: "http",
    //     ipAddress: '*',
    //     thumbPrint: undefined,
    //     sslContainer: undefined
    //   }
    // );
    // bindings.push(
    //   {
    //     port: 433,
    //     hostName: 'ateusz.test.ideo.pl',
    //     protocol: "https",
    //     ipAddress: '*',
    //     thumbPrint: '12a8ce776d0d9839499f05cd5eb5a1e8606c7414',
    //     sslContainer: 'WebHosting'
    //   }
    // );
    // bindings.push(
    //   {
    //     port: 433,
    //     hostName: 'mateusz.test.ideo.pl',
    //     protocol: "https",
    //     ipAddress: '*',
    //     thumbPrint: '12a8ce776d0d9839499f05cd5eb5a1e8606c7414',
    //     sslContainer: 'WebHosting'
    //   }
    // );

    // let bindingHandler = new WebBindingHandler();

    // for (let i = 0; i < bindings.length; i++) {
    //   console.log(bindingHandler.exists(websiteName, bindings[i]));

    //   bindingHandler.create(websiteName, bindings[i]);
    // }

    let webApplicationHandler = new WebApplicationHandler();
    console.log();

    if(webApplicationHandler.exists(websiteName, webApplication)){
      webApplicationHandler.update(websiteName, webApplication, {
        applicationPool: poolName,
        physicalPath: 'C:\\AzureEx\\IISDeployAzure\\test'
      });
    } else {
      webApplicationHandler.create(websiteName, webApplication, {
        applicationPool: poolName,
        physicalPath: 'C:\\AzureEx\\IISDeployAzure\\test\\test test'
      });
    }
    

  }
  catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();