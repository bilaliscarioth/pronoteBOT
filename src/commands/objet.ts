import { Command } from 'discord-akairo';
import { Message, MessageEmbed, User } from 'discord.js';
import {commandsHelp, embedTexture} from '../index';

interface Objet {
	name: string,
	desc: string,
	image: string
}

export default class HelpCommand extends Command {
	constructor(){
		super('obj', {
				aliases: ['objets', 'obj', 'object'],
				category: 'UNIVERS HUNTIK',
				description: ['']
			});
		}
		async exec(message: Message){
			embedTexture.setFooter("Mode d'emploi du Chercheur ! :smiley:")
			let obj = require("../../json/objet/objets.json");
			obj.forEach((item:Objet) =>  {
				embedTexture.addField(item.name, item.desc + "\n " + item.image);
			});
			return message.reply(embedTexture);
		}
}

module.exports = HelpCommand;
