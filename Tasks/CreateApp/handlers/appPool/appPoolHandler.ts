import HanderBase from '../handerBase';
import path, { basename } from 'path';

export default class AppPoolHandler extends HanderBase {

    public exists(name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-poolName ${name}`);

        let result = tool.execSync(this.getToolOptions());
        let booleanResult = Boolean(result.code)

        if(booleanResult){
            console.log("[✓] Exists");
        } else {
            console.log("[X] Not found");
        }

        return booleanResult;
    }

    public create(name: string, options: AppPoolOptions) {
        console.log(`Adding app pool: ${name}...`);

        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "create.ps1"));
        tool.arg(`-poolName ${name}`);

        tool.argIf(options.use32bit, "-use32bit $true");
        tool.argIf(options.managedRuntimeVersion, `-managedRuntimeVersion ${options.managedRuntimeVersion}`);

        tool.execSync(this.getToolOptions());
        console.log("[✓] Added");
    }

    public update(name: string, options: AppPoolOptions) {
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