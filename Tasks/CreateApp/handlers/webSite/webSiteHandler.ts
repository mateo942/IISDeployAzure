import HanderBase from '../handerBase';
import path from 'path';
import tl = require('azure-pipelines-task-lib/task');

export default class WebSiteHandler extends HanderBase {

    public execute(): void {
        let name = tl.getInput("webSiteName") as string;
        let options = {
            physicalPath: tl.getInput("webSitePhysicalPath") as string,
            appPoolName: tl.getInput("webSiteAppPoolName") as string,
            thumbPrint: tl.getInput("webSiteThumbPrint") as string,
            binding: tl.getInput("webSiteBinding") as string,
            port: Number(tl.getInput("webSitePort"))
        } as WebsiteOptions;

        if (this.exists(name)) {
            this.update(name, options);
        } else {
            this.create(name, options);
        }
    }

    private exists(name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
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

    private create(name: string, options: WebsiteOptions) {
        console.log(`Adding website: ${name}...`);
        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "create.ps1"));
        tool.arg(`-name '${name}'`);
        tool.arg(`-poolName '${options.appPoolName}'`);
        tool.arg(`-physicalPath '${options.physicalPath}'`);
        tool.arg(`-binding ${options.binding}`);

        tool.argIf(options.port, `-port ${options.port}`);

        tool.execSync(this.getToolOptions());
        console.log("[✓] Added");
    }

    public update(name: string, options: WebsiteOptions) {
        console.log(`Updating website: ${name}...`);

        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "update.ps1"));
        tool.arg(`-name '${name}'`);
        tool.arg(`-poolName '${options.appPoolName}'`);
        tool.arg(`-physicalPath '${options.physicalPath}'`);
        tool.arg(`-binding ${options.binding}`);

        tool.argIf(options.port, `-port ${options.port}`);

        tool.execSync(this.getToolOptions());
        console.log("[✓] Updated");
    }
}

export interface WebsiteOptions {
    physicalPath: string;
    appPoolName: string;
    thumbPrint: string;
    binding: string;
    port: number;
}
