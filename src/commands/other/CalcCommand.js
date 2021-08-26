const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class CalcCommand extends BaseCommand {
  constructor() {
    super('calc', 'information', ['calculator', 'calculate']);
  }

async run(client, message, args) {
    const firstValue = Number(args[0]);
    const secondValue = Number(args[2]);

    if(!args[0]) return message.channel.send(`You have to input more arguments \`${client.prefix}calc number [+, -, x, /] number\`.`);
    if(!firstValue) return message.channel.send(`The first value is not a number.`);
    if(!args[1]) return message.channel.send(`You have to state what you want to do with this and another number. Options: +, -, x, /`);
    if(!['+', '-', 'x', '/'].includes(args[1])) return message.channel.send(`You did not state a method to these numbers: +, -, x, /`);
    if(!secondValue) return message.channel.send(`The second value is not a number.`);

    if(args[1] == '+') {
      let result = firstValue + secondValue;
      message.channel.send(`${firstValue} + ${secondValue} = ${result}.`);
    }

    if(args[1] == '-') {
      let result = firstValue - secondValue;
      message.channel.send(`${firstValue} - ${secondValue} = ${result}.`);
    }

    if(args[1] == 'x') {
      let result = firstValue * secondValue;
      message.channel.send(`${firstValue} x ${secondValue} = ${result}.`);
    }
    
    if(args[1] == '/') {
      let result = firstValue / secondValue;
      message.channel.send(`${firstValue} / ${secondValue} = ${result}.`);
    }
  }
}