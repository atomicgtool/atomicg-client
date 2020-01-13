const fs = require('fs-extra');
const chalk = require('chalk');
const requireText = require('require-text');
const defaultModel = requireText('./atomicg.yml', require);

class AtomicGWorkspace {
    constructor() {
        this.modelFile = 'atomicg.yml';
    }

    initModel() {
        //Creates model if it does not exists
        if(!fs.existsSync(this.modelFile)) {
            console.log(chalk.greenBright('Creating default model'));
            //Writing default model in utf8
            fs.writeFileSync(this.modelFile, defaultModel,  'utf8');
        }
        else {
            console.log(chalk.yellow('A model alrready exists, nothing to do here.'));
        }
    }

    readModel() {
        //If the model file exists
        if(fs.existsSync(this.modelFile)) {
            //Read the content of the modelFile in utf8
            return fs.readFileSync(this.modelFile,  'utf8');
        }
        else {
            return false;
        }
    }

    writeFile(fileName, content) {
        console.log(chalk.blue('Creating file: ' + fileName));
        //Create a new file in unexisting folder.
        fs.removeSync(fileName);
        fs.ensureFileSync(fileName);
        //Write the file with the content
        fs.outputFileSync(fileName, content);
    }
}

module.exports = AtomicGWorkspace;
