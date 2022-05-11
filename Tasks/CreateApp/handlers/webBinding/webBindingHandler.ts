import HanderBase from '../handerBase';
import path from 'path';

export default class WebBindingHandler extends HanderBase {

    public exists(name: string, options: WebsiteBindingOptions): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-name ${name}`);
        tool.arg(`-port ${options.port}`);
        tool.arg(`-hostName ${options.hostName}`);
        tool.arg(`-protocol ${options.protocol}`);

        let result = tool.execSync(this.getToolOptions());
        return Boolean(result.code);
    }

    public create(name: string, options: WebsiteBindingOptions) {
        var tool = this.getPowershell();
        tool.line(path.join(__dirname, "create.ps1"));
        tool.arg(`-name ${name}`);
        tool.argIf(options.ipAddress, `-ipAddress ${options.ipAddress}`);
        tool.argIf(options.port, `-port ${options.port}`);
        tool.arg(`-hostName ${options.hostName}`);
        tool.arg(`-protocol ${options.protocol}`);

        tool.argIf(options.thumbPrint, `-thumbPrint ${options.thumbPrint}`);
        tool.argIf(options.sslContainer, `-sslContainer ${options.sslContainer}`);

        tool.execSync(this.getToolOptions());
    }
}

export interface WebsiteBindingOptions {
    ipAddress: string | undefined;
    port: number;
    hostName: string;
    protocol: string;
    thumbPrint: string | undefined;
    sslContainer: string | undefined;
}