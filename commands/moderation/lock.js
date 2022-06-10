const Discord = module.require("discord.js");

module.exports = {
  name: "lock",
  description: "Locks a Channel",
  usage: "lock <channel>",
  args: true,
  category: "moderation",
  run: async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS'))  {
       let embed1 = new discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**You need the MANAGE SERVER permission to lock a channel!**`)

     return message.channel.send(embed1);
    }
    message.channel.overwritePermissions([
      {
        id: message.guild.id,
        deny: ['SEND_MESSAGES'],
      },
    ]);
    const embed = new Discord.MessageEmbed()
      .setTitle("Channel Updates")
      .setDescription(`🔒 ${message.channel} has been Locked`)
      .setColor("RANDOM");
    await message.channel.send(embed);
    message.delete();
  }
}