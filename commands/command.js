/*This is the base class for a command
  It is abstract and every command will inherit this
  in order to use a runCommand property
*/
class Command {
	constructor(cmd , params , info) {
		this.cmd = cmd || 'help';
		this.params = params || [];
		this.info = info || 'Default Command' //This should never be seen though
	}

	//Default runCommand will be help
	async runCommand() {
		return `__**F.I.D.O Help**__

**Usage:**
\`\`\`md
!fetch <command> <params>
!fetch list					List all available commands
\`\`\`
`;
	}


}

module.exports = Command