const {
    readdir,
} = require("fs");
const {
    Client,
    GatewayIntentBits,
} = require('discord.js');

const client = new Client({
    intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    ]
});

var colors = require('colors');

try {
    client.config = require('./config/config.json');
} catch (e) {
    console.log("Config file not found. Please create a config.json file in the config folder.".red);
    process.exit(1);
}

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
    console.log(err.stack);
});

readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    console.log("\n--- Loading Events ---\n".yellow);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
        console.log(`Loading Event: ${file}`.yellow);
    });
    console.log("\n--- End Loading Events ---\n".yellow);
});

readdir("./plugins/", (err, files) => {
    console.log("\n--- Loading Plugins ---\n".blue);
    if (err) return console.error(err);
    files.forEach(file => {
        require(`./plugins/${file}`)(client);
        console.log(`Loaded Plugin: ${file}`.blue);
    });
    console.log("\n--- End Loading Plugins ---\n".blue);
});

client.login(client.config.token);