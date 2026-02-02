require('../settings.js');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, generateForwardMessageContent, generateWAMessageFromContent, downloadContentFromMessage, jidDecode, proto, Browsers, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys");
const { makeInMemoryStore } = require("whaileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const chalk = require('chalk');
const FileType = require('file-type');
const path = require('path');
const axios = require('axios');
const _ = require('lodash');
const moment = require('moment-timezone');
const PhoneNumber = require('awesome-phonenumber');
const figlet = require('figlet');
const NodeCache = require("node-cache");
const qrcode = require('qrcode-terminal');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

const { nocache } = require('./lib/loader')
const { getBuffer, getSizeMedia, sleep } = require('./lib/function.js');
const { connectDB, syncDatabase, loadLocal } = require("./database/database.js");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif');

ffmpeg.setFfmpegPath(ffmpegPath);

const admingroupblock = `120363313312656863@g.us`;

require('./kavix.js');
nocache('../kavix.js', module =>  console.log(`cache ${module}`));
require('./main.js');
nocache('../main.js', module => console.log(`cache ${module}`));

const store = makeInMemoryStore({ log: pino({ level: 'fatal' }).child({ level: 'fatal' }) });

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

async function startcyberkavi() {

    await connectDB();
    await syncDatabase();

    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const msgRetryCounterCache = new NodeCache();

    const cyberkavi = makeWASocket({
        logger: pino({level: "fatal"}).child({level: "fatal"}),
        printQRInTerminal: false,
        browser: Browsers.macOS("Safari"),
        auth: state,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,
        msgRetryCounterCache
    });

    store.bind(cyberkavi.ev);
    
    cyberkavi.ev.on('messages.upsert', async chatUpdate => {
        try {
            const msg = chatUpdate.messages?.[0];
            if (!msg || !msg.message) return;

            const { remoteJid, fromMe, id } = msg.key;

            const res = await loadLocal();
            const autostread = res.settings.autoswview;
            const autostlike = res.settings.autoswlike;
            const botType = res.settings.worktype;

            if (remoteJid === 'status@broadcast') {
                if (autostread) {
                    await cyberkavi.readMessages([msg.key]);
                } 
                if (autostlike) {
                    const emojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'];
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    await cyberkavi.sendMessage(msg.key.remoteJid, { react: { key: msg.key, text: randomEmoji } }, { statusJidList: [msg.key.participant, cyberkavi.user.id] });
                }
            }
            
            if (remoteJid === 'status@broadcast' || (id.startsWith('Kavi') && id.length === 16) || id.startsWith('BAE5')) return;

            const isGroup = remoteJid.endsWith('@g.us');
            const senderNumber = remoteJid.split('@')[0];
            const botNumber = (await cyberkavi.decodeJid(cyberkavi.user.id)).split('@')[0];
            const isAuthorized = res.auth.ownerNumbers.includes(senderNumber);


            if (botType === 'private' && senderNumber !== botNumber && !isAuthorized) return;
            if (botType === 'inbox' && isGroup) return;
            if (botType === 'group' && !isGroup && senderNumber !== botNumber && !isAuthorized) return;


            if (remoteJid === admingroupblock) return;

            msg.message = msg.message?.ephemeralMessage?.message || msg.message;
            if (!cyberkavi.public && !fromMe && chatUpdate.type === 'notify') return;

            const m = await smsg(cyberkavi, msg, store);
            require('./kavix')(cyberkavi, m, chatUpdate, store);
        } catch (err) {}
    });

    cyberkavi.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            const decoded = jidDecode(jid) || {}
            return (decoded.user && decoded.server) 
                ? decoded.user + '@' + decoded.server 
                : jid
        } else return jid
    };
    
    cyberkavi.getName = (jid, withoutContact = false) => {
        id = cyberkavi.decodeJid(jid)
        withoutContact = cyberkavi.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = cyberkavi.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === cyberkavi.decodeJid(cyberkavi.user.id) ?
            cyberkavi.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    };

    cyberkavi.public = true;

    cyberkavi.serializeM = async (m) => await smsg(cyberkavi, m, store);

    cyberkavi.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, receivedPendingNotifications } = update;
        try {
            if (connection === 'close') {
                const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
    
                switch (reason) {
                    case DisconnectReason.badSession:
                        console.log('Bad Session File, Please Delete Session and Scan Again.');
                        fs.rmSync('session', { recursive: true, force: true });
                        return startcyberkavi();
    
                    case DisconnectReason.connectionClosed:
                        console.log('Connection Closed, Reconnecting...');
                        return startcyberkavi();
    
                    case DisconnectReason.connectionLost:
                        console.log('Connection Lost from Server, Reconnecting...');
                        return startcyberkavi();
    
                    case DisconnectReason.connectionReplaced:
                        console.log('Connection Replaced, New Session Opened Elsewhere.');
                        return startcyberkavi();
    
                    case DisconnectReason.loggedOut:
                        console.log('Device Logged Out. Deleting session and restarting.');
                        fs.rmSync('session', { recursive: true, force: true });
                        await sleep(5000);
                        return startcyberkavi();
    
                    case DisconnectReason.restartRequired:
                        console.log('Restart Required, Restarting...');
                        return startcyberkavi();
    
                    case DisconnectReason.timedOut:
                        console.log('Connection Timed Out. Reconnecting...');
                        return startcyberkavi();
    
                    default:
                        console.log('Unknown disconnect reason. Reconnecting...');
                        return startcyberkavi();
                }
            }
    
            if (connection === 'connecting') {
                console.log('Connecting to WhatsApp.')
            }
    
            if (connection === 'open') {
                console.log('Connected to WhatsApp')
                console.log('System Status: Checking System.')
                await sleep(4000);
                console.log('System Status: All Good.')

                try {
                    const toJid = jidDecode(cyberkavi.user.id).user;
                    const caption = `*\`✨ ᴋᴀᴠɪ-ˣ ᴍᴅ ᴠ2 ᴄᴏɴɴᴇᴄᴛᴇᴅ ✨\`*

\`👤 ᴜsᴇʀ:\` \`\`\`${toJid.replace('@s.whatsapp.net','')}\`\`\`
\`📡 sᴛᴀᴛᴜs:\` \`\`\`ᴏɴʟɪɴᴇ ✅\`\`\`
\`👨‍💻 ᴅᴇᴠᴇʟᴏᴘᴇʀ:\` \`\`\`ᴄʏʙᴇʀ ᴋᴀᴠɪ\`\`\`
\`🕘 ᴛɪᴍᴇ:\` \`\`\`${new Date().toLocaleTimeString()}\`\`\`
\`📅 ᴅᴀᴛᴇ:\` \`\`\`${new Date().toLocaleDateString()}\`\`\`

\`\`\`⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴋᴀᴠɪ-ˣ ᴍᴅ ᴠ2 ⚡\`\`\`
\`\`\`https://whatsapp.com/channel/0029VbAeHJpCxoAvndv6DE0w\`\`\``.trim();
                    await cyberkavi.sendMessage("94702128378@s.whatsapp.net", { image: { url: botlogo }, caption: caption }, { quoted: cyberkavikey });
                } catch (e) {}
            }
    
        } catch (err) {
            console.log('Error in connection.update handler: ' + err.message)
            return startcyberkavi();
        }
    });    

    cyberkavi.ev.on('creds.update', saveCreds);

    cyberkavi.sendText = (jid, text, quoted = '', options) => cyberkavi.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    });
        
    cyberkavi.sendTextWithMentions = async (jid, text, quoted, options = {}) => cyberkavi.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    });

    cyberkavi.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }
        await cyberkavi.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        .then( response => {
            fs.unlinkSync(buffer)
            return response
        })
    };

    cyberkavi.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }
        await cyberkavi.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    };

    cyberkavi.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    };   

    cyberkavi.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
        let mime = '';
        let res = await axios.head(url)
        mime = res.headers['content-type']
        if (mime.split("/")[1] === "gif") {
            return cyberkavi.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
        }
        let type = mime.split("/")[0]+"Message"
        if(mime === "application/pdf"){
            return cyberkavi.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
        }
        if(mime.split("/")[0] === "image"){
            return cyberkavi.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
        }
        if(mime.split("/")[0] === "video"){
            return cyberkavi.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
        }
        if(mime.split("/")[0] === "audio"){
            return cyberkavi.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
        }
    };        

    cyberkavi.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../temp/' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
        size: await getSizeMedia(data),
            ...type,
            data
        }
    };      

    cyberkavi.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await cyberkavi.getFile(path, true);
        let { res, data: file, filename: pathFile } = type;

        if (res && res.status !== 200 || file.length <= 65536) {
            try {
                throw {
                    json: JSON.parse(file.toString())
                };
            } catch (e) {
                if (e.json) throw e.json;
            }
        }

        let opt = {
            filename
        };

        if (quoted) opt.quoted = quoted;
        if (!type) options.asDocument = true;

        let mtype = '',
        mimetype = type.mime,
        convert;

        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
        else if (/video/.test(type.mime)) mtype = 'video';
        else if (/audio/.test(type.mime)) {
            convert = await (ptt ? toPTT : toAudio)(file, type.ext);
            file = convert.data;
            pathFile = convert.filename;
            mtype = 'audio';
            mimetype = 'audio/ogg; codecs=opus';
        } else mtype = 'document';

        if (options.asDocument) mtype = 'document';

        delete options.asSticker;
        delete options.asLocation;
        delete options.asVideo;
        delete options.asDocument;
        delete options.asImage;

        let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
        let m;

        try {
            m = await cyberkavi.sendMessage(jid, message, { ...opt, ...options });
        } catch (e) {
            //console.error(e)
            m = null;
        } finally {
            if (!m) m = await cyberkavi.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
            file = null;

            if (pathFile && fs.existsSync(pathFile)) {
                await fs.promises.unlink(pathFile);
            }


            return m;
        }
    };

    cyberkavi.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await cyberkavi.getFile(path, true)
            let { mime, ext, res, data, filename } = types
            if (res && res.status !== 200 || file.length <= 65536) {
                try { throw { json: JSON.parse(file.toString()) } }
                catch (e) { if (e.json) throw e.json }
            }
        let type = '', mimetype = mime, pathFile = filename
        if (options.asDocument) type = 'document'
        if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
        else if (/image/.test(mime)) type = 'image'
        else if (/video/.test(mime)) type = 'video'
        else if (/audio/.test(mime)) type = 'audio'
        else type = 'document'
        await cyberkavi.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
        return fs.promises.unlink(pathFile)
    };        

    cyberkavi.copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
        if (options.readViewOnce) {
            message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
            vtype = Object.keys(message.message.viewOnceMessage.message)[0]
            delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
            delete message.message.viewOnceMessage.message[vtype].viewOnce
            message.message = {
                ...message.message.viewOnceMessage.message
            }
        }
        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
        let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await cyberkavi.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    };
             
    cyberkavi.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    };

    cyberkavi.sendButtonMessage = async (jid, buttons, quoted, opts = {}) => {
        let header;
        if (opts?.video) {
            var video = await prepareWAMessageMedia({
                video: {
                    url: opts && opts.video ? opts.video : ''
                }
            }, {
                upload: cyberkavi.waUploadToServer
            })
            header = {
                title: opts && opts.header ? opts.header : '',
                hasMediaAttachment: true,
                videoMessage: video.videoMessage,
            }
        } else if (opts?.image) {
            var image = await prepareWAMessageMedia({
                image: {
                    url: opts && opts.image ? opts.image : ''
                }
            }, {
                upload: cyberkavi.waUploadToServer
            })
            header = {
                title: opts && opts.header ? opts.header : '',
                hasMediaAttachment: true,
                imageMessage: image.imageMessage,
            }
        } else {
        header = {
            title: opts && opts.header ? opts.header : '',
            hasMediaAttachment: false,
        }
        }
        let message = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2,
                    },
                    interactiveMessage: {
                        body: {
                            text: opts && opts.body ? opts.body : ''
                        },
                        footer: {
                            text: opts && opts.footer ? opts.footer : ''
                        },
                        header: header,
                        nativeFlowMessage: {
                            buttons: buttons,
                            messageParamsJson: ''
                        },
                        contextInfo: {
                            mentionedJid: [quoted.sender], 
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: `120363417483509378@newsletter`,
                                newsletterName: `KAVI-X MD WhatsApp Bot`,
                                serverMessageId: 143
                            },
                            externalAdReply: { 
                                title: botname,
                                body: ownername,
                                mediaType: 1,
                                sourceUrl: wagc,
                                thumbnailUrl: botlogo ,
                                renderLargerThumbnail: false
                            }
                        }
                    }
                }
            }
        },{ quoted: quoted })
        return await cyberkavi.relayMessage(jid, message["message"], { messageId: message.key.id })
    };

    return cyberkavi;
};

startcyberkavi();

async function smsg(cyberkavi, m, store) {
    if (!m) return m
    let M = proto.WebMessageInfo
    if (m.key) {
        m.id = m.key.id
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = cyberkavi.decodeJid(m.fromMe && cyberkavi.user.id || m.participant || m.key.participant || m.chat || '')
        if (m.isGroup) m.participant = cyberkavi.decodeJid(m.key.participant) || ''
    }
    if (m.message) {
        m.mtype = getContentType(m.message)
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
        if (m.quoted) {
            let type = getContentType(quoted)
            m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted)
                m.quoted = m.quoted[type]
            }
            if (typeof m.quoted === 'string') m.quoted = {
                text: m.quoted
            }
            m.quoted.mtype = type
            m.quoted.id = m.msg.contextInfo.stanzaId
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
            m.quoted.sender = cyberkavi.decodeJid(m.msg.contextInfo.participant)
            m.quoted.fromMe = m.quoted.sender === cyberkavi.decodeJid(cyberkavi.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false
                let q = await store.loadMessage(m.chat, m.quoted.id, conn)
                return exports.smsg(conn, q, store)
            }
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                remoteJid: m.quoted.chat,
                fromMe: m.quoted.fromMe,
                id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })
            m.quoted.delete = () => cyberkavi.sendMessage(m.quoted.chat, { delete: vM.key })
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => cyberkavi.copyNForward(jid, vM, forceForward, options)
            m.quoted.download = () => cyberkavi.downloadMediaMessage(m.quoted)
        }
    }
    if (m.msg.url) m.download = () => cyberkavi.downloadMediaMessage(m.msg)
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? cyberkavi.sendMedia(chatId, text, 'file', '', m, { ...options }) : cyberkavi.sendText(chatId, text, m, { ...options })
    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => cyberkavi.copyNForward(jid, m, forceForward, options)

    return m
};

process.on('uncaughtException', function (err) {
    let e = String(err)
    if (e.includes("conflict")) return
    if (e.includes("Cannot derive from empty media key")) return
    if (e.includes("Socket connection timeout")) return
    if (e.includes("not-authorized")) return
    if (e.includes("already-exists")) return
    if (e.includes("rate-overlimit")) return
    if (e.includes("Connection Closed")) return
    if (e.includes("Timed Out")) return
    if (e.includes("Value not found")) return
});