const { default_prefix } = require("./config.json")

const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const db = require("quick.db");
const moment = require("moment");
const { emotes, emoji } = require("./config.json")
const discord = require("discord.js");
const client = new discord.Client();

const statuses = [
  "?help",
  "blainecountyrp.cf",
  "BC:RP",
  "BCRP Owned By LMP"
]

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["commands"].forEach(handler => {
  require(`./handlers/commands.js`)(client);
});
client.queue = new Map()
process.on('unhandledRejection', console.warn);

client.on("message", async message => {


  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(default_prefix)) return;

  if (!message.member)
    message.member = message.guild.fetchMember(message);

  const args = message.content
    .slice(default_prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);

  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) command.run(client, message, args);
});

client.on("ready", () => {
  client.user.setStatus("online");
  console.log("------------------------------------------------------------------------")
  console.log("Bot node successful. Bot is now appearing as online.")

});

const portToUse = 2804 
console.log('Port to use is ' + portToUse)
client.login("ODgxNTMxODQwOTQ5ODA1MDc3.GfD6Vh.R2fvnPe9Eq1oKUJIyr5VohjrnBC_Xs77wKig08");

const http = require('http')

http.createServer(function(_, res) {
  res.write("Online");
  res.end();
}).listen(portToUse)

var agent = new http.Agent({
  keepAlive: true,
  maxSockets: 1,
  keepAliveMsecs: 3000
})

client.on("ready", () => {
  client.user.setActivity(`Waking up...`, { type: "IDLE" })
  console.log("------------------------------------------------------------------------")
  console.log("Bot status set successfully")
  console.log("------------------------------------------------------------------------")
  setTimeout(statusCycle, 10);
  function statusCycle() {
    client.user.setActivity(`SPARK`, { type: "PLAYING" })
    setInterval(() => {
      const index = Math.floor(Math.random() * (statuses.length - 1) + 1);
      const newStatus = statuses[index];
      client.user.setActivity(newStatus);
    }, 60000)
  }
})

client.on('guildMemberAdd', member => {
  try {
    let guild = member.guild;
    const roleToGive = db.get(`storage_autorole_${member.guild.id}`);
    const welcomeChannel = db.get(`storage_welcomechannel_${member.guild.id}`);
    const welcomeChannelToMsg = guild.channels.cache.get(welcomeChannel);
    const userCreationDateTimestamp = member.user.createdTimestamp / 1000
    const userCreationDateProper = Math.round(userCreationDateTimestamp)
    const welcomeEmbed = new MessageEmbed()
      .setDescription('<@' + member.id + '> ' + member.user.tag)
      .addField('User Creation Date', '<t:' + userCreationDateProper + ':D>')
      .setAuthor('Member Joined', member.user.avatarURL())
      .setFooter('ID: ' + member.id)
      .setTimestamp()
      .setThumbnail(member.user.avatarURL())
      .setColor('#77dd77')
    welcomeChannelToMsg.send(welcomeEmbed)
    member.roles.add(roleToGive)
  } catch {
    return
  }
});

client.on('guildMemberRemove', member => {
  try {
    let guild = member.guild;
    const welcomeChannel = db.get(`storage_welcomechannel_${member.guild.id}`);
    const welcomeChannelToMsg = guild.channels.cache.get(welcomeChannel);
    const userCreationDateTimestamp = member.user.createdTimestamp / 1000
    const userCreationDateProper = Math.round(userCreationDateTimestamp)
    const welcomeEmbed = new MessageEmbed()
      .setDescription('<@' + member.id + '> ' + member.user.tag)
      .addField('User Creation Date', '<t:' + userCreationDateProper + ':D>')
      .setAuthor('Member Left', member.user.avatarURL())
      .setFooter('ID: ' + member.id)
      .setTimestamp()
      .setThumbnail(member.user.avatarURL())
      .setColor('#ff6961')
    welcomeChannelToMsg.send(welcomeEmbed)
  } catch {
    return
  }
})

