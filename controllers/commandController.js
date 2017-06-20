exports.displayHelp = (message) => {
	const display = `__**F.I.D.O Help**__

**Usage:**
\`\`\`md
!fetch <command> <params>
!fetch list					List all available commands
\`\`\`
`;

	message.channel.send(display);
	return;

};

exports.handleCmd = (message,cmd,params) => {
	message.channel.send(cmd);
	message.channel.send(params);
	console.log(params);
	return;
};