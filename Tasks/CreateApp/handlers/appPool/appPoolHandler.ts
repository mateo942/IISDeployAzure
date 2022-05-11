import HanderBase from '../handerBase';
import path from 'path';

export default class AppPoolHandler extends HanderBase {

    public exists(name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-poolName ${name}`);

        let result = tool.execSync(this.getToolOptions());
        return Boolean(result.code);
    }

    public createPool(name: string, options: AppPoolOptions) {
        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "create.ps1"));
        tool.arg(`-poolName ${name}`);

        tool.argIf(options.use32bit, "-use32bit $true");
        tool.argIf(options.managedRuntimeVersion, `-managedRuntimeVersion ${options.managedRuntimeVersion}`);

        tool.execSync(this.getToolOptions());
    }
}

export interface AppPoolOptions {
    managedRuntimeVersion: string;
    use32bit: boolean;
}