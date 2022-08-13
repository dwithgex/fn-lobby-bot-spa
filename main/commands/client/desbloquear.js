const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'desbloquear',
  description: 'Desbloquea a un amigo.',
  category: 'client',
  usage: '<friend>',
  example: '<set_user_name>',

  run: async (client, bot, message, args, getCosmetic) => {
    const friend = args.slice(0).join(' ');
    if (!friend) return error2('❌│ Por favor proporcione un amigo para bloquear.', message);

    try {
      await bot.unblockFriend(friend);
      success3(`${friend} ✅│ Ha sido desbloqueado.`, message);
    } catch {
      error2(`❌│ Ocurrió un error al intentar desbloquear ${friend}.`, message);
    }
  }
}