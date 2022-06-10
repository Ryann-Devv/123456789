const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const discord = require("discord.js");

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
       let embed10 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`To use this command you must have **Manage Messages** Permissions`)

     return message.channel.send(embed10);
    }

    const user = message.mentions.members.first();

    if (!user) {
       let embed11 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please Mention Someone To Warn!**`)

     return message.channel.send(embed11)
      ;
    }

    if (message.mentions.users.first().bot) {
       let embed12 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You can't warn bots!**`)

     return message.channel.send(embed12);
    }

    if (message.author.id === user.id) {
        let embed13 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You can't warn yourself!**`)

     return message.channel.send(embed13);
    }

    if (user.id === message.guild.owner.id) {
       let embed14 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You can't warn the server owner!**`)

     return message.channel.send(embed14);
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
        let embed15 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please provide a reason to warn!**`)

     return message.channel.send(embed15);
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      db.set(`warnings_${message.guild.id}_${user.id}`, 1);
       let embed1 = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`You have been warned in **${message.guild.name}** for ${reason}`)

      user.send(embed1)
      let embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`**${message.mentions.users.first().username}  was warned for ${reason}**`)

      await message.channel.send(embed)
    } else if (warnings !== null) {

      db.add(`warnings_${message.guild.id}_${user.id}`, 1);

       let embed2 = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`You have been warned in **${message.guild.name}** for ${reason}`)

      user.send(embed2)

     let embed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${message.mentions.users.first().username} was warned for ${reason}**`)

      await message.channel.send(embed)

      message.delete

    }
  }
};
