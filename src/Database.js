const sqlite = require('sqlite');
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');

class Database {
    constructor(name) {
        this.path = path.join(__dirname.slice(0, -3), 'data/' + name + '.sqlite3');
        this.database;
    }

    addBan(guild, user, reason) {
        this.db.run('INSERT INTO bans (user_id, username, guild_id, guildname, reason) VALUES(?, ?, ?, ?, ?)',
            [user.id, user.username, guild.id, guild.name, reason]);
    }

    removeBan(guild, user) {
        this.db.run('DELETE FROM bans WHERE user_id=' + user.id + ' AND guild_id=' + guild.id);
    }

    getBans(user) {
        return new Promise(async (resolve, reject) => {
            try {
                let result =  await this.db.get('SELECT * FROM bans WHERE user_id=' + user.id);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    openDB(path) {
        return new Promise(async (resolve, reject) => {
            try {
                let dataPath = __dirname.slice(0, -3) + 'data';
                if (!fs.existsSync(dataPath)) {
                    fs.mkdirSync(dataPath);
                }
                
                const dbPromise = sqlite.open(path, { Promise });
                let database = await dbPromise;
                resolve(database);
            } catch(error) {
                reject(error);
            }
        });
    }

    init() {
        return new Promise(async (resolve, reject) => {
            this.openDB(this.path).then(database => {
                this.database = database;
                this.database.run('CREATE TABLE IF NOT EXISTS bans (ban_id integer primary key asc, user_id integer, username text, guild_id integer, guildname text, reason text)');
                this.database.run('CREATE TABLE IF NOT EXISTS mods (mods_id integer primary key asc, role_id integer, guild_id integer)');
                resolve(this);
            }).catch((err) => reject(err));
        });
    }
}

module.exports = Database;