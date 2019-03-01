const commando = require('discord.js-commando');

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
					'type': 'integer'
                },
                {
					'key': 'guild',
					'prompt': 'what is the ID of the guild you want to add ?',
					'type': 'integer'
				}
			]
		});
	}

	run (msg, args) {
        // add/link mod role id and group id to database for future notifications
    }
};