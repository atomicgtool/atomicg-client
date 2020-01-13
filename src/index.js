#!/usr/bin/env node
const yargs = require('yargs');

commands = {
    init: function(argv) {
        const AtomicGWorkspace = require('./AtomicGWorkspace');
        const workspace = new AtomicGWorkspace();
        workspace.initModel();
    },

    generate: function(argv) {
        const AtomicGGenerator = require('./AtomicGGenerator');
        const generator = new AtomicGGenerator();
        generator.generate();
    }
};

const argv = yargs
                .command('$0', 'generates the source code for the model in the current folder.', () => {}, commands.generate)
                .command('init', 'creates a model in the current folder if it does not exists.', () => {}, commands.init)
                .argv;
