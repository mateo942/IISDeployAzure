import HanderBase from '../handerBase';
import path from 'path';
import tl = require('azure-pipelines-task-lib/task');

export default class RestartPoolHandler extends HanderBase {

    public execute(): void {
        let appPoolName = tl.getInput("restartPoolName", true) as string;

        this.restart(appPoolName);
    }

    private restart(name: string): void {
        let tool = this.getPowershell();
        tool.line(path.join(__dirname, "restart.ps1"));
        tool.arg(`-poolName ${name}`);

        tool.execSync(this.getToolOptions());
    }
}