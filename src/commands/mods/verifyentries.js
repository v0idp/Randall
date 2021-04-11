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

			'args': [
				{
					'key': 'guild',
					'prompt': 'what is the ID of the guild you want to check ?',
					'type': 'string',
					'default': 'all'
				}
			]
		});
	}

	hasPermission(msg) {
		return (msg.guild.id === config.logs.guild_id);
	}

	run (msg, args) {
			this.client.db.getAllMods().then((allMods) => {
				allMods.forEach(element => console.log(element));
				//let res = allMods.find((obj) => msg.member.roles.cache.has(obj.role_id));
				//if (!res) return msg.reply('You need a guild role to use this command.');

/* 				this.client.guilds.cache.get(res.guild_id).members.fetch().then((members) => {
					let member = members.find((member) => member.id === args.member);
					if (!member) return msg.reply('This member is not in your guild.');

					this.client.db.getBans(member).then((bans) => {
						if(bans.length > 0) {
							let embed = new Discord.MessageEmbed()
							.setAuthor(member.guild, member.guild.iconURL())
							.setColor(3447003)
							.setTimestamp()
							.setDescription(`**${member.user.username}** [*${member.user.id}*] was previously banned on other guilds.`)
							.setThumbnail(member.user.avatarURL());
							
							bans.forEach((ban) => {
								embed.addField(`**${ban.guildname}**`, `${(ban.reason) ? `*${ban.reason}*` : '*no reason provided*'}`, true);
							});
		
							return msg.embed(embed);
						} else {
							return msg.reply('This member has no bans.');
						}
					}).catch(console.error);
				}).catch(console.error); */
			}).catch(console.error);
		}
};