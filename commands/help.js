import { SlashCommandBuilder } from "discord.js";

async function execute(interaction, commands) {
	if (interaction.options.getString('command')) {
		if (commands.get(interaction.commandName)) {
			const command = commands.get(interaction.commandName);
			let output = `\`\`\`asciidoc\n= ${command.data.name} =\n`;
			output += `description: ${command.data.description}\n`;

			if (command.data.options.length) output += `= options =\n${command.data.options.map(item => `\t${item.name}: ${item.description}`).join('\n')}\n`;

			output += '```';
			interaction.reply({content: output, ephemeral: true});
		} else {
			interaction.reply({content: `command "${interaction.commandName}" not found`});
		}
	} else {
		interaction.reply({content: help(commands), ephemeral: true});
	}
};

function help(commandList) {
	console.log(commandList);
    let output = `\`\`\`asciidoc\nCommand List\n\n[Use /help <commandname> for details]\n`;

	commandList.forEach(command => {
		output += `${command.data.name} :: ${command.data.description}\n`;
	});
	output += '```';
	return output;
};

const conf = {
	enabled: true,
	aliases: []
};

const data = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Shows a help screen or shows help for a specified command")
	.addStringOption(option => option.setName('command').setDescription('The command to find help about'));

export {
	execute,
	data,
	conf
};