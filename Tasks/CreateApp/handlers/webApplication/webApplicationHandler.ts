import HanderBase from '../handerBase';
import path from 'path';

export default class WebApplicationHandler extends HanderBase {

    public exists(website: string, name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-site ${website}`);
        tool.arg(`-name ${name}`);

        let result = tool.execSync(this.getToolOptions());
        return Boolean(result.code);
    }

    public create(website: string, name: string, options: WebApplicationOptions) {
        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "create.ps1"));
        tool.arg(`-site ${website}`);
        tool.arg(`-name ${name}`);
        tool.arg(`-physicalPath '${options.physicalPath}'`);
        tool.arg(`-applicationPool ${options.applicationPool}`);

        tool.execSync(this.getToolOptions());
    }
}

export interface WebApplicationOptions {
    physicalPath: string;
    applicationPool: string;
}