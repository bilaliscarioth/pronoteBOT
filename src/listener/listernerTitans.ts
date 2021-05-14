import {Listener} from 'discord-akairo';
import {Message, User} from 'discord.js';
const socket = require('os');

export default class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready'
		});
	}
	async exec(message : Message) {
		console.log('[Discord] Launch Bot !');
	}
}

module.exports = ReadyListener;
