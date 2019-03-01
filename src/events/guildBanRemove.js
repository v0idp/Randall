exports.run = (client, guild, user) => {
    client.db.removeBan(guild, user);
    // make notification to mod server/channel that user got unbanned
}