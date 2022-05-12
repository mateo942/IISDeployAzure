import HanderBase from '../handerBase';
import path from 'path';
import tl = require('azure-pipelines-task-lib/task');

export default class AppPoolHandler extends HanderBase {

    public execute(): void {
        let appPoolName = tl.getInput("appPoolName", true) as string;
        let options = {
            managedRuntimeVersion: tl.getInput("appPoolRuntimeVersion", true) as string,
            use32bit: tl.getBoolInput("appPoolUse32Bit", true) as boolean
        } as AppPoolOptions

        if (this.exists(appPoolName)) {
            this.update(appPoolName, options);
        } else {
            this.create(appPoolName, options);
        }
    }

    private exists(name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-poolName ${name}`);

        let result = tool.execSync(this.getToolOptions());
        let booleanResult = Boolean(result.code)

        if (booleanResult) {
            console.log("[✓] Exists");
        } else {
            console.log("[X] Not found");
        }

        return booleanResult;
    }

    private create(name: string, options: AppPoolOptions) {
        console.log(`Adding app pool: ${name}...`);

        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "create.ps1"));
        tool.arg(`-poolName ${name}`);

        tool.argIf(options.use32bit, "-use32bit $true");
        tool.argIf(options.managedRuntimeVersion, `-managedRuntimeVersion ${options.managedRuntimeVersion}`);

        tool.execSync(this.getToolOptions());
        console.log("[✓] Added");
    }

    private update(name: string, options: AppPoolOptions) {
        console.log(`Updating app pool: ${name}...`);

        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "update.ps1"));
        tool.arg(`-poolName ${name}`);

        tool.argIf(options.use32bit, "-use32bit $true");
        tool.argIf(options.managedRuntimeVersion, `-managedRuntimeVersion ${options.managedRuntimeVersion}`);

        tool.execSync(this.getToolOptions());
        console.log("[✓] Updated");
    }
}

export interface AppPoolOptions {
    managedRuntimeVersion: string;
    use32bit: boolean;
}