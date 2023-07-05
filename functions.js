
import { Collection } from "discord.js";
import fs from "fs";

async function init() {
	let commands = new Collection();

	try {
		const files = fs.readdirSync("./commands/");
		for (const file of files) {
			if (file.endsWith(".js")) {
				const command = await import(`./commands/${file}`);

				if (command.conf.enabled && 'execute' in command) {
					commands.set(command.data.name, command);
				}
			};
		}
	} catch(e) {
		console.error(e);
	}
	return commands;
};

export default {
	init
};
