const discord = require("discord.js");
module.exports = {
  name: "bothelp",
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
      "Our @Support team will get back to you withing 14 hours"
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : Spark Development Team.`
      })
      .then(InviteCode =>
        client.channels.cache.get("972632118171672666").send(
          new discord.MessageEmbed()
            .setTitle("Help Request")
            .addField(
              "Username:",
              `${message.author.username}#${message.author.discriminator}`
            )
            .addField("Reason:", args)
   
            .setColor("BLUE")
        )
      );
  }
};