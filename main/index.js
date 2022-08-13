///////////////////// Packages /////////////////////
const Discord = require('discord.js');
const fetch = require('node-fetch');
const mySecret = process.env['TOKEN']
const config = require('./config');
const { Collection } = require('discord.js');
const { Client, Enums } = require('fnbr');
const { readFile, writeFile } = require('fs').promises;
const { keep_alive } = require("./keep_alive");

///////////////////// Client /////////////////////
async function getCosmetic(name, backend) {
  const url = 'https://fortnite-api.com/v2/cosmetics/br/search' +
  `?name=${name}` +
  `&backendType=${backend}` +
  `&matchMethod=contains`;

  return (await fetch(url)).json();
}

(async () => {
  const Options = {
    status: config.fortnite.status,
    platform: config.fortnite.platform,
    keepAliveInterval: 30,
    debug: false,
    kairos: {
      cid: config.fortnite.cid[0] ? config.fortnite.cid[0] : config.fortnite.cid,
      color: Enums.KairosColor.GRAY
    },
    auth: {}
  }

  const client = new Discord.Client();

  client.commands = new Collection();
  client.aliases = new Collection();

  ['command'].forEach(handler => {
    require(`./${handler}`)(client);
  }); 

  try {
    Options.auth.deviceAuth = JSON.parse(await readFile('./deviceAuth.json'));
  } catch (e) {
    Options.auth.authorizationCode = async () => Client.consoleQuestion('[FORTNITE] [INICIAR SESIÓN] Por favor ingrese el código de autorización:');
  }

  const bot = new Client(Options);

  client.on('message', async message => {
    if (!message.content.startsWith(config.discord.prefix)) return;

    if (config.discord.ownerOnly && !config.discord.ownerIDs.includes(message.author.id)) return;

    const args = message.content.slice(config.discord.prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
      if (!bot.party) return message.channel.send('No estoy en partida, ¡por favor espera!');
      command.run(client, bot, message, args, getCosmetic);
    }
  });

  ///////////////////// Console-Logs /////////////////////
  console.log('\x1b[36m', '╔══════════════ [ WithGex Lobby Bot template (Spanish) ] ════════════════╗' ,'\x1b[0m')
  console.log('\x1b[36m', '╚════════════════════[ Support: https://dsc.gg/gex ]═════════════════════╝' ,'\x1b[0m')
   console.log('\x1b[36m', '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' ,'\x1b[0m')
  console.log('► Visita mi web: https://withgex.wixsite.com/tools')
  console.log('\x1b[36m', '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' ,'\x1b[0m')    
 ///////////////////// Token-Discord /////////////////////
  if (process.env['TOKEN'] === 'TOKEN') return console.log('[WITHGEX] [DISCORD]', 'Ingrese un token válido en Secrets (.env) o config.js');

  bot.on('deviceauth:created', (da) => writeFile('./deviceAuth.json', JSON.stringify(da, null, 2)));

/////////////////////// PARTY JOIN /////////////////////////
  bot.on('party:member:joined', member => {
    if (member.displayName === bot.user.displayName) return;
    console.log('[JOINED] [FORTNITE]', `${member.displayName} se ha unido a la sala. Número de miembros: ${bot.party.members.size}.`);
    if (!config.fortnite.joinMessage || config.fortnite.joinMessage === '') return;
    const msg = config.fortnite.joinMessage.replace('%memberName%', member.displayName).replace('%memberCount%', bot.party.members.size);
    bot.party.sendMessage(msg);
  });

/////////////////////// PARTY INVITE /////////////////////////
  bot.on('party:invite', invite => {
    console.log('[INVITE] [FORTNITE]', `Recibí una invitación a una sala de ${invite.sender.displayName}.`);

    if (config.fortnite.acceptInvite) {
      invite.accept();
    } else {
      invite.decline();
    }

    console.log('[INVITACIÓN] [FORTNITE]', `Invitación de ${invite.sender.displayName} ha sido ${config.fortnite.acceptInvite ? 'aceptada' : 'rechazada'}.`);
  });

/////////////////////// FRIEND REQUEST /////////////////////////
  bot.on('friend:request', request => {
    console.log('[FRIEND] [FORTNITE]', `Recibí una solicitud de amistad de ${request.displayName}.`);

    if (config.fortnite.acceptFriend) {
      request.accept();
    } else {
      request.abort();
    }

    console.log('[FRIEND] [FORTNITE]', `Solicitud de amistad de ${request.displayName} ha sido ${config.fortnite.acceptFriend ? 'aceptada' : 'rechazada'}.`);
  });

  /////////////////////// BOT READY /////////////////////////
  bot.on('ready', () => {
    const cosmetics = {
      cid: config.fortnite.cid,
      bid: config.fortnite.bid,
      eid: config.fortnite.eid,
      pickaxe_id: config.fortnite.pickaxe_id
    };

    bot.party.me.setOutfit(cosmetics.cid);
    bot.party.me.setBackpack(cosmetics.bid);
    bot.party.me.setEmote(cosmetics.eid);
    bot.party.me.setPickaxe(cosmetics.pickaxe_id);
  });

  /////////////////////////// Client Login Discord //////////////////////////////
  await bot.login();
  client.login(process.env['TOKEN']);

  /////////////////////////// Status Discord ///////////////////////////////////
  client.on('ready', () => {
  client.user.setActivity("Dev in dsc.gg/gex", {
  type: "STREAMING",
  url: "https://www.twitch.tv/withgex"
  });

     ////////////////////////////// Console Logs 2 //////////////////////////////
    const replaced = config.discord.status.replace('%clientUserDisplayName%', bot.user.displayName).replace('%PartyMemberCount%', bot.party.members.size).replace('%ClientPartyUserOutfit%', bot.party.me.outfit)
    .replace('%ClientPartyUserPickaxe%', bot.party.me.pickaxe).replace('%ClientPartyUserEmote%', bot.party.me.emote).replace('%ClientPartyUserBackpack%', bot.party.me.backpack)
    .replace('%ClientPartyUserIsReady%', bot.party.me.isReady).replace('%ClientPartyUserIsLeader%', bot.party.me.isLeader).replace('%ClientUserID%', bot.id);
    console.log('[WITHGEX] [DISCORD]', `Client ready as ${client.user.tag} [${client.commands.size} commands]`);
    console.log('[WITHGEX] [FORTNITE]', `Client ready as ${bot.user.displayName}.`);
  });
})();


//© Copyright GexTools - © Copyright Sirius//