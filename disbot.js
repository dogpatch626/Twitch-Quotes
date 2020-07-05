const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

var dispatcher = client.voice.createBroadcast();
var connection;
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//play handler
client.on("message", async (message) => {
  if (message.content === "!ply") {
    if (message.member.voice.channel) {
      connection = await message.member.voice.channel.join();
      //dispatcher
      dispatcher = connection.play("media/WHAT A FUCKED UP DAY.mp3");
      dispatcher.on("finish", () => {
        console.log("audio.mp3 has finished playing!");
      });
    }
  }
});
//play handler

client.on("message", (message) => {
  if (message.content === "!end") {
    dispatcher.end();
  }
});

client.on("message", (message) => {
  if (message.content === "!diss") {
    connection = message.member.voice.channel.leave();
    console.log("bot has joined channel");
  }
});
client.login(process.env.BOT_TOKEN);
