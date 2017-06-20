const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config({ path: 'variables.env' });

client.on('ready', () => {
	console.log('I am ready');
});

client.on('message', message => {
	if (message.content === 'ping') {
		message.reply('pong');
	}
});



client.login(process.env.DISCORD_KEY);