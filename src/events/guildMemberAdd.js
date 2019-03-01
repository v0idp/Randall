exports.run = (client, member) => {
    // retreive any bans from database
    client.db.getBans(member).then((bans) => {
        console.log(bans);
        // make sure member has any bans
        if (bans) {
            // retreive role_id if it's linked to that guild_id
            client.db.getMods(member.guild.id).then((mods) =>{
                if (mods) {
                    // notify mods on log guild/channel
                    // mod.role_id
                } else {
                    // notify anyways without tagging mods
                }
            });
        } // ignore this member if there are no bans
    }).catch(console.error);
}