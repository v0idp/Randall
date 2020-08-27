const config = require("./../config.json");

exports.run = (client, member) => {
  setTimeout(function() {
    member.guild.fetchAuditLogs({user: member, limit: 1}).then((audit) => {
      if (audit.entries.first().action === 'MEMBER_KICK') {
        const decodedReason = decodeURIComponent(audit.entries.first().reason);
        client.guilds.cache.get(config.logs.guild_id).channels.cache.get(config.logs.channel_id).send({
          embed: {
            color: 16469017,
            author: {
              name: member.guild.name,
              icon_url: member.guild.iconURL()
            },
            description: `**${member.user.username} [${member.user.id}]** was kicked from **${member.guild.name}**` +
              `\n\n__**Reason**__\n${(decodedReason) ?
                decodedReason :
                'no reason provided'}`,
            thumbnail: {
              url: member.user.avatarURL()
            },
            timestamp: new Date()
          }
        });
      }
    });
  }, 10000);
}