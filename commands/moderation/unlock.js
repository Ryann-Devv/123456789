const Discord = module.require("discord.js");
const discord = require("discord.js");

module.exports = {
  name: "unlock",
  description: "Unlocks a Channel",
  usage: "unlock <channel>",
  args: true,
  category: "moderation",
  permissions: "MANAGE_CHANNELS",
  run: async (client, message, args) => {

    if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
        let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You need the MANAGE SERVER Or MANAGE CHANNELS permission to be able to unmute!**`)

     return message.channel.send(embed1);

    }
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        null: ['SEND_MESSAGES'],
      },
    ]);
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`🔓 ${message.channel}  has been Unlocked`)
      .setColor("GREEN");
    await message.channel.send(embed);
    message.delete();
  }
}