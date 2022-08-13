const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'borraramigo',
  description: 'Eliminar a un amigo',
  category: 'client',
  aliases: ['unfriend','borrar', 'clearfriend'],
  usage: '<user>',
  example: '<set_user_name>',

  run: async (client, bot, message, args, getCosmetic) => {
    const user = bot.friends.find(x => x.displayName === args.slice(0).join(' '));
    if (!user) return error2('❌│ Por favor proporcione un amigo', message);

    try {
      await bot.removeFriend(user.displayName);
      success3(`${user.displayName} Ha sido eliminado de tu lista de amigos.│✅`, message);
    } catch {
      error2(`Ocurrió un error al intentar eliminar ${user.displayName} de tu lista de amigos.`, message);
    }
  }
}