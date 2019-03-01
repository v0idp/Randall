const sqlite = require('sqlite');
const Promise = require('bluebird');
const path = require('path');
const fs = require('fs');

class Database {
    constructor(name) {
        this.path = path.join(__dirname.slice(0, -3), 'data/' + name + '.sqlite3');
        this.db;
    }

    addBan(guild, user, reason) {
        this.db.run('INSERT INTO bans (user_id, username, guild_id, guildname, reason) VALUES(?, ?, ?, ?, ?)',
            [user.id, user.username, guild.id, guild.name, reason]);
    }

    removeBan(guild, user) {
        this.db.run('DELETE FROM bans WHERE user_id=' + user.id + ' AND guild_id=' + guild.id);
    }

    getBans(member) {
        return new Promise(async (resolve, reject) => {
            try {
                let result =  await this.db.get('SELECT * FROM bans WHERE user_id=' + member.id);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    addMods(role_id, guild_id) {
        return new Promise(async (resolve, reject) => {
            try {
                this.getMods(guild_id).then((result) => {
                    if (!result) {
                        this.db.run('INSERT INTO mods (role_id, guild_id) VALUES(?, ?)',
                        [role_id, guild_id]);
                        resolve('mods added and linked to guild.');
                    } else reject('mods already added and linked to guild.');
                }).catch((err) => reject(err));
            } catch (err) {
                reject(err);
            }
        })
    }

    removeMods(role_id) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.run('DELETE FROM mods WHERE role_id=' + role_id).then(() => {
                    resolve('mods removed and unlinked from guild.');
                }).catch((err) => reject('mods couldn\'t be removed. Please check the ID you provided.'));
            } catch (err) {
                reject(err);
            }
        });
    }

    getMods(guild_id) {
        return new Promise(async (resolve, reject) => {
            try {
                let result =  await this.db.get('SELECT * FROM mods WHERE guild_id=' + guild_id);
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
                let db = await dbPromise;
                resolve(db);
            } catch(error) {
                reject(error);
            }
        });
    }

    init() {
        return new Promise(async (resolve, reject) => {
            this.openDB(this.path).then(db => {
                this.db = db;
                this.db.run('CREATE TABLE IF NOT EXISTS bans (ban_id integer primary key asc, user_id text, username text, guild_id text, guildname text, reason text)');
                this.db.run('CREATE TABLE IF NOT EXISTS mods (mods_id integer primary key asc, role_id text, guild_id text)');
                resolve(this);
            }).catch((err) => reject(err));
        });
    }
}

module.exports = Database;