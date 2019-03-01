const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class addCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'add',
            'memberName': 'add',
            'aliases': ['link'],
			'group': 'mods',
			'description': 'add/link mods with guild for notifications',
			'examples': ['add 123456789 987654321'],
			'guildOnly': true,

			'args': [
				{
					'key': 'role',
					'prompt': 'what is the ID of the role you want to add ?',
					'type': 'string'
                },
                {
					'key': 'guild',
					'prompt': 'what is the ID of the guild you want to add ?',
					'type': 'string'
				}
			]
		});
    }
    
    hasPermission(msg) {
        return msg.member.roles.has(config.mods);
    }

	run (msg, args) {
        this.client.db.addMods(args.role, args.guild).then((res) => {
			return msg.reply(res);
		}).catch((err) => {
			return msg.reply(err);
		})
    }
};