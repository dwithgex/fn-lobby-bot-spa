const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'bloquear',
  description: 'Bloquea a un amigo.',
  category: 'client',
  aliases: ['block', 'bloquear'],
  usage: '<friend>',
  example: '<set_user_name>',

  run: async (client, bot, message, args, getCosmetic) => {
    const friend = bot.friends.find(x => x.displayName === args.slice(0).join(' '));
    if (!friend) return error2('❌│ Por favor proporcione un amigo para bloquear.', message);

    try {
      await friend.block();
      success3(`${friend.displayName} ✅│ Ha sido bloqueado con exito.`, message);
    } catch {
      error2(`❌│ Ocurrió un error al intentar bloquear ${friend.displayName}.`, message);
    }
  }
}