const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class checkCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'verifyentries',
			'memberName': 'verifyentries',
			'group': 'mods',
			'description': 'command to verify entries in the db',
			'examples': ['check'],
			'guildOnly': true,
		});
	}

	hasPermission(msg) {
		return (msg.guild.id === config.logs.guild_id);
	}

	run (msg) {
			this.client.db.getAllMods().then((allMods) => {
				allMods.forEach(element => msg.reply('Guild: ' + element.guild_id + ' Role: ' + element.role_id));
			}).catch(console.error);
		}
};