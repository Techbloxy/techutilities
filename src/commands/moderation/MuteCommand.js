const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempmuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send(`I require \`MANAGE_ROLES\` permission to mute.`);

    const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
    const mentiondMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let time = args[1];
    let reason = args.slice(2).join(" ");
    const tempmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been muted in ${message.guild.name}`)
      .addField(`Duration: ${time}`, `Reason: ${reason}`)
      .setColor("#db1212")
      .setTimestamp()
      .setFooter(client.user.displayAvatarURL());
    
    if (!args[0]) return message.channel.send('You must state a member to mute with a duration of time. \`-mute @member time reason\`');
    if (!mentiondMember) return message.channel.send('The member stated is not in the server.');
    if (!mentiondMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot mute someone with the same role as you or higher than you.');
    if (!time) return message.channel.send('You must state a duration of time. \`-mute @member time reason\`');
    if (!reason) reason = 'No reason given.'

      await mentiondMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the mute role.')));
      await mentiondMember.send(tempmuteEmbed).catch(err => console.log(err));

    setTimeout(async function () {
      await mentiondMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send('There was an issue giving the mute role.')));
      await mentiondMember.send(`**Your mute has been lifted in ${message.guild.id}**.`).catch(err => console.log(err));
    }, ms(time))
  }
}