const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class syncCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'sync',
            'memberName': 'sync',
			'group': 'mods',
			'description': 'sync all bans on the server',
			'examples': ['sync 123456789'],
			'guildOnly': true,

			'args': [
				{
					'key': 'guild',
					'prompt': 'what is the ID of the guild you want to sync ?',
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
        try {
            this.client.guilds.get(args.guild).fetchBans().then((bans) => {
                this.client.db.syncBans(this.client.guilds.get(args.guild), bans).then((res) => {
                    return msg.reply(res);
                }).catch((err) => {
                    return msg.reply(err);
                });
            }).catch(console.error);
        } catch (err) {
            return msg.reply(err);
        }
    }
};