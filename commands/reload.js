import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

const data = new SlashCommandBuilder()
	.setName("reload")
	.setDescription("Reloads command list")
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

const conf = {
	enabled: true
};
export {
	data,
	conf
}