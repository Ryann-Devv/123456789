const discord = require("discord.js");

module.exports = {
  name: "upgrades",
  category: "info",
  description: "View our planned upgrades",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setDescription(`From the 11th Febuary (11/02) until the 25th March (25/03), Spark will be undergoing major updated, infastructure upgrades and branding changes.\n\nDuring this time, performance may not be *top notch*, however Spark will still remain useable (to an extent) unless our developers find a viable reason for downtime\n\n**Planned upgrades:**\n\nAudit Logs\n\nCustomisable Prefixes\n\nCustomisation\n\nTransition to slash commands (Some commands may stay chat-triggerable)\n\nUser Infraction Logs (Warn and mute logs)\n\nBack-end infastructure changes\n\nIncreased moderation capabilities (Including the integration of discord's 'timeout' feature)\n\nIncreased amount of 'fun' commands for all users (Including a global economy)\n\nOverall code re-write\n\nSpark Premium\n\n***Please note: This list may change at any time AND this is not a full list of updates, only a brief overview of what's to come***`)
    .setColor("RED")
    .setFooter(`Spark`)
    
    message.channel.send(embed)
  }
}