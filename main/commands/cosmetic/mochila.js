const { success, success3, error } = require('../../utils/functions.js');

module.exports = {
  name: 'mochila',
  description: 'Equipa cualquier mochila usando parámetros.',
  category: 'cosmetic',
  aliases: ['bp', 'backpack', 'mochila', 'complemento'],
  usage: '<backpack>',
  example: '<setname>',

  run: async (client, bot, message, args, getCosmetic) => {
    if (!args[0]) {
      bot.party.me.clearBackpack();
      success3('Equipada la mochila actual.', message);
    } else {

    const cosmetic = await getCosmetic(args.slice(0).join(' '), 'AthenaBackpack');

    if (cosmetic.status === 404) return error('❌│ Mochila', message);

    bot.party.me.setBackpack(cosmetic.data.id);
    success(cosmetic, message);
    }
  }
}