// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-guildMemberAdd
const { Message } = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');
module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Member');
    member.roles.add(welcomeRole).catch(err => console.log(err));

    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name == 'welcome');
    welcomeChannel.send(`:wave: <@${member.user.id}>, Welcome to **${member.guild.name}**, Have fun here!`)
  }
}