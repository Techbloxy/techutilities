const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');
const PingCommand = require('./PingCommand');

module.exports = class HelpCommand extends BaseCommand {
  constructor() {
    super('help', 'other', []);
  }

  async run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
   .setTitle('TechUtilities Help center!')
   .setDescription('Use -help [sectionname] to access another section.\nSections:\nInformation\nFun\nModeration')
   .addField('Fun Commands', 'Commands that all users can user that are for fun and have no purpose.')
   .addField('Moderation commands', 'Commands that are for moderation purposes within a server.')
   .addField('Other commands', 'Commands that add features to a server.')
   .addField('Creator: @techbloxy#0004. DM Him to make you a bot!')
   .setFooter(client.user.tag, client.user.displayAvatarURL())
   .setColor("BLURPLE");

 
const funEmbed = new Discord.MessageEmbed()
   .setTitle('Fun Commands.')
   .addField('Meme Commands', 'Returns a Meme to the channel.')
   .addField('Say Command', 'Make the bot say a message to the channel.')
   .addField('RPS Command', 'Play rock paper scissors with the bot.')
   .addField('Snipe Command', 'Snipes the last message deleted.')
   .setColor("BLURPLE");
 
const moderationEmbed = new Discord.MessageEmbed()
   .setTitle('Moderation Commands.')
   .addField('Ban Command', 'Bans a member from the server.')
   .addField('Kick Command', 'Kicks a member from the server.')
   .addField('Mute Command', 'Mutes a member in the server.')
   .addField('Nickname Command', 'Moderates a members nickname in a server.')
   .addField('Nuke Command', 'Clones a channel and deletes the old one.')
   .addField('Purge Command', 'Purges messages within a channel.')
   .addField('Tempban Command', 'Tempbans a member from the server.')
   .addField('Unban Command', 'Unbans a member from the server.')
   .addField('Say Command', 'Make the bot say a message to the channel.')
   .addField('Slowmode Command - Sets the slowmode for the channel.')
   .addField('Lock Command - Locks the channel.')
   .addField('UnLock Command - UnLocks the channel.')
   .setColor("BLURPLE");

   const otherEmbed = new Discord.MessageEmbed()
   .setTitle('Other Commands.')
   .addField('Invite Command', 'Sends an invite link.')
   .addField('Support Command', 'Sends the support server.')
   .addField('Ping Command', 'The bots ping.')
   .addField('Warn Command', 'Warns a user.')
   .setColor("BLURPLE");
 
if (!args[0]) return message.channel.send(sectionEmbed);
if (args[0] == 'info') return message.channel.send(infoEmbed);
else if (args[0] == 'fun') return message.channel.send(funEmbed);
else if (args[0] == 'other') return message.channel.send(toolEmbed);
else if (args[0] == 'mod') return message.channel.send(moderationEmbed);
  }
}