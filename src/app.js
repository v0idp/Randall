const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

// discord event handling
handleEvent(client);
async function handleEvent(client) {
  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
  });
}

client.login(config.settings.token);

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
// client.on("debug", (e) => console.info(e));