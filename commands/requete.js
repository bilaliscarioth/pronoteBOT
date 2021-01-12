const {pronote} = require('pronote-api')

module.exports = {
	name: 'requete',
	description: 'Les requêtes à envoyer!',
	execute(message, args, Discord, client) {
		var exampleEmbed = new Discord.MessageEmbed()
			.setAuthor("Pronote-API", "https://upload.wikimedia.org/wikipedia/commons/8/87/Logo-pronote-menu.png")
			.setDescription("Bot fait avec l'aide de Litarvan\npronote-api: https://github.com/Litarvan/pronote-api \nson github : https://github.com/Litarvan")
			.setColor('#000')
			.setTimestamp();
		async function main(){
			if(args[0] != null){
				exampleEmbed = await client.pronoteRequest(client.url,(args[1] || client.username),(args[2] || client.password), args[0], exampleEmbed, message.author.id)	
			}else{
				exampleEmbed.addField(`Les commandes`, `.requete (nte|dvr|edt|infos|login) [identifiant] [mot de passe]`, false);
			}
			return message.channel.send(exampleEmbed);
		}
		main();
	}
};
