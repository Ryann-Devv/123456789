const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "globalmsg",
  description: "Set a channel to receive welcome and leave messages in",
  category: "misc",
  run: (client, message, args) => {
    const msgEmbed = new MessageEmbed()
      .setDescription('Bot will be down untill 20:30 gmt')
      .setTitle('Downtime')
      .setFooter('Message sent by - Ryan.')
      .setTimestamp()
    message.channel.send(msgEmbed);
    message.delete()
  }
};