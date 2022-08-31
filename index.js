const fs = require("fs");
const Discord = require('discord.js');

const client = new Discord.Client({
    intents: ['Guilds', 'GuildMessages'],
});

require("dotenv").config();
require('./utils/mongoFunctions')(client);
require('./utils/updateEmbed')(client);

client.mongoose = require('./utils/mongoose');

client.slash = new Discord.Collection();
client.select = new Discord.Collection();

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
});


fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

fs.readdir("./handlers/slash/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let slashName = f.split(".")[0];
        let pull = require(`./handlers/slash/${slashName}`);
        client.slash.set(slashName, pull);
    });
});

fs.readdir("./handlers/select/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(f => {
        let selectName = f.split(".")[0];
        let pull = require(`./handlers/select/${selectName}`);
        client.select.set(selectName, pull);
    });
});

client.mongoose.init();

client.login(process.env.TOKEN);