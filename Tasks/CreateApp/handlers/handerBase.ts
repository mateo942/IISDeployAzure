import tl = require('azure-pipelines-task-lib/task');
import tr = require('azure-pipelines-task-lib/toolrunner');

export default class HanderBase {
    
    private toolOptions = <tr.IExecOptions>{
        silent: false
    };

    protected getPowershell() : tr.ToolRunner{
        const tool = tl.tool("powershell");

        return tool;
    }

    protected getToolOptions(): tr.IExecOptions{
        return this.toolOptions;
    }

}