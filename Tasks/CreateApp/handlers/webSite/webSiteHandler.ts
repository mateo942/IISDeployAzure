import HanderBase from '../handerBase';
import path from 'path';

export default class WebSiteHandler extends HanderBase {

    public exists(name: string): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
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

    public create(name: string, options: WebsiteOptions) {
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
