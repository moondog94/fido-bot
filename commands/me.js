const Command = require('./command')
const mongoose = require('mongoose')
const User = mongoose.model('User')

class Me extends Command {
    constructor(cmd, params) {
        super(cmd,params,'!fetch me    Display all your saved information')
    }

    async runCommand(user){
        var reply = `Ok here's what I'm remembering about you:\n`
        reply += `**Name:** ${user.name}\n`
        reply += `**BattleTag:** ${user.battlenet}\n`
        reply += `**Reddit:** ${user.reddit}\n`
        reply += `**Steam ID:** ${user.steam}\n`
        reply += `**Twitch:** ${user.twitch}\n`
        reply += `**Twitter:** ${user.twitter}\n`
        reply += `**Youtube:** ${user.youtube}\n`
        return reply
    }
};

module.exports = Me;
