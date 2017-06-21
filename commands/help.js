const Command = require('./command')

class Help extends Command {
	constructor(cmd, params) {
		super(cmd,params,'!fetch help	Display basic usage information for Fido')
	}
};

module.exports = Help;

