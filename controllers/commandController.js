const pathExists = require('file-exists');


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

	const Cmd = new cmdClass(cmd,params);
	const res = await Cmd.runCommand();

	message.channel.send(res);
};