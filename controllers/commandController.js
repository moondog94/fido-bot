const pathExists = require('file-exists');


exports.handleCmd = async (message,cmd='help',params=[]) => {
	let cmdClass;

	if(pathExists.sync(`${__dirname}/../commands/${cmd}.js`))
		cmdClass = require(`../commands/${cmd}`)
	else {
		cmdClass = require('../commands/command')
		message.channel.send('https://media.giphy.com/media/Ieo5EZ5jxJhrG/giphy.gif\nHmmm....I don\'t seem to recognize that command.')
	}

	const Cmd = new cmdClass(cmd,params);
	const res = await Cmd.runCommand();

	message.channel.send(res);
};