const Command = require('./command')
const rp = require('request-promise')




class Overwatch extends Command {
    constructor(cmd, params) {
        super(cmd,params,'!fetch ow    Get your Overwatch PC information')
    }

    async runCommand(user) {
        if(!user.battlenet || user.battlenet === 'N/A') 
            return 'UH-OH! Seems like you never asked me to save that information or I don\'t that specific username saved. Just DM me with `help` for more information how to command me to remember your usernames. :dog:'
        
        const battletag = user.battlenet.replace("#", "-")

        const profileURI = `http://ow-api.herokuapp.com/profile/pc/us/${battletag}`
        const statsURI = `http://ow-api.herokuapp.com/stats/pc/us/${battletag}`

        const owProfilePromise = rp(profileURI)
        const owStatsPromise = rp(statsURI)

        const [owProfile, owStats] = await Promise.all([owProfilePromise, owStatsPromise]);

        console.log(owProfile)
        
        var reply = `**Username:** ${owProfile.username}\n`
        reply += `\t**Level:** ${owProfile.level}`
    }
};

module.exports = Overwatch;

