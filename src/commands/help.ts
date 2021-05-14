import { Command } from 'discord-akairo';
import { Message, MessageEmbed, User } from 'discord.js';
import {commandsHelp} from '../index';

export default class HelpCommand extends Command {
	constructor(){
		super('help', {
				aliases: ['help'],
				category: 'HORS-ROLEPLAY',
				description: ['']
			});
		}
		async exec(message: Message){
			console.log(commandsHelp);
			var	myEmbed = new  MessageEmbed()
			.setTitle("Aide - Orakthi")
			.setColor('')
			.setDescription("Liste des commmandes disponibles avec votre ami Lok Lambert !")
			for(var [id, alias] of commandsHelp){
				myEmbed.addField(`=> ${alias.category}`, `=> ${alias}`)
			}
			return message.reply(myEmbed);
		}
}

module.exports = HelpCommand;
