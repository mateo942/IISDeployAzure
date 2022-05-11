import HanderBase from '../handerBase';
import path from 'path';

export default class WebApplicationHandler extends HanderBase {

    public exists(website: string, name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-site ${website}`);
        tool.arg(`-name ${name}`);

        let result = tool.execSync(this.getToolOptions());
        let booleanResult = Boolean(result.code)

        if(booleanResult){
            console.log("[✓] Exists");
        } else {
            console.log("[X] Not found");
        }

        return booleanResult;
    }

    public create(website: string, name: string, options: WebApplicationOptions) {
        console.log(`Adding web application: ${name}...`);
        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "create.ps1"));
        tool.arg(`-site ${website}`);
        tool.arg(`-name ${name}`);
        tool.arg(`-physicalPath '${options.physicalPath}'`);
        tool.arg(`-applicationPool ${options.applicationPool}`);

        tool.execSync(this.getToolOptions());
        console.log("[✓] Added");
    }

    public update(website: string, name: string, options: WebApplicationOptions) {
        console.log(`Updating web application: ${name}...`);
        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "update.ps1"));
        tool.arg(`-site ${website}`);
        tool.arg(`-name ${name}`);
        tool.arg(`-physicalPath '${options.physicalPath}'`);
        tool.arg(`-applicationPool ${options.applicationPool}`);

        tool.execSync(this.getToolOptions());
        console.log("[✓] Updated");
    }
}

export interface WebApplicationOptions {
    physicalPath: string;
    applicationPool: string;
}