const express = require('express');
const path = require('path');
const chalk = require('chalk');
const envFile = require('node-env-file');

const envFilePath = path.join(__dirname + '/settings/settings.env');
const app = express();

try {
    envFile(envFilePath);
} catch (error) {
    console.log(chalk.red("Failed to read env file!: " + envFilePath));
}



app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
app.get('/*', function (req, res) {
    console.log('you hit the server!');
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});


const server = app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, function () {
    console.log( chalk.blue('Server started successfully on [' + process.env.SERVER_HOST + ' : ' + process.env.SERVER_PORT + ']') );
});

