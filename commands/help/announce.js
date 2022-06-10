const Discord = require ('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "announce",
aliases: ["a", ""],
category: "moderation",
usage: "embed <text to say>",
description: "Returns provided text in Embed form.",
run: async(client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`YOU DO NOT HAVE PERMISSION `)
 await message.delete()
  let say = message.content.split(" ").slice(1).join(" ")
  if(!say) return message.channel.send(`❌ | `+"I Cannot Repeat Blank Message")
  let embed = new MessageEmbed()
  .setTitle(`**Official Server Announcement from ${message.author.username}.**`)
  .setDescription(`${say}`)
  .setColor("GREEN")
  .setFooter(`BC:RP Offical Notification.`)


  message.channel.send(embed)
}
}