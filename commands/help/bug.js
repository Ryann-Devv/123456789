const discord = require("discord.js");
module.exports = {
  name: "bug",
  category: "moderation",
  args: true,
  description:
    "a fucking bug report script it aint rocket science alex",
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
      "Thanks for submitting a bug!, we will review the issue and get back to you as quickly as we can."
    );
    channels
      .createInvite({
        temporary: `${check}`,
        maxAge: `${check2}`,
        maxUses: 0,
        reason: `Requested By : Spark Development Team.`
      })
      .then(InviteCode =>
        client.channels.cache.get("967460401019236513").send(
          new discord.MessageEmbed()
            .setTitle("Bug Report")
            .addField(
              "Username:",
              `${message.author.username}#${message.author.discriminator}`
            )
            .addField("Bug:", args)
            .addField("Bug was reported in:", `${message.guild.name}`)
            .addField("Server ID:", `${message.guild.id}`)
            
            .addField(`Invite to server where bug was reported from:`, `https://discord.gg/${InviteCode.code}`)
            .setColor("BLUE")
        )
      );
  }
};