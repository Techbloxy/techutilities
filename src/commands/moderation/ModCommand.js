const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NicknameCommand extends BaseCommand {
  constructor() {
    super('mod', 'moderation', []);
  }

  async run(client, message, args) {
    if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("You don't have permission to use this command.");
    if(!message.guild.me.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("I require \`MANAGE_NICKNAMES\` permission to change nicknames.");

    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const nickname = args.slice(1).join(" ");

    if(!args[0]) return message.channel.send("You must state a user. \`-nickname @user\`")
    if(!mentionedMember) return message.channel.send("That user is not in the server.");
    if(!mentionedMember.kickable) return message.channel.send("I cannot change that members nickname as their roles is higher then mine.");
    
    await mentionedMember.setNickname("Moderated Nickname").catch(err) && message.channel.send("There was an error.");
  }
}