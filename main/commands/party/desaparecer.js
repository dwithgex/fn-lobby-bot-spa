const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'desaparecer',
  description: 'Haz desaparecer a todos los Jugadores siendo el bot Líder del grupo',
  category: 'party',
  aliases: ['hide', 'ocultar', 'esconder', 'desaparecer', 'close'],
  usage: ' ',
  example: '',

  run: async (client, bot, message, args, getCosmetic) => {
    if (!bot.party.me.isLeader) return error2('❌│ Debo ser el líder del grupo para poder hacer desaparecer a todos los miembros del grupo..', message);

    bot.party.hideMembers(true);
    success3('✅│ Todos los miembros del grupo han desaparecido', message);

  }
}

