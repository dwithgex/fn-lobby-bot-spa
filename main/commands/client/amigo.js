const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'amigo',
  description: 'Envía una solicitud de amistad a alguien.',
  category: 'client',
  aliases: ['add', 'friendrequest', 'friend'],
  uso: '<user>',
  ejemplo:'<set_user_name>',

  run: async (client, bot, message, args, getCosmetic) => {
    const user = args.slice(0).join(' ');
    if (!user) return error2('❌│ Por favor proporcione un usuario.', message);

    try {
      await bot.addFriend(user);
      success3(`✅│ La solicitud de amistad se ha enviado a ${user}.`, message);
    } catch {
      error2(`❌│ Ocurrió un error al intentar agregar ${user} como amigo.`, message);
    }
  }
}