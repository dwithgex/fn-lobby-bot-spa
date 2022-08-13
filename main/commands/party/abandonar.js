const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'abandonar',
  description: 'Abandonar el grupo.',
  category: 'party',
  aliases: ['abandonar', 'leave'],
  usage: ' ',
  example: '',

  run: async (client, bot, message, args, getCosmetic) => {
    try {
      await bot.party.leave();
    } catch {
      return error2('⚠️│ Se ha producido un error, operación cancelada.', message);
    }

    success3('✅│ Abandonado', message);
  }
}