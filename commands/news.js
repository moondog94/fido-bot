const Command = require('./command');
const NewsAPI = require('newsapi');

const news = new NewsAPI(process.env.NEWS_KEY);

const displaySources = async () => {
	const sources = await news.sources({
		language: 'en'
	});
	let res = '**Usage:** `!fetch news <source-id>`\nIt seems you didn\'t give me a source or an invalid source. Here\'s all the available source:\n\n';
	sources.sources.forEach(source => {
		res += `${source.name}:\t\`${source.id}\`\n`
	})
	return res;
}

const getSourceName = async (src) => {
	const sources = await news.sources({});
	var source = sources.sources.filter(source => {
		return source.id === src;
	});
	return source[0].name;
}

class News extends Command {
	constructor(cmd,params){
		super(cmd,params,'!fetch news <source>	Get the top trending news from multiple sources')
	}

	async runCommand(){
		if(this.params.length <= 0)	return displaySources();
		
		const articles = await news.articles({source: this.params[0], sortBy: 'top'});
		if(articles.code && articles.code === 'sourceDoesntExist')
			return displaySources();
		const source = await getSourceName(articles.source);

		console.log(source);

		let res = `Top Article from **${source}**\n\n`;

		console.log(articles.articles.length)

		articles.articles.forEach(article => {
			res += `__${article.title}__\n<${article.url}>\n\n`
		})
		return res;
	}
}

module.exports = News