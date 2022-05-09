import tl = require('azure-pipelines-task-lib/task');
import fs = require("fs");
import path from "path";


const removeDir = function(dirPath : string) {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath)
  
      if (files.length > 0) {
        files.forEach(function(filename) {
          if (fs.statSync(dirPath + "/" + filename).isDirectory()) {
            removeDir(dirPath + "/" + filename)
          } else {
            fs.unlinkSync(dirPath + "/" + filename)
          }
        })
        fs.rmdirSync(dirPath)
      } else {
        fs.rmdirSync(dirPath)
      }
    } else {
      console.log("Directory path not found.")
    }
  }

async function run() {
    try {
        let sourceDir = tl.getInput('SourceDirectory', true) as string;
        let keep = Number(tl.getInput('Keep', true));
        let pattern = tl.getInput('Pattern', false);

        let dirs = [] as DirInfo[];
        const releases = fs.readdirSync(sourceDir);
        for (let i = 0; i < releases.length; i++) {
            let dirName = releases[i];
            let fullPath = path.join(sourceDir, dirName);

            if (!fs.lstatSync(fullPath).isDirectory())
                continue;

            if (pattern && !dirName.toLocaleLowerCase().startsWith(pattern.toLocaleLowerCase()))
                continue;

            let info = fs.statSync(fullPath);
            let element = {
                fullPath: fullPath,
                name: dirName,
                createdAtMs: info.birthtimeMs
            };
            dirs.push(element);
        }

        console.log(`${dirs.length} found dirs`);
        dirs = dirs.sort(function (a, b) {
            return a.createdAtMs - b.createdAtMs;
        });

        for (let i = 0; i < dirs.length - keep; i++) {
            let dir = dirs[i];
            removeDir(dir.fullPath);
            console.log(`✓ Removed: ${dir.fullPath}`);
        }
    }
    catch (err: any) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();

interface DirInfo {
    fullPath: string;
    name: string;
    createdAtMs: number;
}