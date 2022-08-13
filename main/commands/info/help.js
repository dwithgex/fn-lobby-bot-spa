const config = require('../../config.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Muestra una lista de comandos disponibles.',
  category: 'info',
  aliases: ['h'],
  usage: '[Comandos]',
  example: '',

  run: async (client, bot, message, args, getCosmetic) => {
    const prefix = config.discord.prefix;

    const commands = {
      client: client.commands.filter(x => x.category === 'client'),
      party: client.commands.filter(x => x.category === 'party'),
      cosmetic: client.commands.filter(x => x.category === 'cosmetic'),
      general: client.commands.filter(x => x.category === 'general'),
      info: client.commands.filter(x => x.category === 'info')
    }

    let command = client.commands.get(args[0]);
    if (!command) command = client.commands.get(client.aliases.get(args[0]));

    if (command) {
      const cmdEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('Comandos')
      .setDescription(`
       Nombre ➟ **${command.name}**
       Descripción ➟ **${command.description}**
       Categoria ➟ **${command.category}**
       Alias ➟ **${command.aliases ? command.aliases.map(x => x).join(', ') : 'None'}**
       Uso ➟ **${command.usage ? command.usage : 'None'}**
       Ejemplo ➟ **${prefix}${command.name} ${command.example}**`)
       .setFooter(`Gex Lobby Bot Template | ${client.commands.size} Commands`, (client.user.displayAvatarURL(80)));
       message.channel.send(cmdEmbed);
    } else {
    const embed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor('Comandos')
    .setDescription(`> - Aquí hay una lista de comandos disponibles, usa \`${prefix}help <commando>\` para ver más sobre un comando.\n[🔗 Servidor de Soporte](https://discord.com/invite/ZzQ5xzbQGc)\n[🔗 Website](https://withgex.wixsite.com/tools)`)
    .addField(`‣  Cliente - Client  [${commands.client.size}]`, commands.client.map(x => `\`${x.name}\``).join(', '))
    .addField(`‣  Sala - Lobby - Salon [${commands.party.size}]`, commands.party.map(x => `\`${x.name}\``).join(', '))
    .addField(`‣  Cosmeticos - Cosmetics - Cosmétique [${commands.cosmetic.size}]`, commands.cosmetic.map(x => `\`${x.name}\``).join(', '))
    .addField(`‣  General - Générale [${commands.general.size}]`, commands.general.map(x => `\`${x.name}\``).join(', '))
    .addField(`‣  Info [${commands.info.size}]`, commands.info.map(x => `\`${x.name}\``)
    .join(', '))
    .setFooter(`Gex Lobby Bot Template - dsc.gg/gex`, (client.user.displayAvatarURL(80)));
    message.channel.send(embed);
    }
  }
}
