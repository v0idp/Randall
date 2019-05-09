const Discord = require('discord.js');
const commando = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class checkCommand extends commando.Command {
	constructor (client) {
		super(client, {
			'name': 'check',
			'memberName': 'check',
			'group': 'everyone',
			'description': 'check if your server contains any banned members from another server',
			'examples': ['check'],
			'guildOnly': true,

			'args': [
				{
					'key': 'member',
					'prompt': 'what is the ID of the member you want to check ?',
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
		if (args.member === 'all') {
			this.client.db.getAllMods().then((allMods) => {
				let res = allMods.find((obj) => msg.member.roles.has(obj.role_id));
				if (!res) return msg.reply('You need a guild role to use this command.');

				let banList = [];
				let promises = [];
				this.client.guilds.get(res.guild_id).members.fetch().then((members) => {
					members.forEach((member) => {
						promises.push(this.client.db.getBans(member).then((bans) => {
							if(bans.length > 0) banList.push(bans);
						}).catch(console.error));
					});
					
					Promise.all(promises).then(() => {
						promises = [];
						let embed = new Discord.MessageEmbed()
						.setAuthor(this.client.user.username)
						.setColor(3447003)
						.setTimestamp();

					let fieldString = `**${this.client.guilds.get(res.guild_id).name}** has __**${banList.length}**__ banned member${(banList.length === 1) ? '' : 's'} from other guilds.\n\n`;
					if (banList.length > 0) {
						banList.forEach((bans) => {
							fieldString += `**${bans[0].username}** [*${bans[0].user_id}*]\n`
							bans.forEach(ban => {
								fieldString += `*${ban.guildname}*\n`;
							});
						});
						embed.setDescription(fieldString);
					}

					return msg.embed(embed);
					});
				}).catch(console.error);
			}).catch((err) => {
				return console.log(err);
			});
		} else {
			this.client.db.getAllMods().then((allMods) => {
				let res = allMods.find((obj) => msg.member.roles.has(obj.role_id));
				if (!res) return msg.reply('You need a guild role to use this command.');

				this.client.guilds.get(res.guild_id).members.fetch().then((members) => {
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
				}).catch(console.error);
			}).catch(console.error);
		}
	}
};