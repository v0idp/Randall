const config = require("./../config.json");

exports.run = (client, guild, user) => {
    client.guilds.get(config.settings.log_guild).channels.get(config.settings.log_channel).send({
        embed:{
          color: 16711680,
          author: {
            name: guild.name,
            icon_url: guild.iconURL()
          },
          description: `**${user.username} [${user.id}]** was banned from **${guild.name}**`,
          thumbnail: {
            url: user.avatarURL()
          },
          timestamp: new Date()
        }
      });
}