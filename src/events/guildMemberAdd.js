const Discord = require('discord.js');
const config = require("./../config.json");

exports.run = (client, member) => {
    // retreive any bans from database
    client.db.getBans(member).then((bans) => {
        // make sure member has any bans
        if (bans.size > 0) {
            // retreive role_id if it's linked to that guild_id
            client.db.getMods(member.guild.id).then((mods) =>{
                let embed = new Discord.MessageEmbed()
                .setAuthor(member.guild, member.guild.iconURL())
                .setColor(3447003)
                .setTimestamp()
                .setDescription(`**Attention!** ${member.user.username} was previously banned` +
                    ` on other servers and joined **${member.guild.name}**. Please keep an eye on him.`)
                .setThumbnail(member.user.avatarURL());

                // populate all bans into fields and add them to the embed
                bans.forEach((ban) => {
                    embed.addField(`**${ban.guildname}**`, `${(ban.reason) ? `*${ban.reason}*` : '*no reason provided*'}`);
                });
                if (mods) {
                    client.guilds.get(config.logs.guild_id).channels.get(config.logs.channel_id).send(`<@&${mods.role_id}>`);
                }
                client.guilds.get(config.logs.guild_id).channels.get(config.logs.channel_id).send(embed);
            });
        } // ignore this member if there are no bans
    }).catch(console.error);
}