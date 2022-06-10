const db = require("quick.db");
 const discord = require("discord.js");

module.exports = {
  name: "autorole",
  description: "Set a role for members to recieve automatically upon joining a frat",
  category: "misc",
  run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
     let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You need the MANAGE MESSAGES permission to set up autorole!**`)

     return message.channel.send(embed1);
    } else {
      let welcomechannel = db.get(`storage_autorole_${message.guild.id}`);
      let roleID = args.slice(0).join(' ');

      db.set(`storage_autorole_${message.guild.id}`, roleID);

  let embed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**Successfully set autorole to: <@&` + roleID + `>**`)

     message.channel.send(embed);
      
    }
  }
};