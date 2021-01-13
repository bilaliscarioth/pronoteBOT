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
client.listeSession = new Map();

require('./listener/lg.js')(client);
require('./listener/connect.js')(client);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	client.user.setActivity("Je suis TuxBot, le bot qui vit avec FSF! ;)");
  const channel = client.channels.cache.find(channel => channel.name === "pwned-devoirs")
  channel.bulkDelete(80);
	setInterval(async () => { 
		for(const [key, value] of client.listeSession){
			const marks = await session.homeworks();
				exampleEmbed.setTitle('Devoirs');
				var devoirJour = "";
				var Jour = marks[0].for;
				for(var i = 0; i < marks.length; i++){
					//Classifiez dans la même journée
					if(Jour.getDay() == marks[i].for.getDay()){
						devoirJour += ` **En: ${marks[i].subject}** :\n  __${marks[i].description}__ \n **Leçon:** ${("Aucune leçon" || 
						marks[i].lesson)}`;
						if(marks[i].files.length >= 1){
							for(let [name, url] of Object.entries(marks[i].files))devoirJour += `**Fichiers:**[${"Fichier"}](${url.url})`;
						}
						devoirJour += "\n\n"
					//Sinon on recommence un tableau
					}else{
						Jour = marks[i].for;
						exampleEmbed.addField(`Devoir pour le ${client.jourSemaine[marks[i].for.getDay() - 1]} ${marks[i].for.getDate()} / ` +
						`${marks[i].for.getMonth() + 1} `,
						` => ${devoirJour}`);
						devoirJour = "";
					}
				}
		}
	}, 60000*60);
    
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
