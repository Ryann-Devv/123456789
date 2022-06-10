const discord = require("discord.js");
module.exports = {
  name: "botsuggest",
  category: "moderation",
  args: true,
  description:
    "a fucking  suggesttuh script it aint rocket science alex",
  usage:
    "prostituations",
  run: async (client, message, args) => {
    
    args = args.join(" ");
    const channels = message.channel;
    let check;
    if (args[0] === "temp") {
      check = "true";
    } else if (args[1] === "temp") {
      check = "true";
    } else {
      check = "false";
    }
    let check2;
    if (args[0] === "temp") {
      check2 = "86400";
    } else if (args[1] === "temp") {
      check2 = "86400";
    } else {
      check2 = "0";
    }
    
    
    message.reply(
      "Thanks for the suggestion!, we will review your suggestion. You may recieve a DM from our team based on your suggestion."
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : Spark Development Team.`
      })
      .then(InviteCode =>
        client.channels.cache.get("967460307318472775").send(
          new discord.MessageEmbed()
            .setTitle("Suggestion")
            .addField(
              "Username:",
              `${message.author.username}#${message.author.discriminator}`
            )
            .addField("Suggestion:", args)
            .addField("Suggested in:", `${message.guild.name}`)
            .addField("Server ID:", `${message.guild.id}`)
            
            .addField(`Invite to server where suggestion came from:`, `https://discord.gg/${InviteCode.code}`)
            .setColor("BLUE")
        )
      );
  }
};