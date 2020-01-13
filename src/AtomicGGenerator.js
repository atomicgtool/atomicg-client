const chalk = require('chalk');
const AtomicGClient = require('./AtomicGClient');
const AtomicGWorkspace = require('./AtomicGWorkspace');

/**
 * AtomicG Generator
 */
class AtomicGGenerator {
    constructor() {
        this.client = new AtomicGClient();
        this.workspace = new AtomicGWorkspace();

        this.sendModel = this.sendModel.bind(this);
        this.generate = this.generate.bind(this);
    }

    /**
     * Reads and send the model for the current directory to the server.
     */
    sendModel() {
        const modelContent = this.workspace.readModel();
        if(!modelContent) {
            console.log(chalk.red('The model file could not be readed'));
            console.log(chalk.yellow('do you have the \'atomicg.yml\' file in the current folder?'));
        }
        else {
            console.log(chalk.greenBright('Model file \'atomicg.yml\' found.'));
            this.client.sendModel(modelContent)
        }
    }

    /**
     * Generates the source code for the current folder.
     */
    generate() {
        this.client.onNewFile(this.workspace.writeFile);
        this.sendModel();
    }
}

module.exports = AtomicGGenerator;
