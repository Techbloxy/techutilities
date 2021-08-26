const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const ms = require('ms');

module.exports = class TempbanCommand extends BaseCommand {
  constructor() {
    super('tempban', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to ban members!");
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("My role does not have the ban permission!");

    const mentiondMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");
    let time = args[1];
    const tempbanEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been banned from ${message.guild.name}`)
      .addField(`Duration: ${time}`, `Reason: ${reason}`)
      .setColor("#db1212")
      .setTimestamp()

    if (!args[0]) return message.channel.send(`You must state a member to tempban. \`-tempban @user time reason\``);
    if (!mentiondMember) return message.channel.send(`The user stated is not in the server.`);
    if (!mentiondMember.bannable) return message.channel.send('This member is not bannable.');
    if (!mentiondMember.roles.highest.position >= message.member.roles.highest.position) return message.channel.send('You cannot tempban someone with the same role as you or higher than you.');
    if (!reason) reason = 'No reason given.';
    if (!time) return message.channel.send(`You must state a time to tempban this member. \`-tempban @user time reason\``);

    await mentiondMember.send(tempbanEmbed).catch(err => console.log(err));
    await mentiondMember.ban({
      days: 7,
      reason: reason
    }).catch(err => console.error(err));

    setTimeout(async function () {
      await message.guild.fetchBans().then(async bans => {
        if (bans.size == 0) return message.channel.send('This guild does not have any bans.');
        let bannedUser = bans.find(b => b.user.id == mentiondMember.id);
        if (!bannedUser) return message.channel.send('Member unbanned.')
        await message.guild.members.unban(bannedUser.user, reason).catch(err => console.log(err));
      });
    }, ms(time));
  }
}