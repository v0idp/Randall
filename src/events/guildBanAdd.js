const config = require("./../config.json");

exports.run = (client, guild, user) => {
  setTimeout(function() {
    // fetch audit logs
    guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then((audit) => {
      // decode any possible encodings in reason (possibly done by DynoBot)
      const decodedReason = decodeURIComponent(audit.entries.first().reason);
      // post ban notification to mod server
      client.guilds.cache.get(config.logs.guild_id).channels.cache.get(config.logs.channel_id).send({
        embed: {
          color: 16711680,
          author: {
            name: guild.name,
            icon_url: guild.iconURL()
          },
          description: `**${user.username} [${user.id}]** was banned from **${guild.name}**` +
            `\n\n__**Reason**__\n${(decodedReason) ?
              decodedReason :
              'no reason provided'}`,
          thumbnail: {
            url: user.avatarURL()
          },
          timestamp: new Date()
        }
      });
      // add user ban to database
      client.db.addBan(guild, user, decodedReason);
    }).catch(console.error);
  }, 10000);
}