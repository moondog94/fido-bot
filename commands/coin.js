const Command = require('./command')

class Coin extends Command {
    constructor(cmd, params) {
        super(cmd,params,'!fetch coin    Flip a coin')
    }

    async runCommand(){
        if(Math.random() < .5)
            return "It's heads!\nhttps://userscontent2.emaze.com/images/b3d3b3f1-68cc-4a0f-a300-842b3ab09940/5e2f26ed27b17b9c158d2d4f2a09fbdc.png"
        else
            return "It's tails!\nhttps://userscontent2.emaze.com/images/b3d3b3f1-68cc-4a0f-a300-842b3ab09940/98a581cb96cd01f5b5485e3f70beb950.png"
    }
};

module.exports = Coin;