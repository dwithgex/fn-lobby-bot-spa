const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'credits',
  description: 'créditos a los desarroladores.',
  category: 'info',
  usage: ' ',
  example: '',

  run: async (client, bot, message, args, getCosmetic) => {
    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle(`Credits`)
    .setDescription('> © Copyright GexTools - © Copyright Sirius')
    message.react('✅');

    message.channel.send(embed);
  }
}