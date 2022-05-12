import HanderBase from '../handerBase';
import path from 'path';
import tl = require('azure-pipelines-task-lib/task');

export default class WebApplicationHandler extends HanderBase {

    public execute(): void {
        let name = tl.getInput("webApplicationName", true) as string;
        let webSiteName = tl.getInput("webApplicationWebSite", true) as string;

        let options = {
            physicalPath: tl.getInput("webApplicationPhysicalPath", true) as string,
            applicationPool: tl.getInput("webApplicationApplicationPool", true) as string,
        } as WebApplicationOptions

        if (this.exists(webSiteName, name)) {
            this.update(webSiteName, name, options);
        } else {
            this.create(webSiteName, name, options);
        }
    }

    private exists(website: string, name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-site ${website}`);
        tool.arg(`-name ${name}`);

        let result = tool.execSync(this.getToolOptions());
        let booleanResult = Boolean(result.code)

        if (booleanResult) {
            console.log("[✓] Exists");
        } else {
            console.log("[X] Not found");
        }

        return booleanResult;
    }

    private create(website: string, name: string, options: WebApplicationOptions) {
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

    private update(website: string, name: string, options: WebApplicationOptions) {
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