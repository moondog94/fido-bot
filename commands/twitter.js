const Command = require('./command')
const rp = require('request-promise')

var options = {
    uri: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
    qs: {
        count: '1'
    },
    headers: {
        'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
    },
    json: true
};

class Twitter extends Command {
    constructor(cmd, params) {
        super(cmd,params,'!fetch twitter [handle]    Get most recent tweet')
    }

    async runCommand(){
        options.qs.screen_name = this.params[0];

        const tweet = await rp(options)

        if(tweet.error)
        {
            return "Oops it seems that twitter account doesn't exist or is not active!"
        }

        console.log(tweet)
        const body = tweet[0].text;
        const uname = tweet[0].user.name
        const timestamp = tweet[0].created_at
        const url = tweet[0].user.url || `https://www.twitter.com/${this.params[0]}`

        return `**${uname}**\n@${this.params[0]}\n<${url}>\n\`\`\`${body}\`\`\`\n${timestamp}`
    }
};

module.exports = Twitter;

