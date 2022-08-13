const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'aparecer',
  description: 'Muestra a todos los miembros del grupo excepto al cliente.',
  category: 'party',
  aliases: ['unhide', 'desocultar', 'abrir', 'open'],
  usage: ' ',
  example: '',

  run: async (client, bot, message, args, getCosmetic) => {
    if (!bot.party.me.isLeader) return error2('❌│ Debo ser el líder del grupo para poder mostrar a todos los miembros del grupo.', message);

    bot.party.hideMembers(false);
    success3('✅│ Completado el desoculto', message);

  }
}