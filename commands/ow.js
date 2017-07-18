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

        var [owProfile, owStats] = await Promise.all([owProfilePromise, owStatsPromise]);

        if(owProfile === 'Not Found')
            return 'UH-OH! Seems like that Battlenet account asked me to remember doesn\'t exist or you don\'t actually Overwatch to have any stats. :('
        
        owProfile = JSON.parse(owProfile)
        owStats = JSON.parse(owStats)

        var reply = `**Username:** ${owProfile.username}`
        reply += `\t**Level:** ${owProfile.level}\n`
        reply += '__**Quick Play Stats**__\n'
        reply += `\t**Wins:** ${owProfile.games.quickplay.won}\n\t**Playtime:** ${owProfile.playtime.quickplay}\n\t**Most Played Hero:** ${owStats.stats.top_heroes.quickplay[0].hero}\n`
        reply += '__**Competitive Stats**__\n'
        reply += `\t**Rank:** ${owProfile.competitive.rank}\n\t`
        reply += `**Wins:** ${owProfile.games.competitive.won}\n\t`
        reply += `**Lost:** ${owProfile.games.competitive.lost}\n\t`
        reply += `**Draw:** ${owProfile.games.competitive.draw}\n\t`
        reply += `**Playtime:** ${owProfile.playtime.competitive}\n\t`
        reply += `**Most Played Hero:** ${owStats.stats.top_heroes.competitive[0].hero}`

        return reply
    }
};

module.exports = Overwatch;

