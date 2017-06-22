const Command = require('./command')
const giphy = require('giphy-api')(process.env.GIPHY_KEY);

class Gif extends Command {
	constructor(cmd, params) {
		super(cmd,params,'!fetch gif [query]	Get a random gif')
	}

	async runCommand(){
		let res = this.params.length <= 0 ? await giphy.random() : await giphy.random(this.params.join(' '));
		return res.data.url;
	}
};

module.exports = Gif;

