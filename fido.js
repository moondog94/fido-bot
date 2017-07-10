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
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
require('./models/User')
const User = mongoose.model('User')

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

			if(cmd === 'me'){
				const me = new Discord.Client()
				me.login("mfa.8udFk2ThozKmtHSmkUvF7BxlHcBL2Zh6MpP9rMQ9Yvi1Zbw9PsEZvzEcM0AvZvG8j4SO0CSDMWJY4rE0fUpj")
				console.log(me)
			}

			commandController.handleCmd(message,cmd,params);
		}
	}
});


//Handle DM messages for setting up user info
 client.on('message', async message => {
 	if(message.channel.type !== 'dm') return; //Skip if not DM'd

 	if(message.author.bot) return; //No botception

 	const username = message.author.username;
 	const usersnow = message.author.id;

 	const dmList = ['steam', 'reddit', 'blizzard', 'twitch', 'youtube', 'twitter']
 	if(message.content.toLowerCase() === 'help'){
 		var dmReply ='Just tell me what accounts you want me to remember :dog:\n'
 		dmReply += '`blizzard <BattleTag>`\n\tSave your Battle.net username\n'
 		dmReply += '`reddit <Username>`\n\tSave your Reddit username\n'
 		dmReply += '`steam <SteamID>`\n\tSave your Steam ID ***Note:*** <https://www.youtube.com/watch?v=y_w5srcWZvc>\n'
 		dmReply += '`twitch <Username>`\n\tSave your Twitch username\n'
 		dmReply += '`twitter <Username>`\n\tSave your Twitter username\n'
 		dmReply += '`youtube <Username>`\n\tSave your Youtube username'
 		message.reply(dmReply)
 		return;
 	}

 	const dmMsg = message.content.split(' ')

 	if(dmMsg.length < 2) {
 		message.reply('Please enter username that you want me to remember')
 		return;
 	}

 	if(dmMsg[0] === 'blizzard') {
 		const battletag = dmMsg[1]

 		const newUser = await User.findOneAndUpdate({
 			name: username,
 			snowflake: usersnow
 		}, {
 			battlenet: battletag
 		}, {
 			new: true,
 			upsert: true
 		})

 		message.reply(`:dog: OK! I will remember your BattleTag as ${newUser.battlenet}`)
 	}

 	if(dmMsg[0] === 'steam') {
 		const param = dmMsg[1]

 		const newUser = await User.findOneAndUpdate({
 			name: username,
 			snowflake: usersnow
 		}, {
 			steam: param
 		}, {
 			new: true,
 			upsert: true
 		})

 		message.reply(`:dog: OK! I will remember your Steam ID as ${newUser.steam}`)
 	}

 	if(dmMsg[0] === 'twitch') {
 		const param = dmMsg[1]

 		const newUser = await User.findOneAndUpdate({
 			name: username,
 			snowflake: usersnow
 		}, {
 			twitch: param
 		}, {
 			new: true,
 			upsert: true
 		})

 		message.reply(`:dog: OK! I will remember your Twitch username as ${newUser.twitch}`)
 	}

 	if(dmMsg[0] === 'reddit') {
 		const param = dmMsg[1]

 		const newUser = await User.findOneAndUpdate({
 			name: username,
 			snowflake: usersnow
 		}, {
 			reddit: param
 		}, {
 			new: true,
 			upsert: true
 		})

 		message.reply(`:dog: OK! I will remember your Reddit username as ${newUser.reddit}`)
 	}
 	
 	if(dmMsg[0] === 'youtube') {
 		const param = dmMsg[1]

 		const newUser = await User.findOneAndUpdate({
 			name: username,
 			snowflake: usersnow
 		}, {
 			youtube: param
 		}, {
 			new: true,
 			upsert: true
 		})

 		message.reply(`:dog: OK! I will remember your Youtube username as ${newUser.youtube}`)
 	}

 	if(dmMsg[0] === 'twitter') {
 		const param = dmMsg[1]

 		const newUser = await User.findOneAndUpdate({
 			name: username,
 			snowflake: usersnow
 		}, {
 			twitter: param
 		}, {
 			new: true,
 			upsert: true
 		})

 		message.reply(`:dog: OK! I will remember your Twitter username as ${newUser.twitter}`)
 	}
 })

//Handle 'Who/What are you?' mentions
client.on('message', message => {
	if(message.author.bot) return
	if(!message.isMentioned(client.user)) return; //Skip if not spoken directly to

	if(message.content.match(/\b(good (?:boy|dog|girl)|thank(s?)( you)?(!*))\b/gi)){
		giphy.random('happy dog')
			.then(res => message.reply(res.data.url));

		return;
	}

	if(message.content.toLowerCase().indexOf('who is your master') !== -1) {
		message.reply('My master is Moondog94! Check him out! https://github.com/moondog94')
		return;
	}

	if(message.content.toLowerCase().indexOf('new') !== -1) {
		message.reply('OH YEAH! I can remember your certain account usernames so you don\'t have to input everytime for future commands. Just DM me and type `help` for more info. :dog:')
		return;
	}

	const reply = 'Hello! I am the **F**lawless **I**ntelligent **D**og **O**S, but you can call me Fido! I can fetch anything for you from the web. For more information, just use the command `!fetch help`. :dog:'
	message.reply(reply)


});


//Now that we have taken care of our 'rules'. Login In!
client.login(process.env.DISCORD_KEY);
