const Discord = require("discord.js");
const client = new Discord.Client();
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();
//searching files
//do more!
const fs = require("fs");
const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require("constants");
const directory = "media";
var dirBuff = Buffer.from(directory);
var files = fs.readdirSync(directory);
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
    message.channel.send("I enjoyed my stay xqcL");
    console.log("bot has left channel");
  }
});
client.on("message", (message) => {
  if (message.content === "!Yo" || message.content === "!yo") {
    message.channel.send(
      `Yo ${message.author} https://static-cdn.jtvnw.net/emoticons/v1/1336756/1.0`
    );
  }
});

client.on("message", (message) => {
  if (message.content === "!help") {
    message.channel.send(`available commands ${files}`);
  }
  if (message.content === "!true" || message.content === "!True") {
    message.channel.send("True true, yea thats pretty true. Yea thats true ");
  }
});

client.login(process.env.BOT_TOKEN);
