const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class ownerCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'owner',
			'memberName': 'owner',
			'group': 'mods',
			'description': 'get all owner names',
			'examples': ['owner'],
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
			.setDescription(`Randall found ${this.client.guilds.size-1} owner${(this.client.guilds.size === 1) ? '' : 's'}.`);
		this.client.guilds.cache.forEach((guild) => {
			embed.addField(guild.name, `${guild.owner.user.username}#${guild.owner.user.tag}`, true);
		});
		msg.embed(embed);
	}
};