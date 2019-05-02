const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class infoCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'info',
			'memberName': 'info',
			'group': 'everyone',
			'description': 'get information about which server Randall is snitching at',
			'examples': ['info'],
			'guildOnly': true
		});
  }
    
	hasPermission(msg) {
		return (msg.guild.id === config.logs.guild_id);
	}

	run (msg, args) {
		let embed = new Discord.MessageEmbed()
			.setAuthor(this.client.user.username)
			.setColor(3447003)
			.setTimestamp()
			.setDescription(`Randall is snitching on ${this.client.guilds.size} guild(s).`);
		let promises = [];
		this.client.guilds.forEach((guild) => {
			if (guild.id !== config.logs.guild_id) {
				promises.push(this.client.db.getBansByGuild(guild).then((result) => {
					embed.addField(guild.name,`${result.length} banned user${(result.length === 1) ? '' : 's'}`, true);
				}).catch(console.error));
			}
		});
		Promise.all(promises).then(() => {msg.embed(embed)});
  }
};