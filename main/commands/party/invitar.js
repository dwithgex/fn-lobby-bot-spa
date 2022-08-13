const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'invitar',
  description: 'Invita a alguien al grupo.',
  category: 'party',
  aliases: ['inv', 'invite', 'invitame', 'invit'],
  usage: '<user>',
  example: '<set_user_name>',

  run: async (client, bot, message, args, getCosmetic) => {
    const user = args.slice(0).join(' ');
    if (!user) return error2('❌│ Por favor proporcione un usuario.', message);

    try {
      await bot.party.invite(user);
      success3(`✅│ ${user} ha sido invitado a tu grupo.`, message);
    } catch {
      error2(`❌│ Ocurrió un error al intentar invitar ${user} a la partida, (verifica que tu grupo este publico).`, message);
    }
  }
}