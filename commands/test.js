import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

async function execute(interaction) {
	await interaction.reply({ content: 'is alive', ephemeral: true});
};

const conf = {
	enabled: true,
	aliases: []
};

const data = new SlashCommandBuilder()
	.setName("test")
	.setDescription("Tests if the bot is alive");
	// .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export {
	execute,
	data,
	conf
};