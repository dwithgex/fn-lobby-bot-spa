const { success, success3, error } = require('../../utils/functions.js');

module.exports = {
  name: 'baile',
  description: 'Equipa cualquier emoticón por su nombre usando parámetros.',
  category: 'cosmetic',
  aliases: ['em', 'emote'],
  usage: '<emote>',
  example: '<setname>',

  run: async (client, bot, message, args, getCosmetic) => {
    if (!args[0]) {
      bot.party.me.clearEmote();
      success3('Dejó de bailar.', message);
    } else {
    const cosmetic = await getCosmetic(args.slice(0).join(' '), 'AthenaDance');

    if (cosmetic.status === 404) return error('❌│ emote', message);

    bot.party.me.setEmote(cosmetic.data.id);
    success(cosmetic, message);
    }
  }
}