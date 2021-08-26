const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super('support', 'other', []);
  }

  run(client, message, args) {
    const Embed = new Discord.MessageEmbed()
.setTitle(`My first Support server.`)
.setURL(`https://discord.gg/SBkXS5y7rg`)
.setColor("#5539CC");
    message.channel.send(Embed);
    
    const Embed2 = new Discord.MessageEmbed()
    .setTitle(`My second support server.`)
    .setURL(`https://www.discord.gg/PBQqFTSPuv`)
    .setColor("#5539CC");
    
    message.channel.send(Embed2);
  }
}
