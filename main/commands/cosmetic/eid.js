const { success2, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'eid',
  description: 'Equipa cualquier emote por ID usando parámetros.',
  category: 'cosmetic',
  usage: '<eid>',
  example: '<setEID>',

  run: async (client, bot, message, args, getCosmetic) => {
    const cosmetic = args[0];
    if (!cosmetic || cosmetic.length < 4) return error2('❌│ Proporcione un EID.', message);

    bot.party.me.setEmote(cosmetic);
    success2(cosmetic, message);
  }
}