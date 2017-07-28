const Command = require('./command')

class RunJS extends Command {
    constructor(cmd, params) {
        super(cmd,params,'!fetch runjs [code block snippet]   Execute Javascript code')
    }

    async runCommand(){
        const code = this.params.join(' ')
        
        //First trying to parse code block
        if(code.startsWith('```')) {
            var start_pos = code.startsWith('```javascript') ? code.indexOf('```javascript') + '```javascript'.length : code.indexOf('```') + '```'.length
            var end_pos = code.indexOf('```',start_pos)
            var snippet = code.substring(start_pos,end_pos).trim()
            const result = eval(snippet)
            return '```' + result + '```'
        }
        

        return '`N/A`'
    }
};

module.exports = RunJS;

