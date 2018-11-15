const config = require("./../config.json");

exports.run = (client, guild, user) => {
  guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then((audit) => {
    client.guilds.get(config.settings.log_guild).channels.get(config.settings.log_channel).send({
      embed:{
        color: 16711680,
        author: {
          name: guild.name,
          icon_url: guild.iconURL()
        },
        description: `**${user.username} [${user.id}]** was banned from **${guild.name}**` +
          `\n\n__**Reason**__\n${(audit.entries.first().reason) ?
            audit.entries.first().reason :
            'no reason provided'}`,
        thumbnail: {
          url: user.avatarURL()
        },
        timestamp: new Date()
      }
    });
  }).catch(console.error);
}