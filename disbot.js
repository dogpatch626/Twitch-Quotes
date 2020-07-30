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
const exampleEmbed = new Discord.MessageEmbed()
  .setColor("#EA0DFF")
  .setTitle("Twitch Quotes Help")
  .setURL("https://discord.js.org/")
  .setAuthor("Twitch Quotes", "https://imgur.com/283n0HX.png")
  .setDescription("Available sounds")
  .setThumbnail("https://imgur.com/283n0HX.png")
  .addFields(
    { name: "XQC", value: "1 - 4", inline: true },
    { name: "Train", value: "1-2", inline: true },
    { name: "Has", value: "1", inline: true },
    { name: "Ninja", value: "1", inline: true },
    { name: "Summit", value: "1", inline: true },
    { name: "Asmon", value: "1", inline: true },
    { name: "Random", value: "gnomed, jebaited, lost, wtf" }
  )
  .setDescription("Available commands")
  .addFields({ name: "Commands", value: "! + ply, diss, true, Yo, end, help" })
  .setTimestamp();
//.setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");

//channel.send(exampleEmbed);

// random commands
client.on("message", (message) => {
  // if (message.content === "!help") {
  //   message.channel.send(`available commands ${files}`);
  // }
  if (message.content === "!true" || message.content === "!True") {
    message.channel.send("True true, yea thats pretty true. Yea thats true ");
  }
  if (message.content === "!Yo" || message.content === "!yo") {
    message.channel.send(
      `Yo ${message.author} https://static-cdn.jtvnw.net/emoticons/v1/1336756/1.0`
    );
  }
  if (message.content === "!diss") {
    connection = message.member.voice.channel.leave();
    message.channel.send("I enjoyed my stay xqcL");
    console.log("bot has left channel");
  }
  if (message.content === "!end") {
    dispatcher.end();
  }

  if (message.content === "!test") {
    message.channel.send("this is a test");
  }
  if (message.content === "!help") {
    message.channel.send(exampleEmbed);
  }
});
client.on("message", async (message) => {
  if (message.content.startsWith(pre)) {
    const args = message.content.slice(pre.length).split(" ");
    if (args[0] === "poke") {
      var pokemon = args[1];
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/"
      );
      if (response.ok) {
        var pokeData = await response.json();
        const pokeEmbed = new Discord.MessageEmbed()
          .setColor("#EA0DFF")
          .setTitle(pokemon)
          .setURL(pokeData.sprites.front_default)
          .setAuthor("Pokedex", pokeData.sprites.front_default)
          .setDescription("Available sounds")
          .setThumbnail(pokeData.sprites.front_default)
          .addFields(
            {
              name: pokeData.stats[0].stat.name,
              value: pokeData.stats[0].base_stat,
              inline: true,
            },
            {
              name: pokeData.stats[1].stat.name,
              value: pokeData.stats[1].base_stat,
              inline: true,
            },
            {
              name: pokeData.stats[2].stat.name,
              value: pokeData.stats[2].base_stat,
              inline: true,
            },
            {
              name: pokeData.stats[3].stat.name,
              value: pokeData.stats[3].base_stat,
              inline: true,
            },
            {
              name: pokeData.stats[4].stat.name,
              value: pokeData.stats[4].base_stat,
              inline: true,
            },
            {
              name: pokeData.stats[5].stat.name,
              value: pokeData.stats[5].base_stat,
              inline: true,
            }
          )
          .setDescription("Pokemon Stats")
          .addFields({
            name: "Id",
            value: pokeData.id,
          })
          .setTimestamp();

        message.channel.send(pokeEmbed);
      } else {
        message.channel.send(
          "Professor Oak has not seen such pokemon in the wild"
        );
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
