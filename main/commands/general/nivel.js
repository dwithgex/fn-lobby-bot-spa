const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'nivel',
  description: 'Establece nivel de la cuenta del Cliente.',
  category: 'general',
  aliases: ['l'],
  usage: '<level>',
  example: '<set_number>',

  run: async (client, bot, message, args, getCosmetic) => {
    const level = args[0];
    if (!level || isNaN(level)) return error2('❌│ Proporcione un nivel', message);

    bot.party.me.setLevel(parseInt(level));
    success3(`✅│ El nivel se ha establecido en **${level}**.`, message);
  }
}