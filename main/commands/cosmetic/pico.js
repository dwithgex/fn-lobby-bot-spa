const { success, error, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'pico',
  description: 'Equipa cualquier pico por su nombre usando parámetros.',
  category: 'cosmetic',
  aliases: ['pk', 'pickaxe'],
  usage: '<pickaxe>',
  example: '<setname>',

  run: async (client, bot, message, args, getCosmetic) => {
    if (!args[0]) return error2('❌│ Proporcione un pico.', message);
    const cosmetic = await getCosmetic(args.slice(0).join(' '), 'AthenaPickaxe');

    if (cosmetic.status === 404) return error('pickaxe', message);

    bot.party.me.setPickaxe(cosmetic.data.id);
    success(cosmetic, message);
  }
}