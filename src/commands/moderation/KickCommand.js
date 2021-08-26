const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You do not have permission to use this command.");
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason given!";
    const kickEmbed = new Discord.MessageEmbed()
      .setTitle(`You were kicked from ${message.guild.name}`)
      .setDescription(`Reason: ${reason}`)
      .setColor("#5539CC")
      .setTimestamp()
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    // #kick @user dm ads
    if (!args[0]) return message.channel.send("You need to state a user to kick. \`-kick @user reason\`");
    if (!mentionedMember.kickable) return message.channel.send('I cannot kick that member.');
    if (!mentionedMember) return message.channel.send("That member is not in the server.");
    try {
      await mentionedMember.send(kickEmbed)
    } catch (err) {
      console.log(`I was unable to dm the member.`);
    }

    try {
      await mentionedMember.kick(reason)
    } catch (err) {
      console.log(err); {
        return message.channel.send("I was unable to kick the member.")
      }
    }
  }
}