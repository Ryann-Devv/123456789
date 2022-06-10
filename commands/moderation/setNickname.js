const { MessageEmbed } = require('discord.js');
const discord = require("discord.js");
const db = require('quick.db');
module.exports = {
  name: "setnick",
  aliases: ["sn", 'nick'],
  category: "moderation",
  description: "Sets Or Changes Nickname Of An User",
  usage: "[mention | name | nickname | ID] <nickname>",
  
  run: async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_GUILD")) 
    {
      let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**The permission MANAGE GUILD is required to change a nickname! **`)

     return message.channel.send(embed1);
  }

    if (!message.guild.me.hasPermission("CHANGE_NICKNAME")) 
    {
      let embed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**I do not have permission to change a users nickname!**`)

     return message.channel.send(embed2);
    }

    if (!args[0]) 
    {
     let embed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please enter a user!**`)

     return message.channel.send(embed3);
    }

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
    if (!member) 
    {
        let embed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please enter a username!**`)

     return message.channel.send(embed4);
    }


    if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return 
    {  
    let embed5 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**I cannot manage users who outrank me!**`)

     message.channel.send(embed5);
    }

    if (!args[1])
    {
     let embed6 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please enter a nickname!**`)

     return message.channel.send(embed6);
    }
    let nick = args.slice(1).join(' ');

    try {
      member.setNickname(nick)
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Changed Nickname of ${member.displayName} to ${nick}**`)
      message.channel.send(embed)
    } catch {
       let embed6 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Missing permissions!**`)

     return message.channel.send(embed6);
    }

    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;

    const sembed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", "setnick")
      .addField("**Nick Changed Of**", member.user.username)
      .addField("**Nick Changed By**", message.author.username)
      .addField("**Nick Changed To**", args[1])
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(sembed)
  }
}