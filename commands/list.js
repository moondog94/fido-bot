const Command = require('./command');
const fs = require('fs');
const promisify = require('es6-promisify');

class List extends Command {
	constructor(cmd, params) {
		super(cmd,params,'!fetch list	List all availabe commands')
	}

	async runCommand() {
		const readdir = promisify(fs.readdir, fs);
		const files = await readdir(__dirname).catch(err => {
			return "UH-OH SOMETHING WENT WRONG"
		});
		let res = '```\n';
		files
		.filter(file => {
			return file !== 'command.js'
		})
		.map(file => {
			return file.slice(0,-3)
		})
		.forEach(file => {
			const cmdClass = require(`./${file}`)
			const command = new cmdClass();
			res += `${command.info}\n`
		})
		res += '```'
		return res;
	}
}
 
module.exports = List;