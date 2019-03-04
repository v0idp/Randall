const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const fs = require('fs');

class BotClient extends Commando.Client {
	constructor (db, token, ownerid, commandprefix) {
		super({
			"owner": (ownerid) ? ownerid : null,
			"commandPrefix": (commandprefix) ? commandprefix : '$'
		});
		this.db = db;
		this.token = token;
		this.isReady = false;
	}

	init () {
		// dynamically register our events based on the content of the events folder
		fs.readdir("./src/events/", (err, files) => {
			if (err) return console.error(err);
			files.forEach(file => {
				let eventFunction = require(`./events/${file}`);
				let eventName = file.split(".")[0];
				this.on(eventName, (...args) => eventFunction.run(this, ...args));
			});
		});

		// set provider sqlite so we can actually save our config permanently
		this.setProvider(
			sqlite.open(path.join(__dirname.slice(0, -3), 'data/BotSettings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
		).catch(console.error);

		// first we register groups and commands
		this.registry
			.registerDefaultGroups()
			.registerGroups([
				['everyone', 'Everyone'],
				['mods', 'Mods']
			])
			.registerDefaultTypes()
			.registerDefaultCommands({
				'help': true,
				'prefix': false,
				'ping': false,
				'eval_': false,
				'commandState': false,
				'unknownCommand': false
			}).registerCommandsIn(path.join(__dirname, 'commands'));

		// login client with bot token
		return this.login(this.token);
	}

	deinit () {
		this.isReady = false;
		return this.destroy();
	}
}

module.exports = BotClient;