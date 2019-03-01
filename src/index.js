const BotClient = require('./BotClient.js');
const Database = require('./Database.js');
const config = require("./config.json");

let bot = null;
let start = function () {
    let database = new Database('Bans');
    database.init().then((db) => {
        bot = new BotClient(db, config.general.token, config.general.ownerid, config.general.globalCommandPrefix);
        bot.init().catch(() => { console.error('Failed initializing DiscordBot. Is your token correct?') });
    });
}

start();