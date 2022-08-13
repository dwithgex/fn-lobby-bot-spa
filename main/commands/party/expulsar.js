const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'expulsar',
  description: 'Kicks someone from the party.',
  aliases: ['expulsar', 'kick', 'patear'],
  category: 'party',
  usage: '<user>',
  example: '<set_user_name>',

  run: async (client, bot, message, args, getCosmetic) => {
    if (!bot.party.me.isLeader) return error2('⚠️│ Debo ser el líder del partido para expulsar a la gente.', message);
    const member = bot.party.members.find(x => x.displayName === args.slice(0).join(' '));
    if (!member) return error2('⚠️│ Por favor proporcione un miembro del partido para expulsar.', message);

    try {
      await member.kick();
      success3(`✅│ ${member.displayName} ha sido expulsado del grupo.`, message);
    } catch {
      error2(`❌│ Ocurrió un error al intentar expulsar ${member.displayName}.`, message);
    }
  }
}