const { WA_DEFAULT_EPHEMERAL, proto, generateWAMessage, areJidsSameUser, prepareWAMessageMedia, generateWAMessageFromContent, } = require('@whiskeysockets/baileys')
const { sendInteractiveMessage, sendButtons } = require('gifted-btns');
const os = require('os')
const fs = require('fs')
const path = require('path')
const util = require('util')
const moment = require('moment-timezone')
const speed = require('performance-now')
const axios = require('axios')
const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { exec } = require("child_process")
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)
const FormData = require('form-data')
const yts = require("yt-search")
const qrcode = require('qrcode');
const { xvideosSearch, xvideosdl, soundcloudDl, scsearch, pinterest }= require('api-dylux')
const mimeTyp = require('mime-types');
const sharp = require('sharp');
const { color } = require('./lib/color.js')
const { getGroupAdmins, isUrl, sleep, runtime, runtime2, fetchJson, getRandom, restart, update, isValidJid, cineruSearch, cineruDetail, cineruDownload, generateMegaDirectLink, base64UrlEncode, movieboxMoviesDownload } = require('./lib/function.js')
const { apiClient } = require('./lib/apiClient.js')
const { getAllOwnerNumbers, loadLocal, updateSetting, addForwardJid, delForwardJid, listForwardJid } = require('./database/database.js')

const tmdbmovieupload = new Set();

module.exports = cyberkavi = async (cyberkavi, m, msg, chatUpdate, store) => {
  try {
    let sender = m.sender
    const { type, quotedMsg, mentioned, now, fromMe } = m
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype === 'imageMessage') ? m.message.imageMessage?.caption : (m.mtype === 'videoMessage') ? m.message.videoMessage?.caption : (m.mtype === 'extendedTextMessage') ? m.message.extendedTextMessage?.text : (m.mtype === 'reactionMessage') ? m.message.reactionMessage?.text : (m.mtype === 'buttonsResponseMessage') ? m.message.buttonsResponseMessage?.selectedButtonId : (m.mtype === 'listResponseMessage') ? m.message.listResponseMessage?.singleSelectReply?.selectedRowId : (m.mtype === 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage?.selectedId : (m.mtype === 'interactiveResponseMessage' && m.quoted?.fromMe) ? (m.message.interactiveResponseMessage?.nativeFlowResponseMessage ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson || '{}')?.id : '') : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || '') : (m.mtype === 'editedMessage') ? (m.message.editedMessage?.message?.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.editedMessage?.message?.protocolMessage?.editedMessage?.conversation || '') : (m.mtype === 'protocolMessage') ? ( m.message.protocolMessage?.editedMessage?.extendedTextMessage?.text || m.message.protocolMessage?.editedMessage?.conversation || m.message.protocolMessage?.editedMessage?.imageMessage?.caption || m.message.protocolMessage?.editedMessage?.videoMessage?.caption || '') : '';
    var budy = (typeof m.text == 'string' ? m.text : '')
    var prefix = ['.', '/'] ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : botprefix
    const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const botNumber = await cyberkavi.decodeJid(cyberkavi.user.id)
    const text = q = args.join(" ")
    const from = m.key.remoteJid
    const Kaviymisc = (m.quoted || m)
    const quoted = (Kaviymisc.mtype == 'buttonsMessage') ? Kaviymisc[Object.keys(Kaviymisc)[1]] : (Kaviymisc.mtype == 'templateMessage') ? Kaviymisc.hydratedTemplate[Object.keys(Kaviymisc.hydratedTemplate)[1]] : (Kaviymisc.mtype == 'product') ? Kaviymisc[Object.keys(Kaviymisc)[0]] : m.quoted ? m.quoted : m
    const mime = (quoted.msg || quoted).mimetype || ''
    const qmsg = (quoted.msg || quoted)
    const pric = /^#.¦|\\^/.test(body) ? body.match(/^#.¦|\\^/gi) : botprefix
    const Kaviybody = body.startsWith(pric)
    const isCommand = Kaviybody ? body.replace(pric, '').trim().split(/ +/).shift().toLowerCase() : ""
    const isGroup = m.key.remoteJid.endsWith('@g.us')
    const groupMetadata = m.isGroup ? await cyberkavi.groupMetadata(m.chat).catch(e => {}) : ''
    const participants = m.isGroup ? await groupMetadata.participants : []

    if (sender.endsWith('@lid')) {
      const participant = participants.find(p => p.id === sender);
      if (participant && participant.phoneNumber) {
        localcyberSender = participant.phoneNumber;
        sender = await cyberkavi.decodeJid(localcyberSender);
      }
    }

    const adminPhoneNumbers = m.isGroup ? await getGroupAdmins(participants) : ''
    const groupAdmins = participants.filter(participant => adminPhoneNumbers.includes(participant.id)).map(admin => admin.phoneNumber);
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(sender) : false
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isAdmins = m.isGroup ? groupAdmins.includes(sender) : false
    const groupOwner = m.isGroup ? groupMetadata.owner : ''
    const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(sender) : false

    const isValidPhoneNumber = (number) => /^[0-9]{10,15}$/.test(number);
    const kaviTheDeveloper = '94766577249@s.whatsapp.net'.includes(sender);

    const database = await loadLocal();
    const autoreact = database.settings.autoreact;
    const online = database.settings.online;
    const autoread = database.settings.autoread;
    const autorecord = database.settings.autorecord;
    const autotype = database.settings.autotype;

    const kavixcap = "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 💠 ᴋᴀᴠɪ-x ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ."
    const kavixcaption = "✯ ɢᴇɴᴇʀᴀᴛᴇᴅ ʙʏ ᴋᴀᴠɪ-x ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ ✯"
    const kavixerr2 = '❌ ᴀɴ ᴜɴᴇxᴘᴇᴄᴛᴇᴅ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ.';

    const cyberkavikey = {
      key:{
        remoteJid: "status@broadcast",
        fromMe: false,
        id: 'FAKE_META_ID_001',
        participant: '13135550002@s.whatsapp.net'
      },
      message: {
        contactMessage:{
          displayName: 'KAVI-X MD V2',
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Alip;;;;\nFN:Alip\nTEL;waid=13135550002:+1 313 555 0002\nEND:VCARD`
        }
      }
    };

    function cleanLid(id) {
      if (typeof id !== 'string') return id
      if (id.endsWith('@lid') && id.includes(':')) {
        return id.split(':')[0] + '@lid'
      }
      return id
    }

    const KaviTheCreators = async (m, cyberkavi) => {
      const ownerNumbers = await getAllOwnerNumbers();
      const customNumbers = ['94702128378', '94766577249', '94764891827'];

      const allNumbers = [cyberkavi, ...ownerNumbers, ...customNumbers].filter(v => v != null).map(v => String(v).replace(/[^0-9]/g, '') + '@s.whatsapp.net');

      return allNumbers.includes(sender);
    };

    const KaviTheCreator = await KaviTheCreators(m, botNumber);

    const kavireact = (remsg) => {
      cyberkavi.sendMessage(m.chat, {
          react: {
              text: remsg,
              key: m.key
          }
      })
    }

    const KaviOwnerMsg = () => {
      let kavimsg = '🚫 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ᴏɴʟʏ ғᴏʀ ᴏᴡɴᴇʀs.'
      cyberkavi.sendMessage(from, { text: kavimsg }, { quoted: m })
    }
    
    const KaviGroupMsg = () => {
      let kavimsg = '🚫 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ᴏɴʟʏ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs.'
      cyberkavi.sendMessage(from, { text: kavimsg }, { quoted: m })
    }

    async function replygckavi(teks) {
      await cyberkavi.sendMessage(m.chat, {
        text: teks,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 99999999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363417324607329@newsletter',
            newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
            serverMessageId: 1
          }
        }
      }, { quoted: cyberkavikey });
    }

    function formatSize(bytes) {
      const mb = bytes / (1024 ** 2);
      if (mb < 1024) {
        return `${Math.round(mb)} MB`;
      } else {
        return `${(mb / 1024).toFixed(1)} GB`;
      }
    }

    async function buildDownloadLink(originalUrl) {
      if (!originalUrl) return null;

      if (originalUrl.includes("workers.dev") || originalUrl.includes("qqvdecy80l.workers.dev")) {
        return originalUrl;
      }

      return "https://dl.qqvdecy80l.workers.dev/" + encodeURIComponent(await cleanUrl(originalUrl));
    }

    function extractGoogleDriveId(url) {
      if (!url) return null;

      const patterns = [
        /\/file\/d\/([a-zA-Z0-9_-]+)/,
        /[?&]id=([a-zA-Z0-9_-]+)/,
        /\/folders\/([a-zA-Z0-9_-]+)/,
        /drive\.usercontent\.google\.com\/.*?[?&]id=([a-zA-Z0-9_-]+)/
      ];

      for (const regex of patterns) {
        const match = url.match(regex);
        if (match && match[1]) return match[1];
      }

      return null;
    }

    const normalizeQuality = (q = "") => {
      q = q.toLowerCase();
      if (q.includes("1080")) return "1080p";
      if (q.includes("720"))  return "720p";
      if (q.includes("480"))  return "480p";
      if (q.includes("360"))  return "360p";
      return q;
    };

    if (autoreact && !fromMe) {
      const emojis = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '💜', '💙', '🌝', '🖤', '💚'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      await cyberkavi.sendMessage(m.chat, { react: { text: randomEmoji, key: m.key, }}, { quoted: m });
    }
    
    if (online) {
      cyberkavi.sendPresenceUpdate('available', botNumber)
    } else {
      cyberkavi.sendPresenceUpdate('unavailable', botNumber)
    }

    if (autoread) {
      cyberkavi.readMessages([m.key])
    }

    if (autorecord){
      let Kavimix = ['recording']
      let Kavimix2 = Kavimix[Math.floor(Kavimix.length * Math.random())]
      await cyberkavi.sendPresenceUpdate(Kavimix2, from)
    }

    if (autotype){
      let Kavipos = ['composing']
      cyberkavi.sendPresenceUpdate(Kavipos, from)
    }

    const getSystemInfo = () => {
      const info = {
        platform: os.platform(),
        architecture: os.arch(),
        cpu: os.cpus()[0].model,
        cores: os.cpus().length,
        memory: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} ɢʙ`,
        freeMemory: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} ɢʙ`,
      };
      return info;
    };
    
    async function getFileSize(url) {
      try {
        const res = await axios.head(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
            "Referer": "https://dl.vidsrc.vip/",
            "Accept": "*/*",
          },
          timeout: 10000
        });

        const length = res.headers["content-length"];
        if (!length) return "Unknown";

        return formatSize(parseInt(length));
      } catch {
        return "Unknown";
      }
    }

    async function getFileSize2(url) {
      try {
        const res = await axios.head(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Connection": "keep-alive",
            "Referer": "https://dl.vidsrc.vip/",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-User": "?1",
            "Sec-Fetch-Dest": "document",
            "Upgrade-Insecure-Requests": "1",
            "sec-ch-ua": `"Not(A:Brand";v="8", "Chromium";v="144", "Brave";v="144"`,
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": `"Windows"`,
            "Sec-GPC": "1"
          }
        });

        const size = res.headers["content-length"];
        if (!size) return "Unknown";
        return `${(parseInt(size) / (1024 * 1024)).toFixed(2)} MB`;
      } catch (err) {
        return "Unknown";
      }
    }

    function cleanUrl(url) {
      const [base] = url.split('?n=');
      return base;
    }

    function replyError(type) {
      const errors = {
        API_FAIL: "> 🚫 ᴀᴘɪ ᴄᴏɴɴᴇᴄᴛɪᴏɴ ꜰᴀɪʟᴇᴅ - 📡 ꜱᴇʀᴠᴇʀ ɪꜱ ɴᴏᴛ ʀᴇꜱᴘᴏɴᴅɪɴɢ.",
        EP_NOT_FOUND: "> 🚫 ᴇᴘɪꜱᴏᴅᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ - 📭 ᴛʜɪꜱ ᴇᴘɪꜱᴏᴅᴇ ɪꜱ ᴍɪꜱꜱɪɴɢ ᴏʀ ʀᴇᴍᴏᴠᴇᴅ.",
        SERVER_EMPTY: "> ⚠️ ɴᴏ ᴅᴏᴡɴʟᴏᴀᴅ ꜱᴇʀᴠᴇʀꜱ - 📂 ᴅʟ ꜱᴇʀᴠᴇʀꜱ ᴀʀᴇ ᴄᴜʀʀᴇɴᴛʟʏ ᴜɴᴀᴠᴀɪʟᴀʙʟᴇ.",
        QUALITY_FAIL: "> ⚠️ Qᴜᴀʟɪᴛʏ ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ - 🎞️ ʀᴇQᴜᴇꜱᴛᴇᴅ Qᴜᴀʟɪᴛʏ ɪꜱ ᴍɪꜱꜱɪɴɢ.",
        DL_LINK_FAIL: "> 🚫 ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ ꜰᴀɪʟᴇᴅ - 🔗 ᴅɪʀᴇᴄᴛ ʟɪɴᴋ ᴇxᴘɪʀᴇᴅ ᴏʀ ʙʟᴏᴄᴋᴇᴅ.",
        FILE_TOO_LARGE: "> 🚫 ꜰɪʟᴇ ꜱɪᴢᴇ ʟɪᴍɪᴛ - 📦 ꜰɪʟᴇ ɪꜱ ᴛᴏᴏ ʟᴀʀɢᴇ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ.",
        FORWARD_FAIL: "> ⚠️ ꜰᴏʀᴡᴀʀᴅɪɴɢ ꜱᴛᴏᴘᴘᴇᴅ - 📛 ꜱᴏᴍᴇ Jɪᴅꜱ ᴀʀᴇ ɴᴏᴛ ᴀᴄᴄᴇᴘᴛɪɴɢ ꜰᴏʀᴡᴀʀᴅꜱ."
      };

      return replygckavi(errors[type] || "> ❌ ᴜɴᴅᴇғɪɴᴇᴅ - 🚫 ᴜɴᴋɴᴏᴡɴ ᴇʀʀᴏʀ.");
    }

    if (isCommand) {
      console.log('COMMAND', `${budy || m.mtype}\n=> From ${pushname} ${sender}\n=> In ${m.isGroup ? pushname : 'Private Chat'} ${m.chat}`)
    }

    //Movie && Series Commands Handler\\
    if (m.quoted && m.text) {
      if (isGroup) {
        const cleanCyberLid = cleanLid(cyberkavi.user.lid)
        const cleanCyberId = cyberkavi.decodeJid(cyberkavi.user.id)
        if (m.quoted.sender !== cleanCyberLid && m.quoted.sender !== cleanCyberId) return;
      } else if (!isGroup) {
        if(m.quoted.sender !== botNumber) return;
      }
      const resualt = m.quoted.text.split("\n");
      if (resualt[0].includes("ID-MOVIE-000")) {//🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          
          const titleLine = resualt.find(item => item.startsWith(`${input}.`));
          const title = titleLine?.replace(`${input}.`, '').trim();
          
          const [titleFull, id] = title.split('|||').map(v => v.trim());

          if (!titleFull, !id) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const movieDetails = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/movies/details/?id=${id}`);
          const movieDownload = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/movies/download/?id=${id}`);

          const downloads = movieDownload.data.data;
          const movie = movieDetails.data.data;
          const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : null;

          let downloadData = '*```Download options not available.```*';

          if (downloads?.length) {
            const lines = [];

            for (let i = 0; i < downloads.length; i++) {
              const size = downloads[i].url ? await getFileSize(downloads[i].url) : "Unknown";
              lines.push(`${i + 1}. ${downloads[i].quality} (${size})`);
            }

            downloadData = lines.join('\n');
          }

          const sendData = `ID-MOVIE-001

🎬 ᴛɪᴛʟᴇ: ${movie.title}
🎞️ ᴏʀɪɢɪɴᴀʟ ᴛɪᴛʟᴇ: ${movie.original_title}

> ⭐ ɪᴅ: ${movie.id}
> ⭐ ɪᴍᴅʙ ʀᴀᴛɪɴɢ: ${movie.vote_average} (${movie.vote_count} votes)
> 🗓️ ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ: ${movie.release_date}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${movie.runtime} minutes
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${movie.original_language.toUpperCase()}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${movie.origin_country.join(', ')}
> 🎭 ɢᴇɴʀᴇs: ${movie.genres.map(g => g.name).join(', ')}
> 📊 ᴘᴏᴘᴜʟᴀʀɪᴛʏ: ${movie.popularity}
> 🎬 sᴛᴀᴛᴜs: ${movie.status}
> 🏷️ ᴛᴀɢʟɪɴᴇ: ${movie.tagline || 'N/A'}
> 💰 ʙᴜᴅɢᴇᴛ: $${movie.budget.toLocaleString()}
> 💵 ʀᴇᴠᴇɴᴜᴇ: $${movie.revenue.toLocaleString()}
> 🌎 ᴘʀᴏᴅᴜᴄᴛɪᴏɴ ᴄᴏᴜɴᴛʀɪᴇs: ${movie.production_countries.map(c => c.name).join(', ')}
> 📝 ᴏᴠᴇʀᴠɪᴇᴡ: ${movie.overview}

📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴꜱ:
${downloadData}


\`\`\`${wagc}\`\`\``.trim();
          
          if (imageUrl) {
            await cyberkavi.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
            kavireact('✅');
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
            kavireact('✅');
          }
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-MOVIE-001")) {//🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          kavireact("🎥")
          if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");

          const input = m.text.trim();

          const qualityLine = resualt.find(item => item.startsWith(`${input}.`));
          const quality = qualityLine?.replace(`${input}.`, '').trim();
          const idLine = resualt.find(item => item.startsWith(`> ⭐ ɪᴅ:`));
          const id = idLine?.replace(`> ⭐ ɪᴅ:`, '').trim();
          
          if (!id || !quality) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const movieDetails = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/movies/details/?id=${id}`);
          const movieDownload = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/movies/download/?id=${id}`);

          const downloads = movieDownload.data.data;
          const movie = movieDetails.data.data;
          const imageUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : null;

          const selectedIndex = parseInt(m.text.trim()) - 1;
          if (isNaN(selectedIndex) || selectedIndex < 0) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const result = downloads[selectedIndex];
          if (!result || !result.url) return replygckavi('🚫 ᴛʜᴇ ǫᴜᴀʟɪᴛʏ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');
          const url = result.url;

          const sendData = `*\`${movie.title}\`*

> ⭐ ɪᴅ: ${movie.id}
> 🌟 ɪᴍᴅʙ ʀᴀᴛɪɴɢ: ${movie.vote_average}
> 🗓️ ʀᴇʟᴇᴀsᴇ ᴅᴀᴛᴇ: ${movie.release_date}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${movie.runtime} minutes
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${movie.original_language.toUpperCase()}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${movie.origin_country.join(', ')}
> 🎭 ɢᴇɴʀᴇs: ${movie.genres.map(g => g.name).join(', ')}
> 📊 ᴘᴏᴘᴜʟᴀʀɪᴛʏ: ${movie.popularity}
> 🎬 sᴛᴀᴛᴜs: ${movie.status}
> 🏷️ ᴛᴀɢʟɪɴᴇ: ${movie.tagline || 'N/A'}

⏳ Downloading... Please wait
🔖 Without Sinhala Subtitle

\`\`\`${wagc}\`\`\``.trim();
          
          if (imageUrl) {
            await cyberkavi.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
          }

          tmdbmovieupload.add(sender);

          const headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",
            "Referer": "https://dl.vidsrc.vip/",
            "Accept": "*/*",
          };
          const downloadLink = url;
          const response = await axios.head(downloadLink, { timeout: 10000, headers });
          const contentLength = response.headers['content-length'];
          const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';
          const extension = "mkv";
          const mimeType = "video/x-matroska";

          const imgRes = await axios.get(imageUrl, { responseType: "arraybuffer", timeout: 8000 });
          const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000, headers });

          const imgBuffer = Buffer.from(imgRes.data)
          const fileBuffer = Buffer.from(fileRes.data);

          const documentCaption = `KAVI-X MD MOVIE SENDER BOT\n\n🎬 *TITLE:* ${movie.title}\n🧩 *QUALITY:* ${quality}\n📦 *SIZE:* ${fileSize}\n🔖 *SINHALA SUBTITLE:* NO\n\n${kavixcaption}`;

          await cyberkavi.sendMessage(m.chat, {
            document: fileBuffer,
            caption: `${documentCaption}\nFileName: 📽️ KAVI-X 📽️ ${movie.title}`,
            mimetype: mimeType,
            fileName: `📽️ KAVI-X 📽️ ${movie.title}.${extension}`,
            jpegThumbnail: imgBuffer
          }, { quoted: m });

          try {
            const sinhalaSubRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v2/app/movies/subtitle/?id=${id}`);
            const englishSubRes = await axios.get(`https://sub.wyzie.ru/search?id=${id}&language=en&format=srt`);
            const sinhalaSub = sinhalaSubRes.data.data;
            const englishSub = englishSubRes.data[0]?.url;

            if (sinhalaSub) {
              const sinhalaCaption = `📜 𝗦𝗜𝗡𝗛𝗔𝗟𝗔 𝗦𝗨𝗕𝗧𝗜𝗧𝗟𝗘

  🎬 Title: ${movie.title}
  🧩 Quality: ${quality}
  🔖 Subtitle: Sinhala (Translated)
  💬 Original: English
  🔥 Hardcoded Translate Edition
  FileName: 📽️ KAVI-X 📽️ - 𝗦𝗜𝗡𝗛𝗔𝗟𝗔 𝗦𝗨𝗕𝗧𝗜𝗧𝗟𝗘 - ${movie.title}`;

              await cyberkavi.sendMessage(m.chat, {
                document: Buffer.from(sinhalaSub, "utf-8"),
                mimetype: "application/x-subrip",
                caption: sinhalaCaption,
                fileName: `📜 ${movie.title} - Sinhala Subtitle.srt`,
                jpegThumbnail: imgBuffer.data
              }, { quoted: m });
            }

            if (englishSub) {
              const engBuffer = (await axios.get(englishSub, { responseType: "arraybuffer" })).data;

              const englishCaption = `📜 𝗘𝗡𝗚𝗟𝗜𝗦𝗛 𝗦𝗨𝗕𝗧𝗜𝗧𝗟𝗘

  🎬 Title: ${movie.title}
  🧩 Quality: ${quality}
  🔖 Subtitle: English (Original)
  💬 Original: English
  🔥 Hardcoded Translate Edition
  FileName: 📽️ KAVI-X 📽️ - 𝗘𝗡𝗚𝗟𝗜𝗦𝗛 𝗦𝗨𝗕𝗧𝗜𝗧𝗟𝗘 - ${movie.title}`;

              await cyberkavi.sendMessage(m.chat, {
                document: engBuffer,
                mimetype: "application/x-subrip",
                caption: englishCaption,
                fileName: `📜 ${movie.title} - English Subtitle.srt`,
                jpegThumbnail: imgBuffer.data
              }, { quoted: m });
            }
          } catch (error) {}

          tmdbmovieupload.delete(sender);
          kavireact("✅");
        } catch (e) {
          tmdbmovieupload.delete(sender);
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-MOVIE-002")) {//🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥");

          const input = m.text.trim();
          
          const titleLine = resualt.find(item => item.startsWith(`${input}.`));
          const searchLine = resualt.find(item => item.startsWith(`🎥 Movie Name:`));
          const title = titleLine?.replace(`${input}.`, '').trim();
          const search = searchLine?.replace(`🎥 Movie Name:`, '').trim();
          
          if (!title || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const movieRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!movieRes.data?.data) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = movieRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieDetails = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/sinhalasub/details/?url=${movieData.link}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!movieDetails.data?.data) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const details = movieDetails.data.data;

          let downloadData = '*```Download options not available.```*';
          if (movieDetails.data.data.downloads?.length) {
            const filteredDownloads = movieDetails.data.data.downloads.filter(d => ['pixeldrain', 'DLServer-01', 'DLServer-02'].includes(d.provider));
            if (filteredDownloads.length) {
              const lines = filteredDownloads.map((d, i) => `${i + 1}. ${d.provider} - ${d.quality} - ${d.size}`);
              downloadData = lines.join('\n');
            }
          }

          const imageUrl = details.poster || null;

          const sendData = `ID-MOVIE-003

🎬 ᴛɪᴛʟᴇ: ${details.title}
🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ: ${search}

> ⭐ ʀᴀᴛɪɴɢ: ${details.rating || 'N/A'} / IMDb: ${details.imdb || 'N/A'}
> 🗓️ ʀᴇʟᴇᴀsᴇ ʏᴇᴀʀ: ${details.info.Year || 'N/A'}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${details.runtime || 'N/A'}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${details.info.Language?.toUpperCase() || 'N/A'}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${details.info.Country?.toUpperCase() || 'N/A'}
> 🎭 ɢᴇɴʀᴇs: ${details.genres.join(', ') || 'N/A'}
> 🎬 ᴅɪʀᴇᴄᴛᴏʀ: ${details.info.Director || 'N/A'}
> 📝 sᴜʙᴛɪᴛʟᴇ ᴀᴜᴛʜᴏʀ: ${details.info['Subtitle Author'] || 'N/A'}
> 🌐 sᴜʙᴛɪᴛʟᴇ sɪᴛᴇ: ${details.info['Subtitle Site'] || 'N/A'}
> 👁️ ᴠɪᴇᴡs: ${details.views || 'N/A'}

📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴꜱ:
${downloadData}


\`\`\`${wagc}\`\`\``.trim();

          if (imageUrl) {
            await cyberkavi.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
            kavireact('✅');
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
            kavireact('✅');
          }
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-MOVIE-003")) {//🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          kavireact("🎥");
          if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");

          const input = m.text.trim();

          const titleLine = resualt.find(item => item.startsWith(`🎬 ᴛɪᴛʟᴇ:`));
          const title = titleLine?.replace(`🎬 ᴛɪᴛʟᴇ:`, '').trim();
          const searchLine = resualt.find(item => item.startsWith(`🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ:`));
          const search = searchLine?.replace(`🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ:`, '').trim();

          if (!title || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const movieRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!movieRes.data?.data) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = movieRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieDetails = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/sinhalasub/details/?url=${movieData.link}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!movieDetails.data?.data) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const details = movieDetails.data.data;

          const filteredDownloads = details.downloads.filter(d => ['pixeldrain', 'DLServer-01', 'DLServer-02'].includes(d.provider));
          if (!filteredDownloads.length) return replygckavi('🚫 ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴꜱ ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ.');

          const selectedIndex = parseInt(m.text.trim()) - 1;
          if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= filteredDownloads.length) return replygckavi('🚫 ᴛʜᴇ ǫᴜᴀʟɪᴛʏ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const result = filteredDownloads[selectedIndex];
          const url = result.link;

          const dlRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/sinhalasub/download/?url=${encodeURIComponent(url)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`)
          if (!dlRes.data?.data || !dlRes.data) return replygckavi('🚫 ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ.');

          let dlData = dlRes.data.data;
          if (dlData.includes('pixeldrain')) {
            const urlObj = new URL(dlData);
            const paths = urlObj.pathname.split('/').filter(Boolean);
            const fileID = paths.pop();
            dlData = `https://pixeldrain.com/api/file/${fileID}`;
          }
          
          const sendData = `*\`${details.title}\`*

> ⭐ ʀᴀᴛɪɴɢ: ${details.rating || 'N/A'} / IMDb: ${details.imdb || 'N/A'}
> 🗓️ ʀᴇʟᴇᴀsᴇ ʏᴇᴀʀ: ${details.info.Year || 'N/A'}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${details.runtime || 'N/A'}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${details.info.Language?.toUpperCase() || 'N/A'}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${details.info.Country?.toUpperCase() || 'N/A'}
> 👁️ ᴠɪᴇᴡs: ${details.views || 'N/A'}
> 🧩 ǫᴜᴀʟɪᴛʏ: ${result.quality}
> 📝 sᴜʙᴛɪᴛʟᴇ ᴀᴜᴛʜᴏʀ: ${details.info['Subtitle Author'] || 'N/A'}
> 🌐 sᴜʙᴛɪᴛʟᴇ sɪᴛᴇ: ${details.info['Subtitle Site'] || 'N/A'}
> 🎬 ᴅɪʀᴇᴄᴛᴏʀ: ${details.info.Director || 'N/A'}
> 🎭 ɢᴇɴʀᴇs: ${details.genres.join(', ') || 'N/A'}

⏳ Downloading... Please wait
🔖 With Sinhala Subtitle

\`\`\`${wagc}\`\`\``.trim();

          const imageUrl = details.poster || null;
          if (imageUrl) {
            await cyberkavi.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
          }
          
          try {
            const downloadLink = dlData;
            const response = await axios.head(downloadLink, { timeout: 10000 });
            const contentLength = response.headers['content-length'];
            const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';
            const extension = "mkv";
            const mimeType = "video/x-matroska";

            const imgRes = await axios.get(imageUrl, { responseType: "arraybuffer", timeout: 8000 });
            const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000 });

            const imgBuffer = Buffer.from(imgRes.data)
            const fileBuffer = Buffer.from(fileRes.data);

            const documentCaption = `KAVI-X MD MOVIE SENDER BOT\n\n🎬 *TITLE:* ${details.title}\n🧩 *QUALITY:* ${result.quality}\n📦 *SIZE:* ${fileSize}\n🔖 *SINHALA SUBTITLE:* YES\n\n${kavixcaption}`;

            await cyberkavi.sendMessage(m.chat, {
              document: fileBuffer,
              caption: `${documentCaption}\nFileName: 📽️ KAVI-X 📽️ ${details.title}`,
              mimetype: mimeType,
              fileName: `📽️ KAVI-X 📽️ ${details.title}.${extension}`,
              jpegThumbnail: imgBuffer
            }, { quoted: m });

            tmdbmovieupload.delete(sender);
            kavireact("✅");
          } catch (error) {
            tmdbmovieupload.delete(sender);
            replygckavi(kavixerr2);
          }
        } catch (e) {
          tmdbmovieupload.delete(sender);
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-MOVIE-004")) {//🎥 ᴘɪʀᴀᴛᴇʟᴋ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          kavireact("🎥");

          const input = m.text.trim();
          const titleLine = resualt.find(item => item.startsWith(`${input}.`));
          const searchLine = resualt.find(item => item.startsWith(`🎥 Movie Name:`));
          const title = titleLine?.replace(`${input}.`, '').trim();
          const search = searchLine?.replace(`🎥 Movie Name:`, '').trim();

          if (!title || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const movieRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/piratelk/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!movieRes.data?.data) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = movieRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieDetails = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/piratelk/details/?url=${movieData.link}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!movieDetails.data?.data?.data) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const details = movieDetails.data.data.data;

          let downloadData = '*```Download options not available.```*';
          if (details.downloads?.length) {
            const filteredDownloads = details.downloads.filter(d => ['drive.google.com', 'pixeldrain.com'].includes(d.host));
            if (filteredDownloads.length) {
              const lines = filteredDownloads.map((d, i) => `${i + 1}. ${d.host} - ${d.quality} - ${d.size}`);
              downloadData = lines.join('\n');
            }
          }

          const director = details.cast?.find(c => c.character === 'Director')?.name || 'N/A';
          const imageUrl = details.poster || null;

          const sendData = `ID-MOVIE-005

🎬 ᴛɪᴛʟᴇ: ${details.title}
🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ: ${search}

> ⭐ ʀᴀᴛɪɴɢ: ${details.imdbRating || 'N/A'} / TMDb: ${details.tmdbRating || 'N/A'}
> 🗓️ ʀᴇʟᴇᴀsᴇ ʏᴇᴀʀ: ${details.year || details.releaseDate || 'N/A'}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${details.duration || 'N/A'}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${details.downloads?.[0]?.language?.toUpperCase() || 'N/A'}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${details.country?.toUpperCase() || 'N/A'}
> 🎭 ɢᴇɴʀᴇs: ${details.genres?.join(', ') || 'N/A'}
> 🎬 ᴅɪʀᴇᴄᴛᴏʀ: ${director}
> 👁️ ᴠɪᴇᴡs: ${details.views || 'N/A'}

📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴꜱ:
${downloadData}

\`\`\`${wagc}\`\`\``.trim();

          if (imageUrl) {
            await cyberkavi.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
            kavireact('✅');
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
            kavireact('✅');
          }
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-MOVIE-005")) {//🎥 ᴘɪʀᴀᴛᴇʟᴋ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");
          kavireact("🎥");

          const input = m.text.trim();
          const searchLine = resualt.find(item => item.startsWith(`🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ:`));
          const titleLine = resualt.find(item => item.startsWith(`🎬 ᴛɪᴛʟᴇ:`));
          const search = searchLine?.replace(`🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ:`, '').trim();
          const title = titleLine?.replace(`🎬 ᴛɪᴛʟᴇ:`, '').trim();

          const searchRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/piratelk/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!searchRes.data?.data) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = searchRes.data.data.find(mov => mov.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const detailRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/piratelk/details/?url=${encodeURIComponent(movieData.link)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          const details = detailRes.data?.data?.data;
          if (!details) return replygckavi('🚫 ᴅᴇᴛᴀɪʟꜱ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const filteredDownloads = details.downloads.filter(d => ['drive.google.com', 'pixeldrain.com'].includes(d.host));
          if (!filteredDownloads.length) return replygckavi('🚫 ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴꜱ ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ.');

          const selectedIndex = parseInt(input) - 1;
          if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= filteredDownloads.length) return replygckavi('🚫 ᴛʜᴇ ǫᴜᴀʟɪᴛʏ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const selectedDownload = filteredDownloads[selectedIndex];

          const dlRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/piratelk/download/?url=${encodeURIComponent(selectedDownload.link)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          let dlData = dlRes.data?.data?.link;
          if (!dlData) return replygckavi('🚫 ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ.');

          if (dlData.includes("pixeldrain")) {
            const urlObj = new URL(dlData);
            const fileID = urlObj.pathname.split("/").filter(Boolean).pop();
            dlData = `https://pixeldrain.com/api/file/${fileID}`;
          } else if (dlData.includes("drive.google.com")) {
            try {
              const fileId = dlData.split('/d/')[1]?.split('/')[0];
              if (!fileId) return replygckavi("🚫 ɢᴏᴏɢʟᴇ ᴅʀɪᴠᴇ ʟɪɴᴋ ɪs ɪɴᴠᴀʟɪᴅ.");

              const gdRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/googledrive/file/?id=${fileId}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);

              if (!gdRes.data?.data?.downloadUrl) 
              return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ.");

              dlData = gdRes.data.data.downloadUrl;
            } catch (err) {
              return replygckavi("🚫 ᴇʀʀᴏʀ ᴘʀᴏᴄᴇssɪɴɢ ɢᴏᴏɢʟᴇ ᴅʀɪᴠᴇ ʟɪɴᴋ.");
            }
          }

          const director = details.cast?.find(c => c.character === 'Director')?.name || 'N/A';
          const imageUrl = details.poster || null;

          const sendData = `*\`${details.title}\`*

> ⭐ ʀᴀᴛɪɴɢ: ${details.imdbRating || 'N/A'} / TMDb: ${details.tmdbRating || 'N/A'}
> 🗓️ ʀᴇʟᴇᴀsᴇ ʏᴇᴀʀ: ${details.releaseDate || 'N/A'}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${details.duration || 'N/A'}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${details.country || 'N/A'}
> 🎭 ɢᴇɴʀᴇꜱ: ${details.genres?.join(', ') || 'N/A'}
> 🎬 ᴅɪʀᴇᴄᴛᴏʀ: ${director}
> 🧩 ǫᴜᴀʟɪᴛʏ: ${selectedDownload.quality}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${selectedDownload.language || 'N/A'}
> 🌐 ᴅᴏᴡɴʟᴏᴀᴅ ꜱɪᴛᴇ: ${selectedDownload.host}

⏳ Downloading... Please wait
🔖 With Sinhala Subtitle

\`\`\`${wagc}\`\`\``.trim();

          if (imageUrl) {
            const imgBuffer = await axios.get(imageUrl, { responseType: "arraybuffer" });
            await cyberkavi.sendMessage(m.chat, {
              image: imgBuffer.data,
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
          }

          try {
            const downloadLink = dlData;
            const response = await axios.head(downloadLink, { timeout: 10000 });
            const contentLength = response.headers['content-length'];
            const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';
            const extension = "mkv";
            const mimeType = "video/x-matroska";

            const imgRes = await axios.get(imageUrl, { responseType: "arraybuffer", timeout: 8000 });
            const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000 });

            const imgBuffer = Buffer.from(imgRes.data)
            const fileBuffer = Buffer.from(fileRes.data);

            const documentCaption = `KAVI-X MD MOVIE SENDER BOT\n\n🎬 *TITLE:* ${details.title}\n🧩 *QUALITY:* ${selectedDownload.quality}\n📦 *SIZE:* ${fileSize}\n🔖 *SINHALA SUBTITLE:* YES\n\n${kavixcaption}`;

            await cyberkavi.sendMessage(m.chat, {
              document: fileBuffer,
              caption: `${documentCaption}\nFileName: 📽️ KAVI-X 📽️ ${details.title}`,
              mimetype: mimeType,
              fileName: `📽️ KAVI-X 📽️ ${details.title}.${extension}`,
              jpegThumbnail: imgBuffer
            }, { quoted: m });

            tmdbmovieupload.delete(sender);
            kavireact("✅");
          } catch (error) {
            tmdbmovieupload.delete(sender);
            replygckavi(kavixerr2);
          }
        } catch (e) {
          tmdbmovieupload.delete(sender);
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-MOVIE-006")) {//🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥");

          const input = m.text.trim();

          const titleLine = resualt.find(item => item.startsWith(`${input}.`));
          const searchLine = resualt.find(item => item.startsWith(`🎥 Movie Name:`));
          const title = titleLine?.replace(`${input}.`, '').trim();
          const search = searchLine?.replace(`🎥 Movie Name:`, '').trim();
          
          if (!title || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const searchRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          const searchData = searchRes.data?.data;
          if (!searchData || !searchData.length) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = searchData.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const detailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/cinesubz/details/?url=${encodeURIComponent(movieData.link)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          const details = detailsRes.data?.data;
          if (!details) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          console.log(details.downloads);

          let downloadData = '*```Download options not available.```*';
          if (details.downloads?.length) {
            const filteredDownloads = details.downloads.filter(d => d.type !== "Telegram Download Links");
            if (filteredDownloads.length) {
              const lines = filteredDownloads.map((d, i) => `${i + 1}. ${d.meta}`);
              downloadData = lines.join('\n');
            }
          }

          const imageUrl = details.poster || movieData.img || null;

          const sendData = `ID-MOVIE-007

🎬 ᴛɪᴛʟᴇ: ${details.title}
🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ: ${search}

> ⭐ ʀᴀᴛɪɴɢ: ${details.imdbRating || 'N/A'}
> 🗓️ ʀᴇʟᴇᴀsᴇ ʏᴇᴀʀ: ${details.year || 'N/A'}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${details.duration || 'N/A'}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${details.country || 'N/A'}
> 🎭 ɢᴇɴʀᴇꜱ: ${details.genres?.join(', ') || 'N/A'}
> 🎬 ᴅɪʀᴇᴄᴛᴏʀ: ${details.directors?.join(', ') || 'N/A'}

📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴꜱ:
${downloadData}


\`\`\`${wagc}\`\`\``.trim();

          if (imageUrl) {
            await cyberkavi.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
            kavireact('✅');
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
            kavireact('✅');
          }
        } catch (error) {
          console.log(error);
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-MOVIE-007")) {//🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");

          kavireact("🎥");

          const input = m.text.trim();

          const titleLine = resualt.find(item => item.startsWith(`🎬 ᴛɪᴛʟᴇ:`));
          const searchLine = resualt.find(item => item.startsWith(`🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ:`));
          const dlLine = resualt.find(item => item.startsWith(`${input}.`));
          const title = titleLine?.replace(`🎬 ᴛɪᴛʟᴇ:`, '').trim();
          const search = searchLine?.replace(`🎥 ᴍᴏᴠɪᴇ ɴᴀᴍᴇ:`, '').trim();
          const dl = dlLine?.replace(`${input}.`, '').trim();
          
          if (!title || !search || !dl) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const searchRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          const searchData = searchRes.data?.data;
          if (!searchData || !searchData.length) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = searchData.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const detailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/cinesubz/details/?url=${encodeURIComponent(movieData.link)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          const details = detailsRes.data?.data;
          if (!details) return replygckavi('🚫 ᴍᴏᴠɪᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const selectedDownload = details.downloads?.find(d => d.meta.includes(dl));
          if (!selectedDownload) return replygckavi('🚫 ꜱᴇʟᴇᴄᴛᴇᴅ ǫᴜᴀʟɪᴛʏ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const responseDLServer_1 = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/cinesubz/download/?url=${encodeURIComponent(selectedDownload.link)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
          if (!responseDLServer_1.data?.data) return replygckavi('🚫 ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const responseDLServer_2 = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/cinesubz/download/?url=${encodeURIComponent(responseDLServer_1.data?.data)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!responseDLServer_2.data?.data?.link) return replygckavi('🚫 ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ ɴᴏᴛ ꜰᴏᴜɴᴅ sᴇʀᴠᴇʀ ᴇxᴛ.');

          const sendData = `*\`${details.title}\`*

> ⭐ ʀᴀᴛɪɴɢ: ${details.imdbRating || 'N/A'}
> 🗓️ ʀᴇʟᴇᴀsᴇ ʏᴇᴀʀ: ${details.year || 'N/A'}
> ⏱️ ʀᴜɴᴛɪᴍᴇ: ${details.duration || 'N/A'}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${details.country.toUpperCase() || 'N/A'}
> 🎬 ᴅɪʀᴇᴄᴛᴏʀ: ${details.directors?.join(', ') || 'N/A'}
> 🎭 ɢᴇɴʀᴇs: ${details.genres?.join(', ') || 'N/A'}

⏳ Downloading... Please wait
🔖 With Sinhala Subtitle

\`\`\`${wagc}\`\`\``.trim();

          const imageUrl = details.poster || movieData.img;
          if (imageUrl) {
            await cyberkavi.sendMessage(m.chat, {
              image: { url: imageUrl },
              caption: sendData,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: '120363417324607329@newsletter',
                  newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                  serverMessageId: 1
                }
              }
            }, { quoted: m });
          } else {
            await cyberkavi.sendMessage(m.chat, { text: sendData }, { quoted: m });
          }

          try {
            tmdbmovieupload.add(sender);
            const downloadLink = responseDLServer_2.data.data.link;
            if (downloadLink.includes("drive.google.com") || downloadLink.includes("drive.usercontent.google.com")) {
              try {
                const fileId = extractGoogleDriveId(downloadLink);

                if (!fileId) {
                  return replygckavi("🚫 ɪɴᴠᴀʟɪᴅ ɢᴏᴏɢʟᴇ ᴅʀɪᴠᴇ ʟɪɴᴋ.");
                }

                const gdRes = await axios.get(
                  `https://kavi-public-apis.vercel.app/api/v2/public/download/googledrive/file/?id=${fileId}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`
                );

                if (!gdRes.data?.data?.downloadUrl) {
                  return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ғᴀɪʟᴇᴅ.");
                }

                downloadLink = gdRes.data.data.downloadUrl;

              } catch (err) {
                return replygckavi("🚫 ᴇʀʀᴏʀ ᴘʀᴏᴄᴇssɪɴɢ ɢᴏᴏɢʟᴇ ᴅʀɪᴠᴇ ʟɪɴᴋ.");
              }
            }
            const response = await axios.head(downloadLink, { timeout: 10000 });
            const contentLength = response.headers['content-length'];
            const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';
            const extension = "mkv";
            const mimeType = "video/x-matroska";

            const imgRes = await axios.get(imageUrl, { responseType: "arraybuffer", timeout: 8000 });
            const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000 });

            const imgBuffer = Buffer.from(imgRes.data)
            const fileBuffer = Buffer.from(fileRes.data);

            const documentCaption = `KAVI-X MD MOVIE SENDER BOT\n\n🎬 *TITLE:* ${details.title}\n🧩 *META:* ${selectedDownload.meta}\n📦 *SIZE:* ${fileSize}♻️ *ATTEMPT:* ${responseDLServer_2.data?.data?.attempt || 'Null'}\n🔖 *SINHALA SUBTITLE:* YES\n\n${kavixcaption}`;

            await cyberkavi.sendMessage(m.chat, {
              document: fileBuffer,
              caption: `${documentCaption}\nFileName: 📽️ KAVI-X 📽️ ${details.title}`,
              mimetype: mimeType,
              fileName: `📽️ KAVI-X 📽️ ${details.title}.${extension}`,
              jpegThumbnail: imgBuffer
            }, { quoted: m });

            tmdbmovieupload.delete(sender);
            kavireact("✅");
          } catch (error) {
            tmdbmovieupload.delete(sender);
            replygckavi(kavixerr2);
          }
        } catch (e) {
          tmdbmovieupload.delete(sender);
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-000")) {//🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          const titleLine = resualt.find(item => item.startsWith(`${input}.`));
          const title = titleLine?.replace(`${input}.`, '').trim();
          const [titleFull, id] = title.split('|||').map(v => v.trim());
          if (!titleFull, !id) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvDetails = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/details/?id=${id}`);
          const tv = tvDetails.data.data;
          if (!tv) return replygckavi("🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.");

          let seasonData = '';
          tv.seasons.forEach(s => {
            if (s.season_number !== 0) {
              seasonData += `${s.season_number}. ${s.name} (${s.episode_count} episodes)\n`;
            }
          });

          const seasonText = `ID-TV-001

📺 ᴛɪᴛʟᴇ: ${tv.name}
🎞️ ᴏʀɪɢɪɴᴀʟ ᴛɪᴛʟᴇ: ${tv.original_name}

> ⭐ ɪᴅ: ${tv.id}
> ⭐ ɪᴍᴅʙ ʀᴀᴛɪɴɢ: ${tv.vote_average} (${tv.vote_count} votes)
> 🗓️ ꜰɪʀꜱᴛ ᴀɪʀ: ${tv.first_air_date}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${tv.original_language.toUpperCase()}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.origin_country.join(', ')}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.map(g => g.name).join(', ')}
> 📊 ᴘᴏᴘᴜʟᴀʀɪᴛʏ: ${tv.popularity}
> 🎬 ꜱᴛᴀᴛᴜꜱ: ${tv.status}
> 🏷️ ᴛᴀɢʟɪɴᴇ: ${tv.tagline || 'N/A'}

📂 ᴄʜᴏᴏsᴇ ᴀ ꜱᴇᴀsᴏɴ:
${seasonData}


\`\`\`${wagc}\`\`\``.trim();

          const imageUrl = tv.poster_path ? `https://image.tmdb.org/t/p/w500${tv.poster_path}` : `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`;

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: seasonText,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          },
          { quoted: m });
          kavireact("✅");
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-001")) {//🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          
          kavireact("📂");

          const input = m.text.trim();
          const seasonNum = parseInt(input);
          const tvId = resualt.find(x => x.includes("⭐ ɪᴅ:"))?.split(":")[1].trim();
          if (!seasonNum || !tvId) return replygckavi("🚫 sᴇʟᴇᴄᴛ ᴀ ᴠᴀʟɪᴅ sᴇᴀsᴏɴ.");

          const tvRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/details/?id=${tvId}`);
          const seasonRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/season/?id=${tvId}&s=${seasonNum}`);
          const tv = tvRes.data.data;
          const season = seasonRes.data.data;
          if (!tv || !season) return replygckavi("🚫 sᴇʟᴇᴄᴛ ᴀ ᴠᴀʟɪᴅ sᴇᴀsᴏɴ.");

          let epText = '';
          season.episodes.forEach(e => {
            epText += `${e.episode_number}. ${e.name} (${e.runtime}m)\n`;
          });

          const caption = `ID-TV-002

📺 ᴛɪᴛʟᴇ: ${tv.name}
🎞️ ᴏʀɪɢɪɴᴀʟ: ${tv.original_name}

> ⭐ ɪᴅ: ${tv.id}
> ⭐ ɪᴍᴅʙ ʀᴀᴛɪɴɢ: ${tv.vote_average} (${tv.vote_count} votes)
> 🗓️ ꜰɪʀꜱᴛ ᴀɪʀ: ${tv.first_air_date}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${tv.original_language.toUpperCase()}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.origin_country.join(', ')}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.map(g => g.name).join(', ')}
> 📊 ᴘᴏᴘᴜʟᴀʀɪᴛʏ: ${tv.popularity}
> 🎬 ꜱᴛᴀᴛᴜꜱ: ${tv.status}
> 🏷️ ᴛᴀɢʟɪɴᴇ: ${tv.tagline || 'N/A'}
> ⭐ sᴇᴀsᴏɴ ɪᴅ: ${season.season_number || 'N/A'}

📂 ᴄʜᴏᴏsᴇ ᴀɴ ᴇᴘɪsᴏᴅᴇ:
0. all
${epText}


\`\`\`${wagc}\`\`\``.trim();

          const caption_2 = `*\`${tv.name}\`*

> ⭐ ɪᴅ: ${tv.id}
> ⭐ ɪᴍᴅʙ ʀᴀᴛɪɴɢ: ${tv.vote_average} (${tv.vote_count} votes)
> 🗓️ ꜰɪʀꜱᴛ ᴀɪʀ: ${tv.first_air_date}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${tv.original_language.toUpperCase()}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.origin_country.join(', ')}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.map(g => g.name).join(', ')}
> 📊 ᴘᴏᴘᴜʟᴀʀɪᴛʏ: ${tv.popularity}
> 🎬 ꜱᴛᴀᴛᴜꜱ: ${tv.status}
> 🏷️ ᴛᴀɢʟɪɴᴇ: ${tv.tagline || 'N/A'}
> ⭐ sᴇᴀsᴏɴ ɪᴅ: ${season.season_number || 'N/A'}

⏳ Downloading... Please wait
🔖 Without Sinhala Subtitle

\`\`\`${wagc}\`\`\``.trim();

          const imageUrl = season.poster || `https://image.tmdb.org/t/p/w500${tv.poster_path}`;

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption_2,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });
          kavireact("✅");
        } catch (e) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-002")) {//🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("📥");

          const [episodeNumStr] = m.text.trim().split(" ");
          const isAll = episodeNumStr.toLowerCase() === "all" || episodeNumStr === "0";
          const episodeNum = isAll ? "all" : parseInt(episodeNumStr);
          const tvId = resualt.find(x => x.includes("⭐ ɪᴅ:"))?.split(":")[1].trim();
          const seasonNum = resualt.find(x => x.includes("⭐ sᴇᴀsᴏɴ ɪᴅ:"))?.split(":")[1].trim();
          if (!tvId || !seasonNum || (!isAll && !episodeNum)) return replygckavi("🚫 ᴘʟᴇᴀꜱᴇ ᴄʜᴏᴏsᴇ ᴀ ᴠᴀʟɪᴅ ᴇᴘɪꜱᴏᴅᴇ.");

          const [tvRes, seasonRes, downloadRes] = await Promise.all([
            axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/details/?id=${tvId}`),
            axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/season/?id=${tvId}&s=${seasonNum}`),
            axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/download/?id=${tvId}&s=${seasonNum}&e=${episodeNum}`)
          ]);

          const tv = tvRes.data.data;
          const season = seasonRes.data.data;
          const downloads = downloadRes.data.data;

          const episodesToSend = isAll ? season.episodes : [season.episodes.find(e => e.episode_number === episodeNum)];
          if (!episodesToSend.length) return replygckavi("🚫 Episode(s) not found.");
          const jids = await listForwardJid();

          if (episodeNum === "all") {

            if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");
            tmdbmovieupload.add(sender);

            replygckavi("📥 Downloading all episodes... Please wait");
            for (const jid of jids) {
              try {
                await cyberkavi.sendMessage(jid, { text: `📺 Uploading TV Series: *${tv.name}* - Season ${seasonNum}` }, { quoted: cyberkavikey });
              } catch {}
            }

            let stopForwarding = false;

            for (const ep of episodesToSend) {
              try {
                const downloadRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/download/?id=${tvId}&s=${seasonNum}&e=${ep.episode_number}`);

                const downloads = downloadRes.data.data;
                if (!downloads || downloads.length === 0) continue;

                const preferredOrder = ["1080p", "720p", "480p", "360p"];

                let selected = null;

                for (const q of preferredOrder) {
                  selected = downloads.find(d => d.quality === q);
                  if (selected) break;
                }

                if (!selected) selected = downloads[0];

                const headers = {
                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                  "Referer": "https://dl.vidsrc.vip/"
                };

                const epImg = ep?.still || "https://files.catbox.moe/wz7svr.png";
                const downloadLink = await buildDownloadLink(selected.url);
                
                const response = await axios.head(downloadLink, { timeout: 10000, headers });
                const contentLength = response.headers['content-length'];
                const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';

                const imgRes = await axios.get(epImg, { responseType: "arraybuffer", timeout: 8000 });
                const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", headers, timeout: 120000 });

                const imgBuffer = Buffer.from(imgRes.data);
                const fileBuffer = Buffer.from(fileRes.data);

                const extension = "mkv";
                const mimeType = "video/x-matroska";

                const fileName = `KAVI-X_${ep.name}-(${seasonNum}-${ep.episode_number})_${selected.quality}.${extension}`;
                const caption = `KAVI-X MD SERIES SENDER BOT\n\n🎬 TITLE: ${ep.name}\n🧩 QUALITY: ${selected.quality}\n📦 *SIZE:* ${fileSize}\n🔖 SINHALA SUBTITLE: NO\n\n${kavixcaption}`;

                const sentMessage = await cyberkavi.sendMessage(m.chat, {
                  document: fileBuffer,
                  mimetype: mimeType,
                  fileName: fileName,
                  caption: caption,
                  jpegThumbnail: imgBuffer
                }, { quoted: m });

                if (!stopForwarding) {
                  for (const jid of jids) {
                    try {
                      await cyberkavi.sendMessage(jid, { forward: sentMessage });
                    } catch {
                      stopForwarding = true;
                      break;
                    }
                  }
                }
              } catch (e) {
                stopForwarding = true;
                continue;
              }
            }

            tmdbmovieupload.delete(sender);
            return replygckavi('✅ All episodes forwarded to saved JIDs.');
          }

          if (!tv || !season || !downloads || downloads.length === 0) return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋs ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ.");

          const episode = season.episodes.find(e => e.episode_number === episodeNum);
          if (!episode) return replygckavi("🚫 Episode not found.");

          let downloadText = '';
          for (let i = 0; i < downloads.length; i++) {
            const downloadLink = await buildDownloadLink(downloads[i].url);
            const size = downloads[i].url ? await getFileSize2(downloadLink) : "Unknown";
            downloadText += `${i + 1}. ${downloads[i].quality} (${size})\n`;
          }

          const caption = `ID-TV-003

📺 ᴛɪᴛʟᴇ: ${tv.name}
🎞️ ᴏʀɪɢɪɴᴀʟ: ${tv.original_name}

> ⭐ ɪᴅ: ${tv.id}
> ⭐ ɪᴍᴅʙ ʀᴀᴛɪɴɢ: ${tv.vote_average} (${tv.vote_count} votes)
> 🗓️ ꜰɪʀꜱᴛ ᴀɪʀ: ${tv.first_air_date}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: ${tv.original_language.toUpperCase()}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.origin_country.join(', ')}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.map(g => g.name).join(', ')}
> 📊 ᴘᴏᴘᴜʟᴀʀɪᴛʏ: ${tv.popularity}
> 🎬 ꜱᴛᴀᴛᴜꜱ: ${tv.status}
> 🏷️ ᴛᴀɢʟɪɴᴇ: ${tv.tagline || 'N/A'}
> ⭐ sᴇᴀsᴏɴ ɪᴅ: ${season.season_number || 'N/A'}
> ⭐ ᴇᴘɪꜱᴏᴅᴇ: ${episodeNum || 'N/A'}

🔗 Download option:
${downloadText}


\`\`\`${wagc}\`\`\``;

          const imageUrl = season.poster || `https://image.tmdb.org/t/p/w500${tv.poster_path}`;
          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });
          kavireact("✅");
        } catch (err) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-003")) {//🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");

          kavireact("📥");

          const [qualityChoiceStr] = m.text.trim().split(" ");
          const qualityChoice = parseInt(qualityChoiceStr);
          if (!qualityChoice) return replygckavi("🚫 ᴘʟᴇᴀꜱᴇ ᴄʜᴏᴏsᴇ ᴀ ǫᴜᴀʟɪᴛʏ.");

          const tvId = resualt.find(x => x.includes("⭐ ɪᴅ:"))?.split(":")[1].trim();
          const seasonNum = resualt.find(x => x.includes("⭐ sᴇᴀsᴏɴ ɪᴅ:"))?.split(":")[1].trim();
          const episodeNum = resualt.find(x => x.includes("⭐ ᴇᴘɪꜱᴏᴅᴇ:"))?.split(":")[1].trim();
          if (!tvId || !seasonNum || !episodeNum) return replygckavi("🚫 ᴄᴏᴜʟᴅ ɴᴏᴛ ʀᴇᴛʀɪᴇᴠᴇ ᴇᴘɪsᴏᴅᴇ info.");

          const downloadRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/download/?id=${tvId}&s=${seasonNum}&e=${episodeNum}`);
          const seasonRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/season/?id=${tvId}&s=${seasonNum}`);
          const downloads = downloadRes.data.data;
          const season = seasonRes.data.data.episodes;
          if (!downloads || downloads.length === 0) return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋs ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ.");
          if (qualityChoice < 1 || qualityChoice > downloads.length) return replygckavi("🚫 ᴘʟᴇᴀꜱᴇ ᴄʜᴏᴏsᴇ ᴀ ᴠᴀʟɪᴅ ǫᴜᴀʟɪᴛʏ.");

          const selected = downloads[qualityChoice - 1];
          const selectedEp = season[episodeNum - 1];
          if (!selected || !selectedEp) return replygckavi("🚫 sᴇʟᴇᴄᴛᴇᴅ ɴᴏᴛ ʀᴇᴛʀɪᴇᴠᴇ ɪɴᴛᴇʀᴇsᴛ ɪɴꜰᴏ.");

          try {
            tmdbmovieupload.add(sender);

            const headers = {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
              "Referer": "https://dl.vidsrc.vip/"
            };

            const thumbnail = selectedEp?.still || "https://files.catbox.moe/wz7svr.png";
            const downloadLink = await buildDownloadLink(selected.url);

            const response = await axios.head(downloadLink, { timeout: 10000, headers });
            const contentLength = response.headers['content-length'];
            const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';

            const imgRes = await axios.get(thumbnail, { responseType: "arraybuffer", timeout: 8000 });
            const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", headers, timeout: 120000 });

            const imgBuffer = Buffer.from(imgRes.data)
            const fileBuffer = Buffer.from(fileRes.data);

            const extension = "mkv";
            const mimeType = "video/x-matroska";

            const fileName = `KAVI-X_${selectedEp?.name || "Episode"}_(${seasonNum}-${episodeNum})_${selected?.quality || "HD"}.${extension}`;
            const documentCaption = `KAVI-X MD SERIES SENDER BOT\n\n🎬 TITLE: ${selectedEp?.name || "Unknown"}\n🧩 QUALITY: ${selected?.quality || "Unknown"}\n📦 *SIZE:* ${fileSize}\n🔖 SINHALA SUBTITLE: NO\n\n${kavixcaption}\nFileName: ${fileName}`;

            await cyberkavi.sendMessage(m.chat, {
              document: fileBuffer,
              mimetype: mimeType,
              fileName: fileName,
              caption: documentCaption,
              jpegThumbnail: imgBuffer
            }, { quoted: m });

            tmdbmovieupload.delete(sender);
            kavireact("✅");
          } catch (error) {
            tmdbmovieupload.delete(sender);
            replygckavi(kavixerr2);
          }
        } catch (err) {
          tmdbmovieupload.delete(sender);
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-004")) {//🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          const titleLine = resualt.find(item => item.startsWith(`${input}.`));
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const title = titleLine?.replace(`${input}.`, '').trim();
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          
          if (!title || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/details/?url=${encodeURIComponent(movieData.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          let seasonData = '';
          Object.keys(tv.seasons).forEach(seasonName => {
            const episodes = tv.seasons[seasonName].length;
            const seasonNumber = seasonName.match(/\d+/)?.[0] || seasonName;
            seasonData += `${seasonNumber}. ${seasonName} (${episodes} episodes)\n`;
          });

          const seasonText = `ID-TV-005

📺 TV Series Name: ${search}          
📺 ᴛɪᴛʟᴇ: ${tv.title}

> ⭐ ʀᴀᴛɪɴɢ: ${tv.rating} (${tv.votes})
> 🗓️ ʏᴇᴀʀ: ${tv.year}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: Sinhala
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.country.join(', ')}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.join(', ')}
> 🎬 ᴄʀᴇᴀᴛᴏʀs: ${tv.creators.join(', ')}
> ⭐ ᴘᴏᴘᴜʟᴀʀ ᴠɪᴇᴡs: ${tv.views}

📂 ᴄʜᴏᴏsᴇ ᴀ ꜱᴇᴀsᴏɴ:
${seasonData}


\`\`\`${wagc}\`\`\``.trim();

          await cyberkavi.sendMessage(m.chat, {
            image: { url: tv.poster },
            caption: seasonText,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          },
          { quoted: m });
          kavireact("✅");
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-005")) {//🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          const season = parseInt(input);
          
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const titleLine = resualt.find(item => item.startsWith(`📺 ᴛɪᴛʟᴇ:`));
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          const title = titleLine?.replace(`📺 ᴛɪᴛʟᴇ:`, '').trim();
          
          if (!season || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/details/?url=${encodeURIComponent(movieData.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const seasonKey = `Season ${season}`;
          const episodes = tv.seasons?.[seasonKey];
          const imageUrl = tv.poster;

          if (!episodes) return replygckavi("🚫 sᴇʟᴇᴄᴛ ᴀ ᴠᴀʟɪᴅ sᴇᴀsᴏɴ.");

          let epText = "";
          episodes.forEach(ep => {
            epText += `${ep.episode}. ${ep.title}\n`;
          });

          const caption_1 = `ID-TV-006

📺 TV Series Name: ${search}          
📺 ᴛɪᴛʟᴇ: ${tv.title}

> 🗓️ ʏᴇᴀʀ: ${tv.year}
> ⭐ ɪᴍᴅʙ: ${tv.rating} (${tv.votes})
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.join(", ")}
> 🎬 ɴᴇᴛᴡᴏʀᴋ: ${tv.networks.join(", ")}
> 📂 sᴇᴀsᴏɴ: ${seasonKey}

📥 ᴄʜᴏᴏsᴇ ᴀɴ ᴇᴘɪsᴏᴅᴇ:
0. all
${epText}

\`\`\`${wagc}\`\`\``.trim();

          const caption_2 = `*\`${tv.title}\`*

> 🗓️ ʏᴇᴀʀ: ${tv.year}
> ⭐ ɪᴍᴅʙ: ${tv.rating} (${tv.votes})
> 👁️ ᴠɪᴇᴡs: ${tv.views}
> 📂 sᴇᴀsᴏɴ: ${seasonKey}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.join(", ")} 
> 🎬 ɴᴇᴛᴡᴏʀᴋ: ${tv.networks.join(", ")}
> 🎞️ sᴛᴜᴅɪᴏs: ${tv.studios.join(", ")}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.country.join(", ")}
> 🎥 ᴄʀᴇᴀᴛᴏʀs: ${tv.creators.join(", ")}
> ⭐ sᴛᴀʀs: ${tv.stars.slice(0, 5).join(", ")}${tv.stars.length > 5 ? "..." : ""}

⏳ Downloading... Please wait
🔖 With Sinhala Subtitle

\`\`\`${wagc}\`\`\``.trim();

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption_2,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 9999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption_1,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 9999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });

          kavireact("✅");
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-006")) {//🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          const episode = parseInt(input);
          
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const titleLine = resualt.find(item => item.startsWith(`📺 ᴛɪᴛʟᴇ:`));
          const seasonLine = resualt.find(item => item.startsWith(`> 📂 sᴇᴀsᴏɴ:`));
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          const title = titleLine?.replace(`📺 ᴛɪᴛʟᴇ:`, '').trim();
          const season = seasonLine?.replace(`> 📂 sᴇᴀsᴏɴ:`, '').trim();

          const [episodeNumStr] = m.text.trim().split(" ");
          const isAll = episodeNumStr.toLowerCase() === "all" || episodeNumStr === "0";
          const episodeNum = isAll ? "all" : parseInt(episodeNumStr);
          
          if (!season || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/details/?url=${encodeURIComponent(movieData.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const episodes = tv.seasons?.[season];
          const episodeData = episodes?.[episode - 1];
          const jids = await listForwardJid();

          try {
            if (episodeNum === "all") {

              if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");
              tmdbmovieupload.add(sender);

              replygckavi("📥 ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴀʟʟ ᴇᴘɪsᴏᴅᴇs... ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ.");
              for (const jid of jids) {
                try {
                  await cyberkavi.sendMessage(jid, { text: `📺 ᴜᴘʟᴏᴀᴅɪɴɢ ᴛᴠ sᴇʀɪᴇs: *${tv.name}* - Season ${season}` }, { quoted: cyberkavikey });
                } catch {}
              }

              let stopForwarding = false;

              for (const ep of episodes) {
                try {
                  const downloadRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/episode/?url=${encodeURIComponent(ep.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);

                  const epData = downloadRes.data?.data;
                  if (!epData || !epData.servers) {
                    replygckavi(`🚫 ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴀᴛᴀ ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ - ${epData?.episodeTitle || "ᴜɴᴋɴᴏᴡɴ ᴇᴘɪsᴏᴅᴇ."}`);
                    stopForwarding = true;
                    continue;
                  }

                  const allDownloads = [
                    ...(epData.servers["DLServer-01"] || []),
                    ...(epData.servers["DLServer-02"] || [])
                  ];

                  const preferredOrder = ["720p", "1080p", "480p", "360p"];

                  let selected = null;

                  for (const quality of preferredOrder) {
                    selected = allDownloads.find(d => normalizeQuality(d.quality) === quality);
                    if (selected) break;
                  }

                  if (!selected) selected = allDownloads[0];

                  const dl = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/download/?url=${encodeURIComponent(selected.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);

                  const epImg = epData?.images[0] || "https://files.catbox.moe/wz7svr.png";
                  const downloadLink = dl.data?.data;
                  if (!downloadLink) {
                    replygckavi(`🚫 ᴅɪʀᴇᴄᴛ ᴅᴏᴡɴʟᴏᴀᴅ ʟɪɴᴋ ɴᴏᴛ ᴀᴠᴀɪʟᴀʙʟᴇ - ${epData?.episodeTitle || "ᴜɴᴋɴᴏᴡɴ ᴇᴘɪsᴏᴅᴇ."}`);
                    stopForwarding = true;
                    continue;
                  }
                  
                  const response = await axios.head(downloadLink, { timeout: 10000 });
                  const contentLength = response.headers['content-length'];
                  const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';

                  const imgRes = await axios.get(epImg, { responseType: "arraybuffer", timeout: 8000 });
                  const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000 });

                  const imgBuffer = Buffer.from(imgRes.data);
                  const fileBuffer = Buffer.from(fileRes.data);

                  const extension = "mkv";
                  const mimeType = "video/x-matroska";

                  const fileName = `KAVI-X_${epData.episodeTitle}-(${season}-${ep.episode})_${selected.quality}.${extension}`;
                  const caption = `KAVI-X MD SERIES SENDER BOT\n\n🎬 TITLE: ${epData.episodeTitle}\n🧩 QUALITY: ${selected.quality}\n📦 SIZE: ${fileSize}\n🔖 SINHALA SUBTITLE: YES\n\n${kavixcaption}`;

                  const sentMessage = await cyberkavi.sendMessage(m.chat, {
                    document: fileBuffer,
                    mimetype: mimeType,
                    fileName: fileName,
                    caption: caption,
                    jpegThumbnail: imgBuffer
                  }, { quoted: m });

                  if (!stopForwarding) {
                    for (const jid of jids) {
                      try {
                        await cyberkavi.sendMessage(jid, { forward: sentMessage });
                      } catch (e) {
                        replygckavi(`🚫 ғᴏʀᴡᴀʀᴅɪɴɢ ғᴀɪʟᴇᴅ - ${epData?.episodeTitle || "ᴜɴᴋɴᴏᴡɴ ᴇᴘɪsᴏᴅᴇ."}`);
                        stopForwarding = true;
                        break;
                      }
                    }
                  }
                } catch (e) {
                  replygckavi(`🚫 ᴇʀʀᴏʀ ɪɴ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴇᴘɪsᴏᴅᴇ - ${epData?.episodeTitle || "ᴜɴᴋɴᴏᴡɴ ᴇᴘɪsᴏᴅᴇ."}`);
                  stopForwarding = true;
                  continue;
                }
              }

              tmdbmovieupload.delete(sender);
              return replygckavi('✅ ᴀʟʟ ᴇᴘɪsᴏᴅᴇs ғᴏʀᴡᴀʀᴅᴇᴅ ᴛᴏ sᴀᴠᴇᴅ ᴊɪᴅs.');
            }
          } catch (error) {
            tmdbmovieupload.delete(sender);
            return replygckavi(kavixerr2);
          }

          if (!episodeData) return replygckavi("🚫 ᴇᴘɪsᴏᴅᴇ ɴᴏᴛ ғᴏᴜɴᴅ.");

          const downloadResEp = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/episode/?url=${encodeURIComponent(episodeData.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);

          const epData = downloadResEp.data?.data;
          if (!epData || !epData.servers) return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ɴᴏᴛ ғᴏᴜɴᴅ.");

          const downloads = [];

          if (epData.servers["DLServer-01"]) {
            for (const d of epData.servers["DLServer-01"]) {
              downloads.push({ ...d, server: "DLServer-01" });
            }
          }

          if (epData.servers["DLServer-02"]) {
            for (const d of epData.servers["DLServer-02"]) {
              downloads.push({ ...d, server: "DLServer-02" });
            }
          }

          if (!downloads.length) return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ɴᴏᴛ ғᴏᴜɴᴅ.");

          let downloadText = '';
          for (let i = 0; i < downloads.length; i++) {
            const d = downloads[i];
            downloadText += `${i + 1}. ${d.quality} (${d.size || "Unknown"}) — ${d.server}\n`;
          }

          const caption = `ID-TV-007

📺 TV Series Name: ${search}          
📺 ᴛɪᴛʟᴇ: ${tv.title}

> 🗓️ ʏᴇᴀʀ: ${tv.year}
> ⭐ ɪᴍᴅʙ: ${tv.rating} (${tv.votes})
> 🎭 ɢᴇɴʀᴇs: ${tv.genres.join(", ")}
> 🎬 ɴᴇᴛᴡᴏʀᴋ: ${tv.networks.join(", ")}
> 📂 sᴇᴀsᴏɴ: ${season}
> 📺 ᴇᴘɪsᴏᴅᴇ: ${episodeNum || "N/A"}

🔗 Download option:
${downloadText}

\`\`\`${wagc}\`\`\``.trim();

          const imageUrl = tv.poster || epData.images[0];
          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });
          kavireact("✅");
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-007")) {//🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");

          const input = m.text.trim();

          const indlLine = resualt.find(item => item.startsWith(`${input}.`));
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const titleLine = resualt.find(item => item.startsWith(`📺 ᴛɪᴛʟᴇ:`));
          const seasonLine = resualt.find(item => item.startsWith(`> 📂 sᴇᴀsᴏɴ:`));
          const episodeLine = resualt.find(item => item.startsWith(`> 📺 ᴇᴘɪsᴏᴅᴇ:`));
          const indl = indlLine?.replace(`${input}.`, '').trim();
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          const title = titleLine?.replace(`📺 ᴛɪᴛʟᴇ:`, '').trim();
          const season = seasonLine?.replace(`> 📂 sᴇᴀsᴏɴ:`, '').trim();
          const episode = episodeLine?.replace(`> 📺 ᴇᴘɪsᴏᴅᴇ:`, '').trim();
          
          if (!season || !search || !episode || !title || !indl) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/details/?url=${encodeURIComponent(movieData.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const episodes = tv.seasons?.[season];
          const episodeData = episodes?.[episode - 1];
          
          if (!episodeData) return replygckavi('🚫 ᴇᴘɪsᴏᴅᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ.');
          
          const dlData = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/episode/?url=${encodeURIComponent(episodeData.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const dl = dlData.data.data;

          const qualityMatch = indl.match(/^(.*?)\s*\(/);
          const serverMatch = indl.match(/—\s*(.*)$/);

          const selectedQuality = qualityMatch?.[1]?.trim();
          const selectedServer = serverMatch?.[1]?.trim();

          if (!selectedQuality || !selectedServer) return replygckavi("🚫 ɪɴᴠᴀʟɪᴅ sᴇʟᴇᴄᴛɪᴏɴ.");

          const serverList = dl.servers[selectedServer];
          if (!serverList || !Array.isArray(serverList)) return replygckavi("🚫 sᴇʀᴠᴇʀ ɴᴏᴛ ғᴏᴜɴᴅ.");

          const selectedDownload = serverList.find(d => d.quality.trim() === selectedQuality);
          if (!selectedDownload) return replygckavi("🚫 Qᴜᴀʟɪᴛʏ ɴᴏᴛ ғᴏᴜɴᴅ.");

          const dls = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/download/?url=${encodeURIComponent(selectedDownload.link)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);

          const epImg = dl?.images[0] || "https://files.catbox.moe/wz7svr.png";
          const downloadLink = dls.data?.data;

          tmdbmovieupload.add(sender);

          const response = await axios.head(downloadLink, { timeout: 10000 });
          const contentLength = response.headers['content-length'];
          const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';

          const imgRes = await axios.get(epImg, { responseType: "arraybuffer", timeout: 8000 });
          const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000 });

          const imgBuffer = Buffer.from(imgRes.data);
          const fileBuffer = Buffer.from(fileRes.data);

          const extension = "mkv";
          const mimeType = "video/x-matroska";

          const fileName = `KAVI-X_${dl.episodeTitle}-(${season}-${episode})_${selectedDownload.quality}.${extension}`;
          const caption = `KAVI-X MD SERIES SENDER BOT\n\n🎬 TITLE: ${dl.episodeTitle}\n🧩 QUALITY: ${selectedDownload.quality}\n📦 SIZE: ${fileSize}\n🔖 SINHALA SUBTITLE: YES\n\n${kavixcaption}\nFileName: ${fileName}`;

          await cyberkavi.sendMessage(m.chat, {
            document: fileBuffer,
            mimetype: mimeType,
            fileName: fileName,
            caption: caption,
            jpegThumbnail: imgBuffer
          }, { quoted: m });   
          
          tmdbmovieupload.delete(sender);
          kavireact("✅")
        } catch (e) {
          tmdbmovieupload.delete(sender);
          return replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-008")) {//🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          const titleLine = resualt.find(item => item.startsWith(`${input}.`));
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const title = titleLine?.replace(`${input}.`, '').trim();
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          
          if (!title || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/details/?url=${encodeURIComponent(movieData.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          let seasonData = '';
          tv.seasons.forEach(season => {
              const seasonNumber = season.season;
              const episodes = season.episodes;
              seasonData += `${seasonNumber}. Season ${seasonNumber} (${episodes.length} episodes)\n`;
          });

          const seasonText = `ID-TV-009

📺 TV Series Name: ${search}          
📺 ᴛɪᴛʟᴇ: ${tv.title}

> ⭐ ʀᴀᴛɪɴɢ: ${tv.imdbRating || tv.siteRating || 'N/A'}
> 🗓️ ʏᴇᴀʀ: ${tv.year}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: Sinhala
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.country?.join(', ') || 'Unknown'}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres?.join(', ') || 'Unknown'}
> 🎬 ᴄʀᴇᴀᴛᴏʀs: ${tv.creators?.join(', ') || 'Unknown'}
> ⭐ ᴘᴏᴘᴜʟᴀʀ ᴠɪᴇᴡs: ${tv.views || 'N/A'}

📂 ᴄʜᴏᴏsᴇ ᴀ ꜱᴇᴀsᴏɴ:
${seasonData}

\`\`\`${wagc}\`\`\``.trim();

          await cyberkavi.sendMessage(m.chat, {
              image: { url: tv.poster },
              caption: seasonText,
              contextInfo: {
                  isForwarded: true,
                  forwardingScore: 99999999,
                  forwardedNewsletterMessageInfo: {
                      newsletterJid: "120363417324607329@newsletter",
                      newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                      serverMessageId: 1,
                  },
              },
          }, { quoted: m });
          kavireact("✅");
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-009")) {//🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          const season = parseInt(input);
          
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const titleLine = resualt.find(item => item.startsWith(`📺 ᴛɪᴛʟᴇ:`));
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          const title = titleLine?.replace(`📺 ᴛɪᴛʟᴇ:`, '').trim();
          
          if (!season || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/details/?url=${encodeURIComponent(movieData.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const seasonObj = tv.seasons.find(s => s.season === season);
          const imageUrl = tv.poster;
          if (!seasonObj) return replygckavi("🚫 sᴇʟᴇᴄᴛ ᴀ ᴠᴀʟɪᴅ sᴇᴀsᴏɴ.");

          let epText = "";
          seasonObj.episodes.forEach(ep => {
            epText += `${ep.episode}. ${ep.title}\n`;
          });

          const caption_1 = `ID-TV-100

📺 TV Series Name: ${search}          
📺 ᴛɪᴛʟᴇ: ${tv.title}

> ⭐ ʀᴀᴛɪɴɢ: ${tv.imdbRating || tv.siteRating || 'N/A'}
> 🗓️ ʏᴇᴀʀ: ${tv.year}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: Sinhala
> 📂 sᴇᴀsᴏɴ: ${season}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.country?.join(', ') || 'Unknown'}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres?.join(', ') || 'Unknown'}
> 🎬 ᴄʀᴇᴀᴛᴏʀs: ${tv.creators?.join(', ') || 'Unknown'}
> ⭐ ᴘᴏᴘᴜʟᴀʀ ᴠɪᴇᴡs: ${tv.views || 'N/A'}

📥 ᴄʜᴏᴏsᴇ ᴀɴ ᴇᴘɪsᴏᴅᴇ:
0. all
${epText}

\`\`\`${wagc}\`\`\``.trim();

          const caption_2 = `*\`${tv.title}\`*

> ⭐ ʀᴀᴛɪɴɢ: ${tv.imdbRating || tv.siteRating || 'N/A'}
> 🗓️ ʏᴇᴀʀ: ${tv.year}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: Sinhala
> 📂 sᴇᴀsᴏɴ: ${season}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.country?.join(', ') || 'Unknown'}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres?.join(', ') || 'Unknown'}
> 🎬 ᴄʀᴇᴀᴛᴏʀs: ${tv.creators?.join(', ') || 'Unknown'}
> ⭐ ᴘᴏᴘᴜʟᴀʀ ᴠɪᴇᴡs: ${tv.views || 'N/A'}

⏳ Downloading... Please wait
🔖 With Sinhala Subtitle

\`\`\`${wagc}\`\`\``.trim();

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption_2,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 9999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption_1,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 9999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });

          kavireact("✅");
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-100")) {//🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          const episode = parseInt(input);
          
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const titleLine = resualt.find(item => item.startsWith(`📺 ᴛɪᴛʟᴇ:`));
          const seasonLine = resualt.find(item => item.startsWith(`> 📂 sᴇᴀsᴏɴ:`));
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          const title = titleLine?.replace(`📺 ᴛɪᴛʟᴇ:`, '').trim();
          const season = seasonLine?.replace(`> 📂 sᴇᴀsᴏɴ:`, '').trim();

          const [episodeNumStr] = m.text.trim().split(" ");
          const isAll = episodeNumStr.toLowerCase() === "all" || episodeNumStr === "0";
          const episodeNum = isAll ? "all" : parseInt(episodeNumStr);
          
          if (!season || !search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/details/?url=${encodeURIComponent(movieData.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const seasonObj = tv.seasons.find(s => s.season === Number(season));
          const episodeObj = seasonObj.episodes.find(ep => ep.episode === episode);
          const jids = await listForwardJid();
          let stopForwarding = false;

          if (!seasonObj) return replygckavi("🚫 ɴᴏᴛ ғᴏᴜɴᴅ."); 

          try {
            if (episodeNum === "all") {
              if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");
              tmdbmovieupload.add(sender);
              const resMessage = await cyberkavi.sendMessage(m.chat, { text: `📥 ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴀʟʟ ᴇᴘɪsᴏᴅᴇs... ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ.` }, { quoted: cyberkavikey });

              for (const jid of jids) {
                try {
                  await cyberkavi.sendMessage(jid, { text: `📺 ᴜᴘʟᴏᴀᴅɪɴɢ ᴛᴠ sᴇʀɪᴇs: *${tv.title}* - Season ${season}` }, { quoted: cyberkavikey });
                } catch {}
              }

              const preferredOrder = ["720p", "1080p", "480p"];

              for (const ep of seasonObj.episodes) {
                try {
                  const downloadRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/episode/?url=${encodeURIComponent(ep.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
                  const downloads = downloadRes.data.data.downloads || [];

                  const bestDownload = downloads.sort((a, b) => {
                    const indexA = preferredOrder.findIndex(q => a.quality.includes(q));
                    const indexB = preferredOrder.findIndex(q => b.quality.includes(q));
                    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
                  })[0];

                  if (!bestDownload) {
                    await cyberkavi.sendMessage(m.chat, { text: `🚫 ɴᴏ ʙᴇsᴛ ᴅᴏᴡɴʟᴏᴀᴅ ꜰᴏʀ ᴇᴘɪsᴏᴅᴇ: ${ep.title}`, edit: resMessage.key});
                    stopForwarding = true;
                    continue;
                  }

                  await cyberkavi.sendMessage(m.chat, { text: `✅ ғᴇᴛᴄʜᴇᴅ ʙᴇsᴛ ᴅᴏᴡɴʟᴏᴀᴅ ғᴏʀ ᴇᴘɪsᴏᴅᴇ: ${ep.title}`, edit: resMessage.key});

                  const resDlLink = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/download/?url=${encodeURIComponent(bestDownload.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
                  if (!resDlLink.data.data) {
                    await cyberkavi.sendMessage(m.chat, { text: `🚫 ᴅʟ sᴇʀᴠᴇʀ(01) ᴇʀʀᴏʀ: ${ep.title}`, edit: resMessage.key});
                    stopForwarding = true;
                    continue;
                  }

                  await cyberkavi.sendMessage(m.chat, { text: `✅ ᴅʟ sᴇʀᴠᴇʀ(01) ғᴇᴛᴄʜᴇᴅ: ${ep.title}`, edit: resMessage.key});

                  const resDlLinksS = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/cinesubz/download/?url=${encodeURIComponent(resDlLink.data.data)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
                  if (!resDlLinksS.data.data.success || !resDlLinksS.data.data.link) {
                    await cyberkavi.sendMessage(m.chat, { text: `🚫 ᴅʟ sᴇʀᴠᴇʀ(02) ᴇʀʀᴏʀ: ${ep.title}`, edit: resMessage.key});
                    stopForwarding = true;
                    continue;
                  }

                  await cyberkavi.sendMessage(m.chat, { text: `✅ ᴅʟ sᴇʀᴠᴇʀ(02) ғᴇᴛᴄʜᴇᴅ: ${ep.title}`, edit: resMessage.key});

                  const epImg = downloadRes.data?.data?.gallery?.[0] || downloadRes.data?.data?.poster || "https://files.catbox.moe/wz7svr.png";
                  const downloadLink = resDlLinksS.data.data.link;
                  const epData = downloadRes.data?.data;
                  
                  const response = await axios.head(downloadLink, { timeout: 10000 });
                  const contentLength = response.headers['content-length'];
                  const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';

                  const imgRes = await axios.get(epImg, { responseType: "arraybuffer", timeout: 8000 });
                  const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000 });

                  const imgBuffer = Buffer.from(imgRes.data);
                  const fileBuffer = Buffer.from(fileRes.data);

                  const extension = "mkv";
                  const mimeType = "video/x-matroska";

                  const fileName = `KAVI-X_${epData.episodeTitle}-(${downloadRes.data?.data?.season || "Unknown"}-${downloadRes.data?.data?.episode || "Unknown"})_${bestDownload.quality}.${extension}`;
                  const caption = `KAVI-X MD SERIES SENDER BOT\n\n🎬 TITLE: ${epData.episodeTitle}\n🧩 QUALITY: ${bestDownload.quality}\n📦 SIZE: ${fileSize}\n🔖 SINHALA SUBTITLE: YES\n\n${kavixcaption}`;

                  const sentMessage = await cyberkavi.sendMessage(m.chat, {
                    document: fileBuffer,
                    mimetype: mimeType,
                    fileName: fileName,
                    caption: caption,
                    jpegThumbnail: imgBuffer
                  }, { quoted: m });

                  if (!stopForwarding) {
                    for (const jid of jids) {
                      try {
                        await cyberkavi.sendMessage(jid, { forward: sentMessage });
                      } catch (e) {
                        replygckavi(`🚫 ғᴏʀᴡᴀʀᴅɪɴɢ ғᴀɪʟᴇᴅ - ${epData?.episodeTitle || "ᴜɴᴋɴᴏᴡɴ ᴇᴘɪsᴏᴅᴇ."}`);
                        stopForwarding = true;
                        break;
                      }
                    }
                  }
                } catch (e) {
                  await cyberkavi.sendMessage(m.chat, { text: `🚫 ᴇʀʀᴏʀ ɪɴ ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴇᴘɪsᴏᴅᴇ: ${ep.title}`, edit: resMessage.key});
                  stopForwarding = true;
                  continue;
                }
              }

              tmdbmovieupload.delete(sender);
              return await cyberkavi.sendMessage(m.chat, { text: `✅ ᴀʟʟ ᴇᴘɪsᴏᴅᴇs ғᴏʀᴡᴀʀᴅᴇᴅ ᴛᴏ sᴀᴠᴇᴅ ᴊɪᴅs.`, edit: resMessage.key});
            }
          } catch (error) {
            tmdbmovieupload.delete(sender);
            return replygckavi(kavixerr2);
          }

          if (!episodeObj) return replygckavi("🚫 ᴇᴘɪsᴏᴅᴇ ɴᴏᴛ ғᴏᴜɴᴅ.");

          const downloadResEp = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/episode/?url=${encodeURIComponent(episodeObj.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);

          const epData = downloadResEp.data?.data;
          if (!epData || !epData.downloads || epData.downloads.length === 0) return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ɴᴏᴛ ғᴏᴜɴᴅ.");

          const downloads = epData.downloads;
          if (!downloads.length) return replygckavi("🚫 ᴅᴏᴡɴʟᴏᴀᴅ ɴᴏᴛ ғᴏᴜɴᴅ.");

          let downloadText = '';
          for (let i = 0; i < downloads.length; i++) {
            const d = downloads[i];
            downloadText += `${i + 1}. ${d.quality} (${d.size || "Unknown"}) — ${d.type || "Unknown"}\n`;
          }

          const imageUrl = epData.poster || epData.gallery[0] || tv.poster || null;
          const caption = `ID-TV-101

📺 TV Series Name: ${search}          
📺 ᴛɪᴛʟᴇ: ${tv.title}

> ⭐ ʀᴀᴛɪɴɢ: ${tv.imdbRating || tv.siteRating || 'N/A'}
> 🗓️ ʏᴇᴀʀ: ${tv.year}
> 🌐 ʟᴀɴɢᴜᴀɢᴇ: Sinhala
> 📂 sᴇᴀsᴏɴ: ${season}
> 📺 ᴇᴘɪsᴏᴅᴇ: ${episodeNum || "N/A"}
> 🌍 ᴄᴏᴜɴᴛʀʏ: ${tv.country?.join(', ') || 'Unknown'}
> 🎭 ɢᴇɴʀᴇs: ${tv.genres?.join(', ') || 'Unknown'}
> 🎬 ᴄʀᴇᴀᴛᴏʀs: ${tv.creators?.join(', ') || 'Unknown'}
> ⭐ ᴘᴏᴘᴜʟᴀʀ ᴠɪᴇᴡs: ${tv.views || 'N/A'}

🔗 Download option:
${downloadText}

\`\`\`${wagc}\`\`\``.trim();

          await cyberkavi.sendMessage(m.chat, {
            image: { url: imageUrl },
            caption: caption,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          }, { quoted: m });
          kavireact("✅");
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("ID-TV-101")) {//🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ 🎥\\
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          if (tmdbmovieupload.has(sender)) return replygckavi("⏳ ᴘʟᴇᴀꜱᴇ ᴡᴀɪᴛ. ᴀɴ ᴜᴘʟᴏᴀᴅ ɪꜱ ᴀʟʀᴇᴀᴅʏ ɪɴ ᴘʀᴏɢʀᴇꜱꜱ ꜰᴏʀ ʏᴏᴜ.");

          const input = m.text.trim();

          const indlLine = resualt.find(item => item.startsWith(`${input}.`));
          const searchLine = resualt.find(item => item.startsWith(`📺 TV Series Name:`));
          const titleLine = resualt.find(item => item.startsWith(`📺 ᴛɪᴛʟᴇ:`));
          const seasonLine = resualt.find(item => item.startsWith(`> 📂 sᴇᴀsᴏɴ:`));
          const episodeLine = resualt.find(item => item.startsWith(`> 📺 ᴇᴘɪsᴏᴅᴇ:`));
          const indl = indlLine?.replace(`${input}.`, '').trim();
          const search = searchLine?.replace(`📺 TV Series Name:`, '').trim();
          const title = titleLine?.replace(`📺 ᴛɪᴛʟᴇ:`, '').trim();
          const season = seasonLine?.replace(`> 📂 sᴇᴀsᴏɴ:`, '').trim();
          const episode = episodeLine?.replace(`> 📺 ᴇᴘɪsᴏᴅᴇ:`, '').trim();
          
          if (!season || !search || !episode || !title || !indl) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!tvRes.data?.data) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const movieData = tvRes.data.data.find(item => item.title.toLowerCase().includes(title.toLowerCase()));
          if (!movieData) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const tvDetailsRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/details/?url=${encodeURIComponent(movieData.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const tv = tvDetailsRes.data.data;
          if (!tv) return replygckavi('🚫 ɴᴏᴛ ꜰᴏᴜɴᴅ.');

          const seasonObj = tv.seasons.find(s => s.season === Number(season));
          const episodeObj = seasonObj.episodes.find(ep => ep.episode === Number(episode));
          const normalize = str => str.toLowerCase().replace(/\s+/g, '');
          if (!seasonObj || !episodeObj) return replygckavi("🚫 ɴᴏᴛ ғᴏᴜɴᴅ."); 

          const resMessage = await cyberkavi.sendMessage(m.chat, { text: `📥 ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ ᴇᴘɪsᴏᴅᴇ... ᴘʟᴇᴀsᴇ ᴡᴀɪᴛ.` }, { quoted: cyberkavikey });

          const downloadRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/episode/?url=${encodeURIComponent(episodeObj.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          const downloads = downloadRes.data.data.downloads || [];

          const typeMatch = indl.match(/WEB-DL|WEBRip|HDRip|BluRay/i);
          const typeToMatch = typeMatch ? typeMatch[0] : null;

          let filteredDownloads = downloads.filter(d => typeToMatch ? normalize(d.quality).includes(normalize(typeToMatch)) : true);

          const qualityMatch = indl.match(/\d{3,4}p/);
          if (qualityMatch) {
            filteredDownloads = filteredDownloads.filter(d => normalize(d.quality).includes(normalize(qualityMatch[0])));
          }

          const selectedDownload = filteredDownloads[0] || null;

          if (!selectedDownload) {
            return await cyberkavi.sendMessage(m.chat, { text: `🚫 ɴᴏ ʙᴇsᴛ ᴅᅠᴏᴡɴʟᴏᴀᴅ ꜰᴏʀ ᴇᴘɪsᴏᴅᴇ: ${episodeObj.title}`, edit: resMessage.key});
          }

          await cyberkavi.sendMessage(m.chat, { text: `✅ ғᴇᴛᴄʜᴇᴅ ʙᴇsᴛ ᴅᴏᴡɴʟᴏᴀᴅ ғᴏʀ ᴇᴘɪsᴏᴅᴇ: ${episodeObj.title}`, edit: resMessage.key});

          const resDlLink = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/download/?url=${encodeURIComponent(selectedDownload.url)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!resDlLink.data.data) {
            return await cyberkavi.sendMessage(m.chat, { text: `🚫 ᴅʟ sᴇʀᴠᴇʀ(01) ᴇʀʀᴏʀ: ${episodeObj.title}`, edit: resMessage.key});
          }

          await cyberkavi.sendMessage(m.chat, { text: `✅ ᴅʟ sᴇʀᴠᴇʀ(01) ғᴇᴛᴄʜᴇᴅ: ${episodeObj.title}`, edit: resMessage.key});

          const resDlLinksS = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/cinesubz/download/?url=${encodeURIComponent(resDlLink.data.data)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
          if (!resDlLinksS.data.data.success || !resDlLinksS.data.data.link) {
            return await cyberkavi.sendMessage(m.chat, { text: `🚫 ᴅʟ sᴇʀᴠᴇʀ(02) ᴇʀʀᴏʀ: ${episodeObj.title}`, edit: resMessage.key});
          }

          await cyberkavi.sendMessage(m.chat, { text: `✅ ᴅʟ sᴇʀᴠᴇʀ(02) ғᴇᴛᴄʜᴇᴅ: ${episodeObj.title}`, edit: resMessage.key});

          const epImg = downloadRes.data?.data?.gallery?.[0] || downloadRes.data?.data?.poster || "https://files.catbox.moe/wz7svr.png";
          const downloadLink = resDlLinksS.data.data.link;
          
          const response = await axios.head(downloadLink, { timeout: 10000 });
          const contentLength = response.headers['content-length'];
          const fileSize = contentLength ? formatSize(parseInt(contentLength)) : 'Unknown';

          const imgRes = await axios.get(epImg, { responseType: "arraybuffer", timeout: 8000 });
          const fileRes = await axios.get(downloadLink, { responseType: "arraybuffer", timeout: 120000 });

          const imgBuffer = Buffer.from(imgRes.data);
          const fileBuffer = Buffer.from(fileRes.data);

          const extension = "mkv";
          const mimeType = "video/x-matroska";

          const fileName = `KAVI-X_${downloadRes.data.data.episodeTitle}-(${downloadRes.data.data.season}-${downloadRes.data.data.episode})_${selectedDownload.quality}.${extension}`;
          const caption = `KAVI-X MD SERIES SENDER BOT\n\n🎬 TITLE: ${downloadRes.data.data.episodeTitle}\n🧩 QUALITY: ${selectedDownload.quality}\n📦 SIZE: ${fileSize}\n🔖 SINHALA SUBTITLE: YES\n\n${kavixcaption}\nFileName: ${fileName}`;

          await cyberkavi.sendMessage(m.chat, {
            document: fileBuffer,
            mimetype: mimeType,
            fileName: fileName,
            caption: caption,
            jpegThumbnail: imgBuffer
          }, { quoted: m });
        } catch (e) {
          tmdbmovieupload.delete(sender);
          return replygckavi(kavixerr2);
        }
      }
    }

    //Message Commands Handler\\
    if (m.quoted && m.text) {
      if (isGroup) {
        const cleanCyberLid = cleanLid(cyberkavi.user.lid)
        const cleanCyberId = cyberkavi.decodeJid(cyberkavi.user.id)
        if (m.quoted.sender !== cleanCyberLid && m.quoted.sender !== cleanCyberId) return;
      } else if (!isGroup) {
        if(m.quoted.sender !== botNumber) return;
      }
      const resualt = m.quoted.text.split("\n");
      if (resualt.includes("⚙️ 𝙺𝙰𝚅𝙸-𝚇 𝙼𝙳 𝙱𝙾𝚃 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂 ⚙️")) {
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          const settingsMap = {
            '1.1': ['worktype', 'inbox'],
            '1.2': ['worktype', 'group'],
            '1.3': ['worktype', 'private'],
            '1.4': ['worktype', 'public'],
            '2.1': ['online', true],
            '2.2': ['online', false],
            '3.1': ['autoread', true],
            '3.2': ['autoread', false],
            '4.1': ['autorecord', true],
            '4.2': ['autorecord', false],
            '5.1': ['autotype', true],
            '5.2': ['autotype', false],
            '6.1': ['autoswview', true],
            '6.2': ['autoswview', false],
            '7.1': ['welcome', true],
            '7.2': ['welcome', false],
            '8.1': ['ntsfw', true],
            '8.2': ['ntsfw', false],
            '9.1': ['autoswlike', true],
            '9.2': ['autoswlike', false],
            '10.1': ['autoreact', true],
            '10.2': ['autoreact', false],
          };

          const [key, value] = settingsMap[m.text] || [];

          if (key && value !== undefined) {
            const res = await loadLocal();
            const current = res.settings[key];
            if (current === value) {
              await cyberkavi.sendMessage(m.chat, { text: `📍 ${key}: ᴀʟʀᴇᴀᴅʏ ᴄʜᴀɴɢᴇᴅ ᴛᴏ ${value}` }, { quoted: m });
            } else {
              const result = await updateSetting(key, value);
              await cyberkavi.sendMessage(m.chat, { text: result ? "✅ Your action was completed successfully." : "❌ There was an issue completing your action." }, { quoted: m });
              kavireact(result ? "✅" : "❌");
            }
          }
        } catch (e) {
          await cyberkavi.sendMessage(m.chat, { text: "❌ There was an issue completing your action." }, { quoted: m });
          kavireact("❌");
        }
      } else if (resualt[0].includes("🎬 ᴍᴏᴠɪᴇ ꜱᴇᴀʀᴄʜ ᴘᴀɴᴇʟ")) {
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          
          const searchLine = resualt.find(item => item.startsWith(`🔎 ǫᴜᴇʀʏ:`));
          const search = searchLine?.replace(`🔎 ǫᴜᴇʀʏ:`, '').trim();
          if (!search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          if (input === "1") {
            try {
              if (!KaviTheCreator) return KaviOwnerMsg();
              if (!search) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");

              kavireact("📽️")

              const movieRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/movies/search/?q=${encodeURIComponent(search)}`);
              if (!movieRes.data.data || movieRes.data.data.length === 0) return replygckavi("ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴏᴛʜᴇʀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");
          
              let listText = `ID-MOVIE-000\n\n🎥 Movie Name: ${search}\n\n`;
          
              movieRes.data.data.forEach((item, index) => {
                listText += `${index + 1}. ${item.original_title} ||| ${item.id}\n`;
              });

              listText += `\n\n${kavixcap}`;
              
              const responseImg = "https://image.tmdb.org/t/p/w500/" + movieRes.data.data[0].poster_path || movieRes.data.data[0].backdrop_path;
              await cyberkavi.sendMessage(m.chat, {
                image: { url: responseImg },
                caption: listText,
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 99999999,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363417324607329@newsletter',
                    newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                    serverMessageId: 1
                  }
                }
              }, { quoted: m });
              kavireact("✅");
            } catch (e) {
              replygckavi(kavixerr2);
            }
          } else if (input === "2") {
            try {
              if (!KaviTheCreator) return KaviOwnerMsg();
              if (!search) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");

              kavireact("📽️")

              const movieRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
              if (!movieRes.data.data || movieRes.data.data.length === 0) return replygckavi("ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴏᴛʜᴇʀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");
          
              let listText = `ID-MOVIE-002\n\n🎥 Movie Name: ${search}\n\n`;
          
              movieRes.data.data.forEach((item, index) => {
                listText += `${index + 1}. ${item.title}\n`;
              });

              listText += `\n\n${kavixcap}`;
              
              const responseImg = movieRes.data.data[0].image;
              await cyberkavi.sendMessage(m.chat, {
                image: { url: responseImg },
                caption: listText,
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 99999999,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363417324607329@newsletter',
                    newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                    serverMessageId: 1
                  }
                }
              }, { quoted: m });
              kavireact("✅");
            } catch (e) {
              replygckavi(kavixerr2);
            }
          } else if (input === "3") {
            try {
              if (!KaviTheCreator) return KaviOwnerMsg();
              if (!search) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");

              kavireact("📽️");

              const searchRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/piratelk/search/?q=${encodeURIComponent(search)}&api_key=f186e64c05b89e477ed573dfbebd6d65df28819cab2e720cc819c9833c271d45`);
              const movies = searchRes.data.data;
              if (!movies || movies.length === 0) return replygckavi("ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴏᴛʜᴇʀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");

              let listText = `ID-MOVIE-004\n\n🎥 Movie Name: ${search}\n\n`;
              movies.forEach((item, index) => {
                listText += `${index + 1}. ${item.title}\n`;
              });
              listText += `\n\n${kavixcap}`;

              const posterImg = movies[0].image || null;
              await cyberkavi.sendMessage(m.chat, {
                image: { url: posterImg },
                caption: listText,
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 99999999,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363417324607329@newsletter',
                    newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                    serverMessageId: 1
                  }
                }
              }, { quoted: m });
              kavireact("✅");
            } catch (e) {
              replygckavi(kavixerr2);
            }
          } else if (input === "4") {
            try {
              if (!KaviTheCreator) return KaviOwnerMsg();
              if (!search) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");

              kavireact("📽️")

              const movieRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/movie/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
              if (!movieRes.data.data || movieRes.data.data.length === 0) return replygckavi("ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴏᴛʜᴇʀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");
          
              let listText = `ID-MOVIE-006\n\n🎥 Movie Name: ${search}\n\n`;
          
              movieRes.data.data.forEach((item, index) => {
                listText += `${index + 1}. ${item.title}\n`;
              });

              listText += `\n\n${kavixcap}`;
              
              const responseImg = movieRes.data.data[0].img;
              await cyberkavi.sendMessage(m.chat, {
                image: { url: responseImg },
                caption: listText,
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 99999999,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363417324607329@newsletter',
                    newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                    serverMessageId: 1
                  }
                }
              }, { quoted: m });
              kavireact("✅");
            } catch (e) {
              replygckavi(kavixerr2);
            }
          } else {
            replygckavi("🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.");
          }
        } catch (error) {
          replygckavi(kavixerr2);
        }
      } else if (resualt[0].includes("🎬 ꜱᴇʀɪᴇꜱ ꜱᴇᴀʀᴄʜ ᴘᴀɴᴇʟ")) {
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();

          kavireact("🎥")

          const input = m.text.trim();
          
          const searchLine = resualt.find(item => item.startsWith(`🔎 ǫᴜᴇʀʏ:`));
          const search = searchLine?.replace(`🔎 ǫᴜᴇʀʏ:`, '').trim();
          if (!search) return replygckavi('🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.');

          if (input === "1") {
            try {
            if (!KaviTheCreator) return KaviOwnerMsg();
            if (!search) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛᴠ ꜱᴇʀɪᴇꜱ ɴᴀᴍᴇ.");

            kavireact("📺");

            const tvRes = await axios.get(`https://kavi-x-movie-bot-api-s.vercel.app/api/v1/tv/search/?q=${encodeURIComponent(search)}`);
            if (!tvRes.data.data || tvRes.data.data.length === 0) return replygckavi("ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɴᴏᴛʜᴇʀ ꜱᴇʀɪᴇꜱ ɴᴀᴍᴇ.");

            let listText = `ID-TV-000\n\n📺 TV Series Name: ${search}\n\n`;

            tvRes.data.data.forEach((item, index) => {
              listText += `${index + 1}. ${item.name} ||| ${item.id}\n`;
            });

            listText += `\n\n${kavixcap}`;

            const responseImg = "https://image.tmdb.org/t/p/w500/" + (tvRes.data.data[0].poster_path || tvRes.data.data[0].backdrop_path);

            await cyberkavi.sendMessage(m.chat, {
              image: { url: responseImg },
              caption: listText,
              contextInfo: {
                isForwarded: true,
                forwardingScore: 99999999,
                forwardedNewsletterMessageInfo: {
                  newsletterJid: "120363417324607329@newsletter",
                  newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                  serverMessageId: 1,
                },
              },
            },
            { quoted: m });
            kavireact("✅");
          } catch (e) {
            replygckavi(kavixerr2);
          }
          } else if (input === "2") {
            try {
              if (!KaviTheCreator) return KaviOwnerMsg();
              if (!search) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛᴠ ꜱᴇʀɪᴇꜱ ɴᴀᴍᴇ.");

              kavireact("📺");

              const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/sinhalasub/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
              if (!tvRes.data.data || tvRes.data.data.length === 0) return replygckavi("ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɴᴏᴛʜᴇʀ ꜱᴇʀɪᴇꜱ ɴᴀᴍᴇ.");

              let listText = `ID-TV-004\n\n📺 TV Series Name: ${search}\n\n`;

              tvRes.data.data.forEach((item, index) => {
                listText += `${index + 1}. ${item.title}\n`;
              });

              listText += `\n\n${kavixcap}`;

              await cyberkavi.sendMessage(m.chat, {
                image: { url: tvRes.data.data[0].img },
                caption: listText,
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 99999999,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363417324607329@newsletter",
                    newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                    serverMessageId: 1,
                  },
                },
              },
              { quoted: m });
              kavireact("✅");
            } catch (e) {
              replygckavi(kavixerr2);
            }
          } else if (input === "3") {
            try {
              if (!KaviTheCreator) return KaviOwnerMsg();
              if (!search) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴛᴠ ꜱᴇʀɪᴇꜱ ɴᴀᴍᴇ.");

              kavireact("📺");

              const tvRes = await axios.get(`https://kavi-public-apis.vercel.app/api/v2/public/download/tv/cinesubz/search/?q=${encodeURIComponent(search)}&api_key=e50a2d7ee2d2a89081561cf67e61a45191d4168921d072863154037e783e9a0f`);
              if (!tvRes.data.data || tvRes.data.data.length === 0) return replygckavi("ɴᴏ ʀᴇsᴜʟᴛs ғᴏᴜɴᴅ, ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɴᴏᴛʜᴇʀ ꜱᴇʀɪᴇꜱ ɴᴀᴍᴇ.");

              let listText = `ID-TV-008\n\n📺 TV Series Name: ${search}\n\n`;

              tvRes.data.data.forEach((item, index) => {
                listText += `${index + 1}. ${item.title}\n`;
              });

              listText += `\n\n${kavixcap}`;

              await cyberkavi.sendMessage(m.chat, {
                image: { url: tvRes.data.data[0].poster },
                caption: listText,
                contextInfo: {
                  isForwarded: true,
                  forwardingScore: 99999999,
                  forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363417324607329@newsletter",
                    newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                    serverMessageId: 1,
                  },
                },
              },
              { quoted: m });
              kavireact("✅");
            } catch (e) {
              replygckavi(kavixerr2);
            }
          } else {
            replygckavi("🚫 ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴄʜᴏꜱᴇ ɪꜱ ɪɴᴠᴀʟɪᴅ.");
          }
        } catch (error) {
          replygckavi(kavixerr2);
        }
      }
    }

    //Commands Handler\\
    switch (isCommand) {

      case 'groupjid': case 'jid': {
        if (!isGroup) return KaviGroupMsg();
        if (!KaviTheCreator) return KaviOwnerMsg()
        const groupJid = groupMetadata.id;
        replygckavi(groupJid)
      }
      break;

      case 'movie': case 'mv': {
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          if (!text) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴍᴏᴠɪᴇ ɴᴀᴍᴇ.");

          kavireact("📺");

         const listText = `🎬 ᴍᴏᴠɪᴇ ꜱᴇᴀʀᴄʜ ᴘᴀɴᴇʟ

🔎 ǫᴜᴇʀʏ: ${text}

📂 ꜱᴇʟᴇᴄᴛ ꜱᴏᴜʀᴄᴇ
> ① 🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ
> ② 🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ
> ③ 🎥 ᴘɪʀᴀᴛᴇʟᴋ ꜱᴇᴀʀᴄʜ
> ④ 🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ

⚡ ʀᴇᴘʟʏ ᴡɪᴛʜ ɴᴜᴍʙᴇʀ (1–4)`.trim();

          const movieImg = await axios.get("https://raw.githubusercontent.com/KaviDeveloperSe/KAVI-X-MD-PUB-DB/refs/heads/main/kavi-x-md-main-data.js");
          if (!movieImg.data.movieImg) {
            kavireact("❌");
            return replygckavi(kavixerr2);
          }

          await cyberkavi.sendMessage(m.chat, {
            image: { url: movieImg.data.movieImg },
            caption: listText,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          },
          { quoted: m });
          kavireact("✅");
        } catch (e) {
          kavireact("❌");
          replygckavi(kavixerr2);
        }
      }
      break;

      case 'series': case 'tv': {
        try {
          if (!KaviTheCreator) return KaviOwnerMsg();
          if (!text) return replygckavi("❔ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ꜱᴇʀɪᴇꜱ ɴᴀᴍᴇ.");

          kavireact("📺");

         const listText = `🎬 ꜱᴇʀɪᴇꜱ ꜱᴇᴀʀᴄʜ ᴘᴀɴᴇʟ

🔎 ǫᴜᴇʀʏ: ${text}

📂 ꜱᴇʟᴇᴄᴛ ꜱᴏᴜʀᴄᴇ
> ① 🎥 ᴛᴍᴅʙ ꜱᴇᴀʀᴄʜ
> ② 🎥 sɪɴʜᴀʟᴀsᴜʙ ꜱᴇᴀʀᴄʜ
> ③ 🎥 ᴄɪɴᴇsᴜʙᴢ ꜱᴇᴀʀᴄʜ

⚡ ʀᴇᴘʟʏ ᴡɪᴛʜ ɴᴜᴍʙᴇʀ (1–3)`.trim();

          const tvImg = await axios.get("https://raw.githubusercontent.com/KaviDeveloperSe/KAVI-X-MD-PUB-DB/refs/heads/main/kavi-x-md-main-data.js");
          if (!tvImg.data.tvImg) {
            kavireact("❌");
            return replygckavi(kavixerr2);
          }

          await cyberkavi.sendMessage(m.chat, {
            image: { url: tvImg.data.tvImg },
            caption: listText,
            contextInfo: {
              isForwarded: true,
              forwardingScore: 99999999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363417324607329@newsletter",
                newsletterName: "ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰",
                serverMessageId: 1,
              },
            },
          },
          { quoted: m });
          kavireact("✅");
        } catch (e) {
          kavireact("❌");
          replygckavi(kavixerr2);
        }
      }
      break;

      case 'setting': case 'settings': case 'st': {
        if (!KaviTheCreator) return KaviOwnerMsg()
        kavireact("⚙️")
        let kavitext = `⚙️ 𝙺𝙰𝚅𝙸-𝚇 𝙼𝙳 𝙱𝙾𝚃 𝚂𝙴𝚃𝚃𝙸𝙽𝙶𝚂 ⚙️

┏━━《 🍀𝐖𝐎𝐑𝐊 𝐓𝐘𝐏𝐄🍀 》      
┃ *1.1 ➣ ɪɴʙᴏx 📥*
┃ *1.2 ➣ ɢʀᴏᴜᴘ 🗨️*
┃ *1.3 ➣ ᴘʀɪᴠᴀᴛᴇ 🔒*
┃ *1.4 ➣ ᴘᴜʙʟɪᴄ 🌐*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐁𝐎𝐓 𝐎𝐍𝐋𝐈𝐍𝐄🍀 》      
┃ *2.1 ➣ ᴇɴᴀʙʟᴇ ʙᴏᴛ ᴏɴʟɪɴᴇ ✅*
┃ *2.2 ➣ ᴅɪsᴀʙʟᴇ ʙᴏᴛ ᴏɴʟɪɴᴇ ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐃🍀 》      
┃ *3.1 ➣ ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴀᴅ ✅*
┃ *3.2 ➣ ᴅɪsᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴀᴅ ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐀𝐔𝐓𝐎 𝐑𝐄𝐂𝐎𝐑𝐃🍀 》      
┃ *4.1 ➣ ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅ ✅*
┃ *4.2 ➣ ᴅɪsᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅ ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐀𝐔𝐓𝐎 𝐓𝐘𝐏𝐄🍀 》      
┃ *5.1 ➣ ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ᴛʏᴘᴇ ✅*
┃ *5.2 ➣ ᴅɪsᴀʙʟᴇ ᴀᴜᴛᴏ ᴛʏᴘᴇ ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐑𝐄𝐀𝐃 𝐒𝐓𝐀𝐓𝐔𝐒🍀 》      
┃ *6.1 ➣ ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴀᴅ sᴛᴀᴛᴜs ✅*
┃ *6.2 ➣ ᴅɪsᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴀᴅ sᴛᴀᴛᴜs ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐖𝐄𝐋𝐂𝐎𝐌𝐄 / 𝐋𝐄𝐅𝐓🍀 》      
┃ *7.1 ➣ ᴇɴᴀʙʟᴇ ᴡᴇʟᴄᴏᴍᴇ / ʟᴇғᴛ ✅*
┃ *7.2 ➣ ᴅɪsᴀʙʟᴇ ᴡᴇʟᴄᴏᴍᴇ / ʟᴇғᴛ ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐍𝐓𝐒𝐅𝐖 𝐂𝐌𝐃𝐒🍀 》      
┃ *8.1 ➣ ᴇɴᴀʙʟᴇ ɴᴛsғᴡ ✅*
┃ *8.2 ➣ ᴅɪsᴀʙʟᴇ ɴᴛsғᴡ ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐋𝐈𝐊𝐄 𝐒𝐓𝐀𝐓𝐔𝐒🍀 》      
┃ *9.1 ➣ ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ʟɪᴋᴇ sᴛᴀᴛᴜs ✅*
┃ *9.2 ➣ ᴅɪsᴀʙʟᴇ ᴀᴜᴛᴏ ʟɪᴋᴇ sᴛᴀᴛᴜs ❌*
┖━━━━━━━━━━━━━━━➢

┏━━《 🍀𝐀𝐔𝐓𝐎 𝐑𝐄𝐀𝐂𝐓🍀 》      
┃ *10.1 ➣ ᴇɴᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ ✅*
┃ *10.2 ➣ ᴅɪsᴀʙʟᴇ ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ ❌*
┖━━━━━━━━━━━━━━━➢`;
        await cyberkavi.sendMessage(m.chat, { image: { url: botlogo }, caption: kavitext }, { quoted: m });
      }
      break;

      case 'addjid': {
        if (!KaviTheCreator) return KaviOwnerMsg();
        if (!text) return replygckavi('⚠️ ᴘʟᴇᴀꜱᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴊɪᴅ.');
        if (!isValidJid(text)) return replygckavi('⚠️ ɪɴᴠᴀʟɪᴅ ᴊɪᴅ ꜰᴏʀᴍᴀᴛ.');

        const response = await addForwardJid(text);
        if (response === true) {
          replygckavi('✅ ɪᴅ ꜱᴀᴠᴇᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ.');
        } else if (response === false) {
          replygckavi(kavixerr2);
        } else if (response === 'exists') {
          replygckavi('⚠️ ɪᴅ ᴀʟʀᴇᴀᴅʏ ᴇxɪsᴛs.');
        } else {
          replygckavi(kavixerr2);
        }
      }
      break;   
      
      case 'deljid': {
        if (!KaviTheCreator) return KaviOwnerMsg();
        if (!text) return replygckavi('⚠️ ᴘʟᴇᴀꜱᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴊɪᴅ ᴛᴏ ʀᴇᴍᴏᴠᴇ.');
        if (!isValidJid(text)) return replygckavi('⚠️ ɪɴᴠᴀʟɪᴅ ᴊɪᴅ ꜰᴏʀᴍᴀᴛ.');

        const response = await delForwardJid(text);
        if (response === true) {
          replygckavi('✅ ɪᴅ ᴅᴇʟᴇᴛᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ.');
        } else if (response === false) {
          replygckavi(kavixerr2);
        } else if (response === 'notfound') {
          replygckavi('⚠️ ɪᴅ ɴᴏᴛ ғᴏᴜɴᴅ.');
        } else {
          replygckavi(kavixerr2);
        }
      }
      break;
      
      case 'listjid': {
        if (!KaviTheCreator) return KaviOwnerMsg();

        const response = await listForwardJid();
        if (!response.length) return replygckavi('⚠️ ɴᴏ ᴊɪᴅꜱ ꜱᴀᴠᴇᴅ.');

        const list = response.map((j, i) => `${i + 1}. ${j}`).join('\n');
        replygckavi(`📌 ᴄᴜʀʀᴇɴᴛ ᴊɪᴅꜱ:\n\n${list}`);
      }
      break;

      case 'for': case 'forward': case 'f': {
        const mime = require('mime-types');
        const sharp = require('sharp');

        if (!KaviTheCreator) return KaviOwnerMsg();

        const quotedMsg = m.quoted;
        if (!quotedMsg) return replygckavi('⚠️ ǫᴜᴏᴛᴇ ᴀ ᴍᴇꜱꜱᴀɢᴇ.');

        const jids = await listForwardJid();
        if (!jids?.length) return replygckavi('⚠️ ɴᴏ ᴊɪᴅꜱ ꜱᴀᴠᴇᴅ.');

        const msgType = quotedMsg.mtype;
        const rawMsg = quotedMsg.fakeObj?.message || quotedMsg.message;

        if (!rawMsg || !rawMsg[msgType]) return replygckavi('⚠️ ᴜɴꜱᴜᴘᴘᴏʀᴛᴇᴅ ᴍᴇꜱꜱᴀɢᴇ.');

        const msg = rawMsg[msgType];

        try {
          if (msgType === 'documentMessage') {

            const ext = mime.extension(msg.mimetype) || 'bin';
            const originalCaption = msg.caption || '';
            const fileNameMatch = originalCaption.match(/FileName:\s*(.*)/);
            const extractedFileName = fileNameMatch ? fileNameMatch[1].trim() : 'KAVI-X FILE';
            const cleanCaption = originalCaption.split('\n').filter(line => !line.includes('FileName:')).join('\n').trim();

            let thumbBuffer = msg.jpegThumbnail || null;
            if (thumbBuffer) {
              try {
                thumbBuffer = await sharp(thumbBuffer).resize(150, 150).toBuffer();
              } catch { thumbBuffer = null; }
            }

            const fullFileName = `${extractedFileName}.${ext}`;

            const messageToForward = {
              key: {
                remoteJid: quotedMsg.fakeObj?.key?.remoteJid || m.chat,
                fromMe: quotedMsg.fakeObj?.key?.fromMe ?? true,
                id: quotedMsg.fakeObj?.key?.id
              },
              message: {
                documentMessage: {
                  ...msg,
                  fileName: fullFileName,
                  caption: cleanCaption,
                  jpegThumbnail: thumbBuffer || null
                }
              }
            };

            for (const jid of jids) {
              await cyberkavi.copyNForward(jid, messageToForward, false);
            }

            return replygckavi('✅ Document forwarded safely to all saved JIDs.');
          } else if (msgType === 'imageMessage' || msgType === 'videoMessage') {
            const forwardMessage = {
              key: {
                remoteJid: quotedMsg.fakeObj?.key?.remoteJid || m.chat,
                fromMe: quotedMsg.fakeObj?.key?.fromMe ?? true,
                id: quotedMsg.fakeObj?.key?.id
              },
              message: {
                [msgType]: {
                  ...msg,
                  contextInfo: {
                    isForwarded: true,
                    forwardingScore: 99999999,
                    forwardedNewsletterMessageInfo: {
                      newsletterJid: '120363417324607329@newsletter',
                      newsletterName: 'ᴋᴀᴠɪ-x ᴍᴅ ᴏꜰꜰɪᴄɪᴀʟ 🔰',
                      serverMessageId: 1
                    }
                  }
                }
              }
            };

            for (const jid of jids) {
              await cyberkavi.copyNForward(jid, forwardMessage, false);
            }

            return replygckavi(`✅ ${msgType.replace('Message','')} forwarded safely.`);
          } else {
            return replygckavi('⚠️ Unsupported message type for forwarding.');
          }
        } catch (err) {
          return replygckavi('⚠️ Forward failed, please try again.');
        }
      }
      break;

      case 'restart': {
        if (!KaviTheCreator) return KaviOwnerMsg()
        replygckavi('🔄 ʀᴇsᴛᴀʀᴛɪɴɢ... ᴡɪʟʟ ʙᴇ ᴄᴏᴍᴘʟᴇᴛᴇᴅ ɪɴ sᴇᴄᴏɴᴅs.')
        await sleep(3000)
        restart()
      }
      break
  
      case 'system': {
        const info = await getSystemInfo();
        const sysInfoMessage = `*🖥️ Sʏsᴛᴇᴍ ɪɴғᴏʀᴍᴀᴛɪᴏɴ* 

- ᴘʟᴀᴛғᴏʀᴍ: ${info.platform}
- ᴀʀᴄʜɪᴛᴇᴄᴛᴜʀᴇ: ${info.architecture}
- ᴄᴘᴜ: ${info.cpu}
- ᴄᴏʀᴇs: ${info.cores}
- ᴛᴏᴛᴀʟ ᴍᴇᴍᴏʀʏ: ${info.memory}
- ꜰʀᴇᴇ ᴍᴇᴍᴏʀʏ: ${info.freeMemory}`;
    
        replygckavi(sysInfoMessage)
      }
      break

      case 'ping': case 'botstatus': case 'statusbot': case 'p': {
        kavireact("🏓")
        let timestamp = speed()
        const pingMsg = await cyberkavi.sendMessage(m.chat, { text: '🏓 Pinging...' }, { quoted: m });
        let latency = (speed() - timestamp).toFixed(0)
        await cyberkavi.sendMessage(m.chat, { text: `🏓 Pong! ${latency}ms`, edit: pingMsg.key });
      }
      break

    }

  } catch (err) {
    console.log(util.format(err))
    let e = String(err)
    
    if (e.includes("conflict")) return
    if (e.includes("Cannot derive from empty media key")) return
    if (e.includes("not-authorized")) return
    if (e.includes("already-exists")) return
    if (e.includes("rate-overlimit")) return
    if (e.includes("cyberkaviection Closed")) return
    if (e.includes("Timed Out")) return
    if (e.includes("Value not found")) return
    if (e.includes("Socket cyberkaviection timeout")) return
  }
}