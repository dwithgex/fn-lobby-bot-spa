const { success, error, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'skin',
  description: 'Equipe cualquier skin por su nombre usando parámetros.',
  category: 'cosmetic',
  aliases: ['s'],
  usage: '<skin>',
  example: '<setname>',

  run: async (client, bot, message, args, getCosmetic) => {
    if (!args[0]) return error2('❌│ Proporcione una máscara.', message);
    const cosmetic = await getCosmetic(args.slice(0).join(' '), 'AthenaCharacter');

    if (cosmetic.status === 404) return error('skin', message);

    bot.party.me.setOutfit(cosmetic.data.id);
    success(cosmetic, message);
  }
}