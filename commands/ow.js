const Command = require('./command')
const rp = require('request-promise')
const Discord = require('discord.js')


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
        console.log(owProfile)
        // var reply = `**Username:** ${owProfile.username}`
        // reply += `**Level:** ${owProfile.level}\n`
        // reply += '__**Quick Play Stats**__\n'
        var qp = `**Wins:** ${owProfile.games.quickplay.won}\n**Playtime:** ${owProfile.playtime.quickplay}\n**Most Played Hero:** ${owStats.stats.top_heroes.quickplay[0].hero}\n`
        
        var comp = `**Rank:** ${owProfile.competitive.rank}\n`
        comp += `**Wins:** ${owProfile.games.competitive.won}\n`
        comp += `**Lost:** ${owProfile.games.competitive.lost}\n`
        comp += `**Draw:** ${owProfile.games.competitive.draw}\n`
        comp += `**Playtime:** ${owProfile.playtime.competitive}\n`
        comp += `**Most Played Hero:** ${owStats.stats.top_heroes.competitive[0].hero}`

        const embed = new Discord.RichEmbed()
            .setAuthor(user.battlenet, owProfile.competitive.rank_img )
            .setColor(0x72a8ff)
            .setThumbnail(owProfile.portrait)
            .addField("Level", `${owProfile.level}`)
            .addBlankField()
            .addField("Competitive Stats", comp)
            .addBlankField()
            .addField("Quick Play Stats", qp)
            .setFooter("F.I.D.O", "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Emoji_u1f436.svg/2000px-Emoji_u1f436.svg.png")
            .setTimestamp()

        return embed

    }
};

module.exports = Overwatch;

