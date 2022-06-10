const db = require("quick.db");
const discord = require("discord.js");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns", "rsetwarns"],
  category: "moderation",
  usage: "rwarns <@user>",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
       let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You need the MANAGE MESSAGES permission to clear someones warnings!**`)

     return message.channel.send(embed1);
    }

    const user = message.mentions.members.first();

    if (!user) {
       let embed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please mention a user to reset warnings!**`)

     return message.channel.send(embed2);
    }

    if (message.mentions.users.first().bot) {
      let embed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Bots can't have warnings!**`)

     return message.channel.send(embed3);
    }

    if (message.author.id === user.id) {
       let embed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You can't reset your own warnings!**`)

     return message.channel.send(embed4);
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      let embed5 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**${message.mentions.users.first().username} does not have any warnings!**`)

     return message.channel.send(embed5);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
    let embed6 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Your warnings have reset in ${message.guild.name}**`)

     user.send(embed6);

     let embed7 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**${message.mentions.users.first().username} warnings have been reset`)

     await message.channel.send(embed7);
    
  }
};
