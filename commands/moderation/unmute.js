const db = require("quick.db");
const discord = require("discord.js");

module.exports = {
  name: "unmute",
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
     let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You need the MANAGE ROLES permission to be able to unmute!**`)

     return message.channel.send(embed1);
      
    }

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**I dont have sufficent permission!**`)

     return message.channel.send(embed1);
    }

    const user = message.mentions.members.first();

    if (!user) {
     let embed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please mention a user to unmute!**`)

     return message.channel.send(embed2);
    }

    let muterole = message.guild.roles.cache.find(x => x.name === "muted");

    if (user.roles.cache.has(muterole)) {
    let embed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**That user is not muted!**`)

     return message.channel.send(embed3);
    }

    user.roles.remove(muterole)
    const rolesBeforeMute = db.get(`storage_userRolesBeforeMute_${message.mentions.users.first().id}_${message.guild.id}`)
    rolesBeforeMute.forEach(role => {
      if (role.name == "@everyone") {
        return
      } else {
        user.roles.add(role.id)
      }
    });

    let embed4 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${message.mentions.users.first().username} is now unmuted!**`)

     await message.channel.send(embed4);

   let embed5 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`You have been unmuted in **${message.guild.name}!**`)

     user.send(embed5);

    message.delete()
  }
};
