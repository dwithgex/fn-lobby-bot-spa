const { success2, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'cid',
  description: 'Equipa cualquier skin por ID usando parámetros.',
  category: 'cosmetic',
  usage: '<cid>',
  example: '<setCID>',

  run: async (client, bot, message, args, getCosmetic) => {
    const cosmetic = args[0];
    if (!cosmetic || cosmetic.length < 4) return error2('Por favor proporcione un CID.', message);

    bot.party.me.setOutfit(cosmetic);
    success2(cosmetic, message);
  }
}