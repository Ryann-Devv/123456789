const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  
  run: async (client, message) => {
    const commands = await client.commands;
    
    let emx = new MessageEmbed()
      .setTitle('Server: ' + message.guild.name)
      .setColor("BLUE")
      .setFooter('ID: ' + message.guild.id + " | SPARK")
      .setThumbnail(client.user.displayAvatarURL());
    emx.setDescription("Spark commands use the prefix ``?`` in this server.")
    emx.addField('Help & Information', '[Command List](https://sparkbot.cf/commands)\n[Support Server](https://discord.gg/fuckoff)')
    emx.addField('Get Spark', '[Invite Me](https://www.sparkbot.cf/invite)')
    message.author.send(emx).catch(async err => {
      return message.channel.send(emx)
    });
    message.react('✅');
  }
};
