const socket = require('os');
const fs = require('fs');
const Discord = require('discord.js');
const config  = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

/*
 *On prépare nos variables pour pronote
 */
client.url = 'https://0840044s.index-education.net/pronote/';
client.jourSemaine = ['Samedi','Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi'];
client.username = null;
client.password = null;

/*
 *Pour voir si une partie est déjà commencer
 */
client.waitList = true;
client.partyCreate = false;
client.composition = ['LG', 'LG', 'CHASSEUR', 'SORCIERE', 'VOYANTE', 'SIMPLE VG'];
client.creatorID = "";
client.roleUsers = new Map();
client.debugLog = false;

/*
 *
 */



require('./listener/connect.js')(client)

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setActivity("Je suis TuxBot, le bot qui vit avec FSF! ;)");
    const channel = client.channels.cache.find(channel => channel.name === "log")
    channel.bulkDelete(80);
    channel.send({embed: {title: "Démarrage de Tuxbot",description: "Instance lancé sur " + socket.hostname()+ " :smile:"}})
    
});

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
	//Pour être sur que le MDP disparaisse si ce n'est pas dans les MPS du bot
	if(message.channel.type == Discord.GuildChannel) message.channel.bulkDelete(2);
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return message.reply("Commande innexistante");
	try {
		client.commands.get(command).execute(message, args, Discord, client, config);
	}catch (error) {
		console.error(error);
		message.reply('Une erreur a surgit dans le code... \n' + error);
	}
});

client.login(config.token).then(console.log("Pronote bot parait"));
