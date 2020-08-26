const config = require("./../config.json");

exports.run = (client, guild, user) => {
    setTimeout(function() {
        // fetch audit logs
        guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then((audit) => {
            // post unban notification to mod server
            client.guilds.cache.get(config.logs.guild_id).channels.get(config.logs.channel_id).send({
                embed: {
                    color: 65280,
                    author: {
                        name: guild.name,
                        icon_url: guild.iconURL()
                    },
                    description: `**${user.username} [${user.id}]** was unbanned from **${guild.name}**`,
                    thumbnail: {
                        url: user.avatarURL()
                    },
                    timestamp: new Date()
                }
            });
            // remove user ban from database
            client.db.removeBan(guild, user);
        }).catch(console.error);
    }, 10000);
}