const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Envía la conexión entre el Cliente y Discord.',
  category: 'info',
  usage: ' ',
  example: '',

  run: async (client, bot, message, args, getCosmetic) => {
    const ping = client.ws.ping;
    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('🌐 Conexión del Cliente:')
    .addField('Discord', `\`${ping} ms\``, true)

    const msg = await message.channel.send('Ping?');

    const Ping = msg.createdTimestamp - message.createdTimestamp;
    embed.addField('Fortnite', `\`${Ping} ms\``, true);

    msg.edit(null, embed);
  }
}