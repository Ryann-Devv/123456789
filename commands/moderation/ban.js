const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {

    const target = message.mentions.members.first()

    const reason = args.slice(1).join(" ")

    if (!message.member.hasPermission("BAN_MEMBERS"))  {
      let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You need the BAN MEMBERS permission to ban someone**`)
    return message.reply(embed1);
    }

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
      let embed = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**I do not have the correct permissions**`)
    return message.reply(embed);
    }

    if (target.id === message.author.id)  {
      let embed5 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You can't ban yourself**`)
    return message.reply(embed5);
    }

    if (!args[0]) {
      let embed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please mention someone to ban**`)
      return message.reply(embed2);
    }

    if (!target) {
      let embed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**I can't find that member**`)
    return message.reply(embed3);
    }

    if (target.roles.highest.position > message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
     {
      let embed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**They have more power than you**`)
    return message.reply(embed4);
    }
    }

    if (target.bannable) {
      let embed = new discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`Banned \`<@${target.id}>\` for \`${reason || "No Reason Provided"}\``)

      message.channel.send(embed)

      target.ban()

      message.delete()

    } else {
     {
      let embed6 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**That user outranks me**`)

     return message.reply(embed6);
    }
    }
    return undefined
 }
      };