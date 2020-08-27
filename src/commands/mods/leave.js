const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class leaveCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'leave',
			'memberName': 'leave',
			'group': 'mods',
			'description': 'leave a guild',
			'examples': ['leave'],
            'guildOnly': true,
            
            'args': [
				{
					'key': 'guild',
					'prompt': 'what is the ID of the guild you want to leave ?',
					'type': 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return (msg.member.roles.cache.has(config.mods)
			&& msg.guild.id === config.logs.guild_id);
	}

	run (msg, args) {
        this.client.guilds.cache.get(args.guild).leave()
        .then(() => {
            msg.reply("Left the server.");
        })
        .catch((e) => {
            msg.reply(e);
        });
	}
};