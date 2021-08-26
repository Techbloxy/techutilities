const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super('invite', 'other', []);
  }

  run(client, message, args) {
    const Embed = new Discord.MessageEmbed()
.setTitle(`Invite me!`)
.setURL(`https://discord.com/api/oauth2/authorize?client_id=880070800961597492&permissions=8&scope=bot`)
.setColor("#5539CC")
    message.channel.send(Embed)
  }
}
