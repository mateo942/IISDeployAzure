import tl = require('azure-pipelines-task-lib/task');
import tr = require('azure-pipelines-task-lib/toolrunner');
import { Console } from 'console';


function existsPool(name: string) {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\pool\\exists.ps1");
  tool.arg(`-poolName ${name}`);

  let options = <tr.IExecOptions>{
    silent: true
  };

  let result = tool.execSync(options)
  return Boolean(result.code);
}

function createPool(name: string, options: AppPoolOptions) {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\pool\\create.ps1");
  tool.arg(`-poolName ${name}`);

  tool.argIf(options.use32bit, "-use32bit $true");
  tool.argIf(options.managedRuntimeVersion, `-managedRuntimeVersion ${options.managedRuntimeVersion}`);

  let powershellOptions = <tr.IExecOptions>{
    silent: false
  };

  tool.execSync(powershellOptions);
}

function existsWebsite(name: string) {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\website\\exists.ps1");
  tool.arg(`-name ${name}`);

  let options = <tr.IExecOptions>{
    silent: true
  };

  let result = tool.execSync(options)
  return Boolean(result.code);
}

function createWebsite(name: string, options: WebsiteOptions) {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\website\\create.ps1");
  tool.arg(`-name '${name}'`);
  tool.arg(`-poolName '${options.appPoolName}'`);
  tool.arg(`-physicalPath '${options.physicalPath}'`);
  tool.arg(`-binding ${options.binding}`);

  tool.argIf(options.port, `-port ${options.port}`);

  let powershellOptions = <tr.IExecOptions>{
    silent: false
  };

  tool.execSync(powershellOptions);
}

function existsBinding(name: string, options: WebsiteBindingOptions) {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\website\\existsBinding.ps1");
  tool.arg(`-name ${name}`);
  tool.arg(`-port ${options.port}`);
  tool.arg(`-hostName ${options.hostName}`);
  tool.arg(`-protocol ${options.protocol}`);

  let powershellOptions = <tr.IExecOptions>{
    silent: true
  };

  let result = tool.execSync(powershellOptions)
  return Boolean(result.code);
}

function createBinding(name: string, options: WebsiteBindingOptions) {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\website\\createBinding.ps1");
  tool.arg(`-name ${name}`);
  tool.argIf(options.ipAddress, `-ipAddress ${options.ipAddress}`);
  tool.argIf(options.port, `-port ${options.port}`);
  tool.arg(`-hostName ${options.hostName}`);
  tool.arg(`-protocol ${options.protocol}`);

  tool.argIf(options.thumbPrint, `-thumbPrint ${options.thumbPrint}`);
  tool.argIf(options.sslContainer, `-sslContainer ${options.sslContainer}`);



  let powershellOptions = <tr.IExecOptions>{
    silent: false
  };

  tool.execSync(powershellOptions);
}

function existsWebApplication(website: string, name: string): boolean {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\application\\exists.ps1");
  tool.arg(`-site ${website}`);
  tool.arg(`-name ${name}`);

  let options = <tr.IExecOptions>{
    silent: true
  };

  let result = tool.execSync(options)
  return Boolean(result.code);
}

function createWebApplication(website: string, name: string, options: WebApplicationOptions) {
  var tool = tl.tool("powershell");
  tool.line(".\\helpers\\application\\create.ps1");
  tool.arg(`-site ${website}`);
  tool.arg(`-name ${name}`);
  tool.arg(`-physicalPath '${options.physicalPath}'`);
  tool.arg(`-applicationPool ${options.applicationPool}`);

  let powershellOptions = <tr.IExecOptions>{
    silent: false
  };

  tool.execSync(powershellOptions)
}


async function run() {
  try {
    const poolName = 'Test_Mateusz1';
    const websiteName = 'TestMat';
    const webApplication = "Test1";
    console.log(existsPool(poolName));
    createPool(poolName, <AppPoolOptions>{
      use32bit: true
    });

    console.log(existsWebsite(websiteName));
    createWebsite(websiteName, <WebsiteOptions>{
      physicalPath: 'C:\\AzureEx\\IISDeployAzure\\test\\test test',
      appPoolName: poolName,
      binding: "piatek.dev",
      port: 80
    });

    let bindings = [] as WebsiteBindingOptions[];
    bindings.push(
      {
        port: 80,
        hostName: 'localhost',
        protocol: "http",
        ipAddress: '*',
        thumbPrint: undefined,
        sslContainer: undefined
      }
    );
    bindings.push(
      {
        port: 433,
        hostName: 'localhost',
        protocol: "https",
        ipAddress: '*',
        thumbPrint: '834e05e6e34c137e52776d660b9f69ba3d9081e0',
        sslContainer: 'my'
      }
    );
    bindings.push(
      {
        port: 433,
        hostName: 'mateusz.test.ideo.pl',
        protocol: "https",
        ipAddress: '*',
        thumbPrint: '12a8ce776d0d9839499f05cd5eb5a1e8606c7414',
        sslContainer: 'WebHosting'
      }
    );

    for (let i = 0; i < bindings.length; i++) {
      console.log(existsBinding(websiteName, bindings[i]));

      createBinding(websiteName, bindings[i]);
    }

    console.log(existsWebApplication(websiteName, webApplication));
    createWebApplication(websiteName, webApplication, {
      applicationPool: poolName,
      physicalPath: 'C:\\AzureEx\\IISDeployAzure\\test\\test test'
    });

  }
  catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();

interface AppPoolOptions {
  managedRuntimeVersion: string;
  use32bit: boolean;
}

interface WebsiteOptions {
  physicalPath: string;
  appPoolName: string;
  thumbPrint: string;
  binding: string;
  port: number;
}

interface WebsiteBindingOptions {
  ipAddress: string | undefined;
  port: number;
  hostName: string;
  protocol: string;
  thumbPrint: string | undefined;
  sslContainer: string | undefined;
}

interface WebApplicationOptions{
  physicalPath: string;
  applicationPool: string;
}