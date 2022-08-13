const { success3, error2 } = require('../../utils/functions.js');

module.exports = {
  name: 'copiar',
  description: 'Copia a un miembro del grupo\'s establecido.',
  category: 'general',
  aliases: ['c', 'copiar', 'copy'],
  usage: '[member]',
  example: '<set_user_name>',

  run: async (client, bot, message, args, getCosmetic) => {
    const member = bot.party.members.find(x => x.displayName === args.slice(0).join(' '));
    if (!member) return error2('❌│ Por favor ingrese un miembro para copiar.', message); 

    const items = {
      outfit: member.outfit,
      backpack: member.backpack,
      emote: member.emote,
      pickaxe: member.pickaxe
    }

    if (items.outfit) await bot.party.me.setOutfit(items.outfit);
    if (items.backpack) await bot.party.me.setBackpack(items.backpack);
    if (items.pickaxe) await bot.party.me.setPickaxe(items.pickaxe);
    if (items.emote) await bot.party.me.setEmote(items.emote);
    success3(`✅│ Copiado ${member.displayName}'s establecido!`, message);
  }
}