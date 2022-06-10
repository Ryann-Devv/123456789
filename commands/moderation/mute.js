const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const discord = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["mutes", "muted"],
  category: "moderation",
  description: "mute @user",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
       let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You need the MANAGE ROLES permission to clear someones warnings!**`)

     return message.channel.send(embed1);
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")){
       let embed2 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**I dont have permission to mute!**`)

     return message.channel.send(embed2);
    }
    const user = message.mentions.members.first();

    if (!user) {
       let embed3 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please mention someone to mute!**`)

     return message.channel.send(embed3);
    }
    if (user.id === message.author.id) 
    {
       let embed4 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You cant mute yourself!**`)

     return message.channel.send(embed4);
    }
    let reason = args.slice(1).join("");

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "Muted (M)");

    if (!muterole) {
      message.channel.send(`No muted role was found. Creating one now...`);
      message.guild.roles.create({
        data: {
          name: "Muted",
        },
        reason: "No muted role was found when a moderator attempted to mute a user, therfore Spark automatically created this role."
      })
     return message.channel.send(`Successfully created muted role. You may now try to mute the user again.`)
    }
    
        if (!reason) 
    {
       db.set(`storage_userRolesBeforeMute_${message.mentions.users.first().id}_${message.guild.id}`, user.roles.cache);
    await user.roles.remove(vrole);
    await user.roles.add(muterole.id);

    {
       let mutedEmbed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Successfully muted ${message.mentions.users.first().username}. No reason was given**`)

     await  message.channel.send(mutedEmbed);
    }

      {
       let notif = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**You have been muted in ${message.guild}. No reason was given**`)

     user.send(notif);
    }
      return
    }
    db.set(`storage_userRolesBeforeMute_${message.mentions.users.first().id}_${message.guild.id}`, user.roles.cache);
    await user.roles.remove(vrole);
    await user.roles.add(muterole.id);

    {
       let embed6 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${message.mentions.users.first().username} was muted for ${reason}!**`)

     await  message.channel.send(embed6);
    }

      {
       let embed7 = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**You was muted in ${message.guild} for ${reason}!**`)

     user.send(embed7);
    }
  }
};
