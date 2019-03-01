const sqlite = require('sqlite');
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');

class Database {
    constructor(name) {
        this.path = path.join(__dirname.slice(0, -3), 'data/' + name + '.sqlite3');
        this.database;
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