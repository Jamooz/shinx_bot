//where bulk of code goes, learned from https://www.youtube.com/watch?v=1jtAWZK3Bbk
const Discord = require("discord.js");
require("dotenv").config();

const generateImage = require("./generateImage"); //importing generateImage func from generateImage.js
const { MessageEmbed } = require("discord.js");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`); //prints username of bot logging in with
  client.channels.cache
    .get("930517988732465153")
    .send({ embeds: [onlineEmbed] });
});

client.on("messageCreate", (message) => {
  //trigger word replies with selected response
  if (message.content == "hi") { 
      message.reply("Hello World!");
  }
  if (message.content == "who are you?") {
    message.reply(
      "Hello! I am shinx bot, a learning discord bot created by Jamoo!"
    );
  }
});

client.on("messageCreate", (message) => {
  if (message.content == "embed") {
    client.channels.cache
      .get("927742707500191787")
      .send({ embeds: [exampleEmbed] });
  }
});

client.on("messageDelete", (message) => {
  //ping message deleter
  client.channels.cache
    .get("930521237438996491")
    .send("someones acting a little sussy...");
});

// inside a command, event listener, etc.
const exampleEmbed = new MessageEmbed()
  .setColor("#f7d344")
  .setTitle("Some title")
  .setURL("https://github.com/gitJamoo")
  .setAuthor({
    name: "Shinx Bot example embed",
    iconURL: "https://i.imgur.com/BWl6L3J.png", //update with kaias new icon
    url: "https://github.com/gitJamoo",
  })
  .setDescription("Shinx bot test description")
  .setThumbnail("https://i.imgur.com/BWl6L3J.png")
  .addFields(
    { name: "Regular field title", value: "Some value here" }
    //{ name: "\u200B", value: "\u200B" },
    //{ name: "Inline field title", value: "Some value here", inline: true },
    //{ name: "Inline field title", value: "Some value here", inline: true }
  )
  //.addField("Inline field title", "Some value here", true)
  .setImage("https://i.imgur.com/BWl6L3J.png")
  .setTimestamp()
  .setFooter({
    text: "Some footer text here",
    iconURL: "https://i.imgur.com/BWl6L3J.png",
  });

const onlineEmbed = new MessageEmbed()
  .setColor("#f7d344")
  .setTitle("Shinx Bot")
  .setAuthor({
    name: "Shinx Bot embed",
    iconURL: "https://i.imgur.com/BWl6L3J.png", //update with kaias new icon
    url: "https://github.com/gitJamoo",
  })
  .setDescription("Shinx Bot is online!");

const welcomeChannelId = "927782126265446481";

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelId).send({
    content: `<@${member.id}> Welcome to the server!`,
    files: [img],
  });
});

client.login(process.env.TOKEN);
//to run, use node index.js in terminal then press ctrl + c to have access to console
