const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PingCommand extends BaseCommand {
  constructor() {
    super('ping', 'other', []);
  }

  async run(client, message, args) {
		const msg = await message.channel.send('Pinging...');
		const  Embed  =  new  Discord.MessageEmbed()
			.setTitle('Pong!')
			.setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
			.setDescription(
				`⌛ Latency is ${Math.floor(
					msg.createdTimestamp - message.createdTimestamp,
				)}ms\n⏲️ API Ping is ${Math.round(client.ws.ping)}`,
			)
			.setColor('#03fc4e');
		await msg.edit('\u200b');
		return msg.edit(Embed);
  }
}