const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "oa",
  aliases: ["", "ownan"],
  category: "moderation",
  usage: "embed <text to say>",
  description: "Returns provided text in Embed form.",
  run: async (client, message, args) => {
    if (message.author.id != 516189153252343808) {
      const noperms = new MessageEmbed()
        .setDescription("This Command Only Use By My Owner ")
        .setColor("YELLOW");
      return message.channel.send(noperms)
    }
    await message.delete()
    let say = message.content.split(" ").slice(1).join(" ")
    if (!say) return message.channel.send(`❌ | ` + "I Cannot Repeat Blank Message")
    let embed = new MessageEmbed()
      .setAuthor("Spark"())
      .setDescription(`${say}`)
      .setColor("PURPLE")
      .setFooter(` Rules Must Be Followed At All Times`)
      .setTimestamp()
    message.channel.send(embed)
  }
}