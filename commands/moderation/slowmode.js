const discord = require("discord.js");
module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Lets you set slowmode on the channel.",
  args: true,
  usage: "<time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
      {
          let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Thats not a valid number!**`)

     return message.channel.send(embed1);
      }
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
         let embed2 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Slowmode is now ` + amount + ` seconds!** `)

     message.channel.send(embed2);
        return;
      } else {
          let embed3 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Slowmode is now ` + amount + ` second**! `)

     message.channel.send(embed3);
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
         let embed4 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Slowmode is now ` + amount + ` minutes!** `)

     message.channel.send(embed4);
        return;
      } else {
          let embed5 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Slowmode is now ` + amount + ` minute!** `)

     message.channel.send(embed5);

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
          let embed6 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Slowmode is now ` + amount + ` hours!** `)

     message.channel.send(embed6);
        return;
      } else {
         let embed7 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Slowmode is now ` + amount + ` hour!**`)

     message.channel.send(embed7);
        return;
      }
    } else {
       let embed8 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You can only set seconds(s), minutes(min) and hours(h)!** `)

     message.channel.send(embed8);
      
    }
  }
};
