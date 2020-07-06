const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
//searching files
const fs = require("fs");
const directory = "media";
var dirBuff = Buffer.from(directory);
var files = fs.readdirSync(directory);
if (files.find((element) => element === `Train1.mp3`) !== undefined) {
  console.log("hellowtf");
}
//searching files
//global variable for dispatcher
var dispatcher = client.voice.createBroadcast();
var connection;
//dispatcher
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
const pre = "!";
//play handler
client.on("message", async (message) => {
  if (message.content.startsWith(pre)) {
    const args = message.content.slice(pre.length).split(" "); //takes string and puts it into array
    console.log(args[0]);
    if (args[0] === "ply") {
      //is ply?
      if (args[1] != null) {
        args[1] = args[1].toLowerCase();
        console.log(args[1]);
        // is arg not null
        // if null jump to the else
        if (
          files.find((element) => element === `${args[1]}.mp3`) !== undefined // check to see if the requested file is in the media folder
        ) {
          if (message.member.voice.channel) {
            connection = await message.member.voice.channel.join();
            //dispatcher

            dispatcher = connection.play(`media/${args[1]}.mp3`);
            dispatcher.on("finish", () => {
              console.log("audio.mp3 has finished playing!");
            });
          } else {
            message.channel.send("Youre not in a channel");
          }
        } else {
          message.channel.send(" Audio clip not found ");
        }
      } else {
        message.channel.send(
          `Needed argument you Pepega ${message.author}  EX: Train1`
        );
      }
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
client.on("message", (message) => {
  if (message.content === "!Yo") {
    message.channel.send(`Yo ${message.author} :squadR:`);
  }
});

client.login(process.env.BOT_TOKEN);
