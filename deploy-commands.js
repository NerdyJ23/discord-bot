import { REST, Routes } from "discord.js";
import env from "dotenv";

env.config();

async function init(commandsCollection) {
	const rest = new REST().setToken(process.env.CLIENT_TOKEN);
	try {
		//set server commands
		await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.SERVER_ID),
			{ body: commandsCollection.map(command => command.data.toJSON())}
		);
		// console.log(data);
	} catch(e) {
		console.error(e);
	}
};

export default {
	init
}