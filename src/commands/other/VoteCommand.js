const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class VoteCommand extends BaseCommand {
  constructor() {
    super('vote', 'other', []);
  }

 async run(client, message, args) {
  const filter = m => m.author.id == message.author.id;
  let embed = new Discord.MessageEmbed()
  .setFooter(`Vote made by ${message.author.tag}`)
  .setColor("#5539CC");
//1
  message.channel.send('What is the vote topic?');
  try {
    let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
    console.log(msg.first().content);
    embed.setTitle(msg.first().content);
  } catch (err) {
    console.log(err);
    }
    //2
    message.channel.send('What is the first point to vote on?');
    try {
      let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
      console.log(msg.first().content);
      embed.addField(`[🔴]The first option to vote:`, msg.first().content);
    } catch (err) {
      console.log(err);
      }
//3
      message.channel.send('What is the second point to vote on?');
      try {
        let msg = await message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] });
        console.log(msg.first().content);
        embed.addField(`[🔵]The second option to vote:`, msg.first().content);
      } catch (err) {
        console.log(err);
        }
        message.channel.send(embed).then(sentMessage => sentMessage.react('🔴')).then(reaction => reaction.message.react('🔵'));
  }
}