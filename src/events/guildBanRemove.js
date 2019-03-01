exports.run = (client, guild, user) => {
    client.db.removeBan(guild, user);
}