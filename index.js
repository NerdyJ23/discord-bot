import functions from './functions.js';
import env from "dotenv";
import Discord from "discord.js";
import deployFunctions from './deploy-commands.js';

env.config();

//Set up discord environment
const intents = Discord.GatewayIntentBits;
const client = new Discord.Client({intents: [
	intents.Guilds,
	intents.GuildMembers,
	intents.GuildModeration,
	intents.GuildEmojisAndStickers,
	intents.GuildIntegrations,
	intents.GuildWebhooks,
	intents.GuildInvites,
	intents.GuildMessages,
	intents.GuildMessageReactions,
	intents.DirectMessages,
	intents.DirectMessageReactions,
	intents.MessageContent,
	intents.GuildScheduledEvents,
	intents.AutoModerationConfiguration,
	intents.AutoModerationExecution
]}); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Discord.Events.InteractionCreate, interaction => {
	if (interaction.isChatInputCommand()) {
		console.log(interaction);
		if (interaction.commandName === "reload") {
			console.log("reloading");
			load(client);
		}

		if (client.commands.get(interaction.commandName)) {
			client.commands.get(interaction.commandName).execute(interaction);
		}
	}
});

await load(client);
//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token

async function load(client) {
	client.commands = await functions.init(client);
	await deployFunctions.init(client.commands);
}

