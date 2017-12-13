const pathExists = require('file-exists');
const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.handleCmd = async (message,cmd='help',params=[]) => {
	let cmdClass;

	/*special shortcuts*/
	if(cmd.charAt() == '@') { // !fetch @[twitter handle]
		params = [cmd.substring(1)]	
		cmd = 'twitter';
	} 
	/*******************/


	if(pathExists.sync(`${__dirname}/../commands/${cmd}.js`))
		cmdClass = require(`../commands/${cmd}`)
	else {
		cmdClass = require('../commands/command')
		message.channel.send('https://media.giphy.com/media/Ieo5EZ5jxJhrG/giphy.gif\nHmmm....I don\'t seem to recognize that command.')
	}

	/*special easter eggs*/
	if(params[0] === 'realDonaldTrump') {
		message.channel.send('Do I have really have to fetch from *him*?')
		setTimeout(() => {
			message.channel.send('*...ugh*')
			setTimeout(() => {
				message.channel.send('Fine. Here:\n')
				const Twitter = require('../commands/twitter');
				const twit = new Twitter(cmd,params);
				twit.runCommand()
					.then(res =>{
						message.channel.send(res);
					})
				
			}, 1500);
		}, 3000);
		return;
	}
	/*********************/

	if (cmd === 'answer')
		message.channel.send('*Thinking...*')

	const Cmd = new cmdClass(cmd,params);
	let res = ''
	if(cmd === 'ow' || cmd === 'me'){
		const author = await User.findOne({ snowflake: message.author.id })
		if(!author) {
			message.channel.send('UH-OH! Seems like you never asked me to save that information or I don\'t that specific username saved. Just DM me with `help` for more information how to command me to remember your usernames. :dog:')
			return;
		}
		let embed = await Cmd.runCommand(author)
		message.channel.send({embed})
		return

	}
	else {
		res = await Cmd.runCommand();
	}

	message.channel.send(res);
};