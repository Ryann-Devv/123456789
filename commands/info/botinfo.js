const db = require("quick.db");
const Discord = require("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
module.exports = {
  name: 'botinfo',
  category: 'info',
  description: 'Check\'s bot\'s status',
  run: async (client, message, args, del, member) => {
    message.channel.send(new Discord.MessageEmbed()
      .setAuthor('Spark', client.user.displayAvatarURL())
      .addField('Version', '1.2.8', true)
      .addField('Creator', 'Ryan#7403', true)
      .addField('Servers', `${client.guilds.cache.size} guilds`, true)
      .addField(`Website`, '[Click here](https://spark.ryann.pw)', true)
      .addField('Invite', '[Invite Me](https://spark.ryann.pw/invite)', true)
      .setColor('#5865F2')
    );
  }
}