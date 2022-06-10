const db = require("quick.db");
const discord = require("discord.js");

module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

     let embed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`${user} have **${warnings}** warning(s)`)

     message.channel.send(embed)
  }
};