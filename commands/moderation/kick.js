const { MessageEmbed } = require("discord.js")
const moment = require('moment')
const discord = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "kick a user",
  cooldown: 5,
  userPerms: ["KICK_MEMBERS"],
  clientPerms: ["KICK_MEMBERS"],
  run: async (client, message, args) => {
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(" ")
    if (!args[0]) 
   
    if (!mentionedMember) 
    {
      let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Mention someone to kick!**`)

     return message.channel.send(embed1);
    }
    if (!mentionedMember) 
    {
     let embed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**I cant find that user!**`)

     return message.channel.send(embed2);
    }
    if (mentionedMember.id === message.author.id)  {let embed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You cant kick youself!**`)

     return message.channel.send(embed3);}

    if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
       let embed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You cant kick people who outrank you!**`)

     return message.channel.send(embed4);
    }

    if (mentionedMember.kickable) {
      const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({ dynamic: true }))
        .setThumbnail(mentionedMember.user.displayAvatarURL({ dynamic: true }))
        .setColor(`GREEN`)
        .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Reason:** ${reason || "None"}
            `)
      message.channel.send(embed)
      mentionedMember.kick()
    } else {
      return message.channel.send(":x: | **I can\'t kick this user make sure that the users role is lower than my role.**")
    }
    return undefined
    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;

    const embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", "kick")
      .addField("**User Kicked**", kickMember.user.username)
      .addField("**Kicked By**", message.author.username)
      .addField("**Reason**", `${reason || "**No Reason**"}`)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(embed)
  }
}
