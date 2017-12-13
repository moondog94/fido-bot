const Command = require('./command')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const Discord = require('discord.js')

class Me extends Command {
    constructor(cmd, params) {
        super(cmd,params,'!fetch me    Display all your saved information')
    }

    async runCommand(user){
        const embed = new Discord.RichEmbed()
            .setAuthor(user.name)
            .setColor(0x72a8ff)
            .setDescription("Here's what I remember about you:")
            .addField("Blizzard BattleTag", user.battlenet)
            .addField("Reddit", user.reddit)
            .addField("Steam ID", user.steam)
            .addField("Twitch", user.twitch)
            .addField("Twitter", user.twitter)
            .addField("Youtube", user.youtube)

        return embed
    }
};

module.exports = Me;
