const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
/*
 *On prépare nos variables
 *
 */

client.url = 'https://0840044s.index-education.net/pronote/';
client.jourSemaine = ['Samedi','Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi'];
client.username = null;
client.password = null;

require('./listener/connect.js')(client)

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setActivity("critiquer Bilal!");
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	//Pour être sur que le MDP disparaisse si ce n'est pas dans les MPS du bot
	if(message.channel.type == Discord.GuildChannel) message.channel.bulkDelete(1);
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return message.reply("Commande innexistante");
	try {
		client.commands.get(command).execute(message, args, Discord, client);
	}catch (error) {
		console.error(error);
		message.reply('Une erreur a surgit dans le code... \n' + error);
	}
});
client.login(token).then(console.log("Pronote bot parait"));
