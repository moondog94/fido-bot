// Make sure we are running node 7.6+ (Thanks Wes Bos)
const [major, minor] = process.versions.node.split('.').map(parseFloat);
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('⛔️ 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support the latest and greatest things (Async + Await)! Please go to nodejs.org and download version 7.6 or greater. 👌\n ');
  process.exit();
}

//Set environtment variables in variables.env
//YOU MUST PROVIDE YOUR OWN. DO NOT SHARE API KEYS!
require('dotenv').config({ path: 'variables.env' });

/*
//Database and Model setup will be here if required
const mongoose = require('mongoose')
etc.....
*/

//Get discord.js and login to FIDO
const Discord = require('discord.js');
const client = new Discord.Client();

/*
	Rules/Commands for Fido
*/

const commandController = require('./controllers/commandController');

//Get Giphy api
const giphy = require('giphy-api')(process.env.GIPHY_KEY);

//When FIDO is ready to work, let us know! c:
client.on('ready', () => {
	console.log('I am ready');
});

//Handle commands
client.on('message', message => {
	const msg = message.content; //Get message string

	if(msg) {
		//Ignore all other bots. No skynet.
		if (message.author.bot) return;

		//Split up message
		const mess = msg.split(' ');

		//Check if the message if my command prefix "!fetch"
		if(mess[0] === '!fetch') {
			if(mess.length <= 1) { //default to help
				commandController.handleCmd(message);
				return;
			}

			//Get commands and it's parameters
			const cmd = mess[1];
			const params = mess.splice(2);

			//Special case of stick :P
			if(cmd === 'stick'){
				giphy.random('fetch stick dog')
					.then(res => message.reply(res.data.url));
				//console.log(stick);
				return; //We're done with this one
			}

			commandController.handleCmd(message,cmd,params);
		}
	}
});

//Handle 'Who/What are you?' mentions
client.on('message', message => {
	if(!message.isMentioned(client.user)) return; //Skip if not spoken directly to

	if(message.content.match(/\b(good (?:boy|dog|girl)|thank(s?)( you)?(!*))\b/gi)){
		giphy.random('happy dog')
			.then(res => message.reply(res.data.url));

		return;
	}

	const reply = 'Hello! I am the **F**lawless **I**ntelligent **D**og **O**S, but you can call me Fido! I can fetch anything for you from the web. For more information, just use the command `!fetch help`. :dog:'
	message.reply(reply)


});


//Now that we have taken care of our 'rules'. Login In!
client.login(process.env.DISCORD_KEY);
