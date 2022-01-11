//where bulk of code goes, learned from https://www.youtube.com/watch?v=1jtAWZK3Bbk
const Discord = require("discord.js");
require("dotenv").config();

const generateImage = require("./generateImage"); //importing generateImage func from generateImage.js

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`); //prints username of bot logging in with
});

client.on("messageCreate", (message) => {
  //commands list - embed in the future
  if (message.content == "commands?") {
    message.reply(`typing \"hi\" - responds with \"Hello World!\"
typing \"who are you?\" - responds with various info`);
  }
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
