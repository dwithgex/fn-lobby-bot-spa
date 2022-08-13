const { success2, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'bid',
  description: 'Equipa cualquier mochila por ID usando parámetros.',
  category: 'cosmetic',
  usage: '<bid>',
  example: '<setBID>',

  run: async (client, bot, message, args, getCosmetic) => {
    const cosmetic = args[0];
    if (!cosmetic || cosmetic.length < 4) return error2('Por favor proporcione un BID.', message);

    bot.party.me.setBackpack(cosmetic);
    success2(cosmetic, message);
  }
}