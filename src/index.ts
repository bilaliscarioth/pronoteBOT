const { AkairoClient, CommandHandler, ListenerHandler} = require('discord-akairo');
import {join as joinPath} from 'path';
import {MessageEmbed} from 'discord.js';

export const commandsHelp = new Map();
export const name = "ⲞⱤⲀҜⲦⲎⲮ";
export const embedTexture = new MessageEmbed({color: "#EE5522", title: name });

class HuntikClient extends AkairoClient {
	public instance =  this;
	constructor(){
		super({}, {});
		/*
		 * On charge les commandes
		 */
		this.commandHandler = new CommandHandler(this, {
			directory: joinPath(__dirname, './commands'),
			prefix: 'cy!',
			loadFilter(file: string){
				return file.endsWith('.js')
			}
		});

		/*
		 * On charge les events 
		 */
		
		this.listenerHandler = new ListenerHandler(this, {
			directory: joinPath(__dirname, './listener'),
			loadFilter(file: string){
				return file.endsWith('.js')
			}
		});
		/*
		 * On lance les Handler
		 */ 
	
		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
		
		//On enregistre les commandes chargés dans l'array
		for(var [id, command] of this.commandHandler.modules){
			console.log(id);
			commandsHelp.set(id, command);
		}
	}
}


const client = new HuntikClient();
client.login(HUNTIK_BOT).catch(console.log(console.error));
