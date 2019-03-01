exports.run = (client, member) => {
    // check if member has any bans
    client.db.getBans(member).then((result) => {
        console.log(result);
        client.db.getMods(member.guild.id).then((res) =>{
            if (res) {
                // notify mods on log guild/channel
            } else {
                // notify anyways without tagging mods
            }
        });
    }).catch(console.error);
}