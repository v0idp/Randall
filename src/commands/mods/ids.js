const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class idsCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'ids',
			'memberName': 'ids',
			'group': 'mods',
			'description': 'get all guild ids',
			'examples': ['ids'],
			'guildOnly': true
		});
	}

	hasPermission(msg) {
		return (msg.member.roles.cache.has(config.mods)
			&& msg.guild.id === config.logs.guild_id);
	}

	run (msg, args) {
		let embed = new Discord.MessageEmbed()
			.setAuthor(this.client.user.username)
			.setColor(3447003)
			.setTimestamp()
			.setDescription(`Randall found ${this.client.guilds.cache.size-1} guild${(this.client.guilds.cache.size === 1) ? '' : 's'}.`);
		this.client.guilds.cache.forEach((guild) => {
			embed.addField(guild.name, `${guild.id}`, true);
		});
		msg.embed(embed);
	}
};