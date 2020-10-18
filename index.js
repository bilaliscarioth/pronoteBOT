const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const pronote = require("pronote-api");

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.url = 'https://0840044s.index-education.net/pronote/';
client.jourSemaine = ['Samedi','Lundi', 'Mardi', 'Mercredi', 'Jeudi','Vendredi'];
client.username = undefined;
client.password = undefined;
client.connectedID = undefined;
client.once('ready', () => {
	client.user.setActivity("être un point de relais");
	console.log('[Discord] - Bot connecté!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	if (!client.commands.has(command)) return;

	//Pour être sur que le MDP disparaisse si ce n'est pas dans les MPS du bot
	if(message.channel.type == Discord.GuildChannel){  // 
		message.channel.bulkDelete(1)
	}
	try {
		client.commands.get(command).execute(message, args, pronote, Discord, client);
	}catch (error) {
		console.error(error);
		message.reply('Une erreur a surgit dans le code... \n' + error);
	}
});


/* setInterval(function(){ // à mieux coder...
		const exampleEmbed = new Discord.MessageEmbed()
			.setAuthor("Pronote-API", "https://upload.wikimedia.org/wikipedia/commons/8/87/Logo-pronote-menu.png")
			.setDescription("Bot fait avec l'aide de Litarvan\npronote-api: https://github.com/Litarvan/pronote-api \nson github : https://github.com/Litarvan")
			.setColor('#000')
			.setTimestamp();
		async function main(){
				const session = await pronote.login(client.url, client.username, client.password);				
						exampleEmbed.setTitle('Devoirs')
						const marks = await session.homeworks(); // Récupérer les notes du trimestre
						for(var i = 0; i < marks.length; i++){
								var doIt = marks[i].done;
								if(doIt == false){
										var day = client.jourSemaine[marks[i].for.getDay() - 1]
										exampleEmbed.addField(`__Devoir pour le ${day} ${marks[i].for.getDate()} / ${marks[i].for.getMonth()+1}__`, `\n**${marks[i].subject}** \n ${marks[i].description} \n :x: Pas fait \n [${(marks[i].files.name || "Aucun fichier distribué")}]`, true)		
								}else{
										exampleEmbed.addField(`__Devoir pour le ${day} ${marks[i].for.getDate()} / ${marks[i].for.getMonth()+1}__`, `**${marks[i].subject}** \n ${marks[i].description} \n :white_check_mark: Fait \n [${(marks[i].files.url || "Aucun fichier distribué")}]`, true)		
								}
								client.users.cache.get("464489638858326027").send(exampleEmbed)
						}
		}main().catch(err => {
				if (err.code === pronote.errors.WRONG_CREDENTIALS.code) {
				    console.error('Mauvais identifiants');    
				} else {
				    console.error(err);
				}
		});
},60000*30); */

client.login(token);
