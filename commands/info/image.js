const Discord = require ('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
name: "image",
aliases: ["i", ""],
category: "moderation",
usage: "embed <text to say>",
description: "Returns provided text in Embed form.",
run: async(client, message, args) => {
  
 await message.delete()
  let say = message.content.split(" ").slice(1).join(" ")
  if(!say) return message.channel.send(`❌ | `+"I Cannot Repeat Blank Message")
   let embed = new MessageEmbed()
  .setTitle(`**Image Posted By :  ${message.author.username}.**`)
  .setImage(`${say}`)
  .setColor("GREEN")
  .setFooter(`BC:RP | Blaine County RP.`)


  message.channel.send(embed)
}
}