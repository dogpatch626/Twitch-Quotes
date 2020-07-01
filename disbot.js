const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
  if (message.content === "!ply") {
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      //dispatcher
      const dispatcher = connection.play("media/WHAT A FUCKED UP DAY.mp3");
     
    }
  }
});

dispatcher.destroy();

client.login(process.env.BOT_TOKEN);
