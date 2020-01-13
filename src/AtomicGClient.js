
const WebSocketClient = require('websocket').client;
const chalk = require('chalk');

class AtomicGClient {

    constructor() {
        this.client = new WebSocketClient();

        this.connectFailed = this.connectFailed.bind(this);
        this.connect = this.connect.bind(this);
        this.error = this.error.bind(this);
        this.close = this.close.bind(this);
        this.message = this.message.bind(this);

        this.sendPending = this.sendPending.bind(this);

        this.client.on('connectFailed', this.connectFailed);
        this.client.on('connect', this.connect);

        this.client.connect( process.env.ATOMICG_WS_URL || 'wss://server.atomicg.dev/');
        this.toSend = [];
    }

    connectFailed(error) {
        console.log(chalk.bgRed.white('Connect Error: ' + error.toString()));
    }

    connect(connection) {
        console.log(chalk.greenBright('Connection to the server established.'));
        this.connection = connection;
        this.connection.on('error', this.error);
        this.connection.on('close', this.close);
        this.connection.on('message', this.message);

        this.sendPending();
    }

    sendPending() {
        if(this.connection) {
            while(this.toSend.length > 0) {
                console.log(chalk.greenBright('Sending data to the server'));
                this.connection.sendUTF(this.toSend.pop());
            }
        }
    }

    error(error) {
        console.log(chalk.bgRed.white('Error: ' + error.toString()));
    }

    close() {
        console.log(chalk.bgBlue.black('Connection Closed'));
    }

    message(message) {
        console.log(chalk.greenBright('Data from the server received'));
        const msgData = this.parseMessage(message.utf8Data);
        if(msgData.command === 'file') {
            this.handleFileMessage(msgData);
        }
        else if(msgData.command === 'error') {
            this.handleErrorMessage(msgData);
        }
        else if(msgData.command === 'finish') {
            this.handleFinishMessage(msgData);
        }
    }

    handleFileMessage(msgData) {
        const fileData = msgData.body;
        if(fileData) {
            this.onNewFileCallback(fileData.name, fileData.content);
        }
        else {
            console.log(chalk.red('Message from the server has a bad format'));
        }
    }

    handleErrorMessage(msgData) {
        this.error(msgData.bold);
    }

    handleFinishMessage(msgData) {
        this.connection.close();
    }

    sendModel(modelContent) {
        this.toSend.push(modelContent);
        this.sendPending();
    }

    onNewFile(callback) {
        this.onNewFileCallback = callback;
    }

    parseMessage(msg) {
        let idx = msg.indexOf(":");
        // consider that there can be line without a break
        if (idx === -1) {
            return false;
        }
        const command = msg.substr(0, idx);
        const body = msg.substr(idx+1);

        return { command, body: this.parseBody(body) };
    }

    parseBody(msg) {
        let idx = msg.indexOf("\n");
        // consider that there can be line without a break
        if (idx === -1) {
            return msg;
        }
        const name = msg.substr(0, idx);
        const content = msg.substr(idx+1);

        return { name, content };
    }
}

module.exports = AtomicGClient;
