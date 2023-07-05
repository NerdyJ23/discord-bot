
import { Collection } from "discord.js";
import fs from "fs";
import path from "path";

async function init() {
	console.log('initializing functions');
	let commands = new Collection();

	try {
		const files = fs.readdirSync("./commands/");
		console.log(files);
		for (const file of files) {
			console.log(file);
			if (file.endsWith(".js")) {
				const command = await import(`./commands/${file}`);
				console.log(command);
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

function loadFunctions() {

};

export default {
	init
};
