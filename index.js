const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
const { File } = require('megajs');
const fs = require('fs');

dotenv.config();
require('./server.js');
require('./settings.js');

let p;

async function genSession(retries = 3) {
   if (!sessionID) {
      console.log('❌ Please add your session to SESSION_ID env !!');
      process.exit(1);
   }

   const sessdata = sessionID.replace("KAVI-X-SESSION-ID~", '');
   const megaFullUrl = sessdata.includes('https://mega.nz/') ? sessdata : `https://mega.nz/file/${sessdata}`;

   for (let attempt = 1; attempt <= retries; attempt++) {
      try {
         const file = File.fromURL(megaFullUrl);

         await new Promise((resolve, reject) => {
            file.loadAttributes((err) => {
               if (err) {
                  console.error('❌ Failed to load file attributes.');
                  reject(err);
                  return;
               }

               console.log('✅ File attributes loaded. Starting download...');

               const sessionsDir = path.join(__dirname, 'session');

               if (fs.existsSync(sessionsDir)) {
                  fs.rmSync(sessionsDir, { recursive: true, force: true });
                  console.log('🗑️  Existing session folder removed.');
               }

               fs.mkdirSync(sessionsDir, { recursive: true });

               const filePath = path.join(sessionsDir, 'creds.json');
               const stream = file.download();

               let dataBuffers = [];
               stream.on('data', chunk => {
                  dataBuffers.push(chunk);
               });
               stream.on('end', () => {
                  fs.writeFile(filePath, Buffer.concat(dataBuffers), (writeErr) => {
                     if (writeErr) {
                        console.log('❌ Failed to write session file.');
                        reject(writeErr);
                        return;
                     }
                     console.log('✅ SESSION DOWNLOADED COMPLETED!');
                     resolve();
                  });
               });
               stream.on('error', (err) => {
                  console.log('❌ Failed to download session file.');
                  reject(err);
               });
            });
         });

         return;
      } catch (error) {
         console.error(`❌ Attempt ${attempt} failed.`);
         if (attempt === retries) {
            console.log('❌ Failed to download session file after multiple attempts.');
            process.exit(1);
         }
         console.log('🔄 Retrying download in 2 seconds...');
         await new Promise(res => setTimeout(res, 2000));
      }
   }
}

function start() {
   let args = [path.join(__dirname, 'main/main.js'), ...process.argv.slice(2)];

   p = spawn(process.argv[0], args, {
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
   })
   .on('message', data => {
      if (data == 'reset') {
         console.log('♻️ Restarting Bot...');
         p.kill();
         start();
      }
   })
   .on('exit', code => {
      console.error('Process exited with code:', code);
      if (code === '.' || code === 1 || code === 0) {
         start();
      }
   });
}

function restartBot() {
   if (p) {
      p.kill();
      start();
   }
}

(async () => {
   await genSession();
   start();
   if (typeof restart !== 'undefined' && restart) {
      setInterval(restartBot, 2 * 60 * 60 * 1000);
   }
})();
