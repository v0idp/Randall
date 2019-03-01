exports.run = (client) => {
    console.log(`BotClient ready and logged in as ${client.user.tag} (${client.user.id}). Prefix set to ${client.commandPrefix}. Use ${this.commandPrefix}help to view the commands list!`);
    client.user.setAFK(true);
    client.user.setActivity(`Snitching on ${client.guilds.size} guilds`, { type: 'PLAYING' });
    client.isReady = true;
}