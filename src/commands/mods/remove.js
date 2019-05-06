const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class removeCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'remove',
			'memberName': 'remove',
			'aliases': ['unlink'],
			'group': 'mods',
			'description': 'remove/unlink mods from notifications',
			'examples': ['remove 123456789'],
			'guildOnly': true,

			'args': [
				{
					'key': 'role',
					'prompt': 'what is the ID of the role you want to remove ?',
					'type': 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return (msg.member.roles.has(config.mods)
			&& msg.guild.id === config.logs.guild_id);
	}

	run (msg, args) {
		this.client.db.removeMods(args.role).then((res) => {
			return msg.reply(res);
		}).catch((err) => {
			return msg.reply(err);
		});
	}
};