const Command = require('./command')
const xkcdRequest = require('relevant-xkcd')

class xkcd extends Command {
	constructor(cmd, params) {
		super(cmd,params,'!fetch xkcd [#|random]	Get the current, specific, or random xkcd post')
	}

	async runCommand(){
		let comic;
		if(this.params.length <= 0) 
			comic = await xkcdRequest.fetchCurrent();
		else if(this.params.join(' ') === 'random')
			comic = await xkcdRequest.fetchRandom();
		else {
			if(this.params.join(' ') == 404){
				return 'https://www.explainxkcd.com/wiki/index.php/404:_Not_Found'
			}

			try {
				comic = await xkcdRequest.fetchComic(this.params.join(' '));
			} catch (err) {
				return 'That comic doesn\'t or is invalid. Here\'s a random one though:\nhttps://c.xkcd.com/random/comic/';
			}
		}

		return `Title: *${comic.title}*\n${comic.imageURL}\n<${comic.xkcdURL}>\nAlt: ${comic.altText}`;

	}
};

module.exports = xkcd;

