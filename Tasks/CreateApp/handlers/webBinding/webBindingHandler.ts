import HanderBase from '../handerBase';
import path from 'path';
import tl = require('azure-pipelines-task-lib/task');

export default class WebBindingHandler extends HanderBase {

    public execute(): void {
        let name = tl.getInput("webBindingName", true) as string;
        let options = {
            ipAddress: tl.getInput("webBindingIpAddress", false),
            port: Number(tl.getInput("webBindingPort", true)),
            hostName: tl.getInput("webBindingHostName", true),
            protocol: tl.getInput("webBindingProtocol", true),
            thumbPrint: tl.getInput("webBindingThumbPrint", false),
            sslContainer: tl.getInput("webBindingSslContainer", false),
        } as WebsiteBindingOptions

        if (!this.exists(name, options)) {
            this.create(name, options);
        }
    }

    private exists(name: string, options: WebsiteBindingOptions): boolean {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "exists.ps1"));
        tool.arg(`-name ${name}`);
        tool.arg(`-port ${options.port}`);
        tool.arg(`-hostName ${options.hostName}`);
        tool.arg(`-protocol ${options.protocol}`);

        let result = tool.execSync(this.getToolOptions());
        return Boolean(result.code);
    }

    private create(name: string, options: WebsiteBindingOptions) {
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