const config = require("./../config.json");

exports.run = (client, guild, user) => {
    setTimeout(function() {
        // fetch audit logs
        guild.fetchAuditLogs({type: 'MEMBER_BAN_REMOVE'}).then((audit) => {
            // post unban notification to mod server
            if (guild.id === '741151746403074070' || guild.id === '413906148153098244'|| guild.id === '247109092567547905') { //if it is a trees server post in their channel otherwise post normally
                client.guilds.cache.get(config.logs.guild_id).channels.cache.get('837717567359156324').send({
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
            } else {
                client.guilds.cache.get(config.logs.guild_id).channels.cache.get(config.logs.channel_id).send({
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
            }
            // remove user ban from database
            client.db.removeBan(guild, user);
        }).catch(console.error);
    }, 10000);
}