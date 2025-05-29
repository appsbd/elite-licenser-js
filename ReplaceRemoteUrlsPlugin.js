const fs = require('fs');
const path = require('path');
const filesUsed=[];
const modifyBuildFiles = (buildDir) => {
    //const buildDir = path.join(__dirname, '../../admin-assets');
    const regex =  /https?:\/\/[^\s"']+\.(svg|js|ttf|css|mp4|mp3)/g;
    const replacement = (match) => `${path.basename(match)}`;

    const replaceInFile = (filePath) => {
        const content = fs.readFileSync(filePath, 'utf-8');
        const matches=content.match(regex);
        const modifiedContent = content.replace(regex, replacement);
        fs.writeFileSync(filePath, modifiedContent, 'utf-8');
        if(matches) {
            matches.forEach((file)=>{
                try {
                    if (!filesUsed[path.basename(filePath)]) {
                        filesUsed[path.basename(filePath)]={
                            baseFile:filePath,
                            files:[],

                        }
                    }
                    filesUsed[path.basename(filePath)].files.push(file+"=>"+ file.replace(regex, replacement));
                }catch (e) {

                }

            });
        }
    };

    const processDirectory = (dir) => {
        fs.readdirSync(dir).forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                processDirectory(filePath);
            } else if (filePath.endsWith('.js') ||filePath.endsWith('.css') || filePath.endsWith('.html')) {
                replaceInFile(filePath);
            }
        });
    };

    processDirectory(buildDir);
   console.log("\n");
   for(var o in filesUsed) {
       console.log(filesUsed[o].baseFile);
       console.log("-".repeat(100));
       filesUsed[o].files.forEach(cfile => {
           console.log(cfile);
       })
       console.log("-".repeat(100));

   }
    console.log('\nPost-build modifications completed\n');
};
class ReplaceRemoteUrlsPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tap('ReplaceRemoteUrlsPlugin', (stats) => {
            if(this.options.is_production) {
                modifyBuildFiles(this.options.buildPath);
            }
           return;
        });
    }
}

module.exports = ReplaceRemoteUrlsPlugin;