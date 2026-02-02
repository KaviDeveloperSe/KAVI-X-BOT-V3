const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('../../settings.js');

const dbPath = path.join(__dirname, 'database.json');

const newData = {
  settings: {
    online: false,
    autoread: false,
    autorecord: false,
    autotype: false,
    autoswview: false,
    welcome: false,
    worktype: 'public',
    ntsfw: false,
    autoswlike: false,
    autoreact: false
  },
  auth: {
    ownerNumbers: ["94702128378", "94766577249", "94764891827"]
  },
  users: [],
  forwardJid: [],
};

const databaseSchema = new mongoose.Schema({ data: Object }, { collection: 'kavi_database', versionKey: false });
const DatabaseModel = mongoose.model('Database', databaseSchema);

let isConnected = false;

async function connectDB() {
  if (!isConnected) {
    await mongoose.connect(mongodburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
  }
}

function ensureLocalFile() {
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(newData, null, 2));
  }
}

function loadLocal() {
  ensureLocalFile();
  const raw = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(raw);
}

function saveLocal(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

async function saveMongo(data) {
  await connectDB();
  await DatabaseModel.deleteMany({});
  await new DatabaseModel({ data }).save();
}

async function syncDatabase() {
  await connectDB();
  const mongoEntry = await DatabaseModel.findOne();

  if (mongoEntry && mongoEntry.data) {
    saveLocal(mongoEntry.data);
    return mongoEntry.data;
  } else {
    saveLocal(newData);
    await saveMongo(newData);
    return newData;
  }
}

async function updateDatabase(data) {
  saveLocal(data);
  await saveMongo(data);
}

async function updateSetting(key, value) {
  try {
    const data = loadLocal();
    if (!data.settings) data.settings = {};
    data.settings[key] = value;
    await updateDatabase(data);
    return true;
  } catch (e) {
    return false;
  }
}

function getAllOwnerNumbers() {
  const data = loadLocal();
  return data?.auth?.ownerNumbers || [];
}

async function addOwnerNumber(number) {
  const data = loadLocal();

  if (!data.auth) data.auth = {};
  if (!Array.isArray(data.auth.ownerNumbers)) data.auth.ownerNumbers = [];

  if (!data.auth.ownerNumbers.includes(number)) {
    data.auth.ownerNumbers.push(number);
    await updateDatabase(data);
    return true;
  }

  return false;
}

async function deleteOwnerNumber(number) {
  const data = loadLocal();

  if (!data.auth || !Array.isArray(data.auth.ownerNumbers)) {
    return false;
  }

  const index = data.auth.ownerNumbers.indexOf(number);
  if (index !== -1) {
    data.auth.ownerNumbers.splice(index, 1);
    await updateDatabase(data);
    return true;
  }

  return false;
}

function listForwardJid() {
  try {
    const data = loadLocal();
    return data.forwardJid || [];
  } catch (e) {
    return [];
  }
}

async function addForwardJid(jid) {
  try {
    const data = loadLocal();
    if (!data.forwardJid) data.forwardJid = [];

    if (data.forwardJid.includes(jid)) {
      return "exists";
    }

    data.forwardJid.push(jid);
    await updateDatabase(data);
    return true;
  } catch (e) {
    return false;
  }
}

async function delForwardJid(jid) {
  try {
    const data = loadLocal();
    if (!data.forwardJid || !data.forwardJid.includes(jid)) {
      return "notfound";
    }

    data.forwardJid = data.forwardJid.filter(j => j !== jid);
    await updateDatabase(data);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = { syncDatabase, loadLocal, updateSetting, connectDB, getAllOwnerNumbers, addOwnerNumber, deleteOwnerNumber, listForwardJid, addForwardJid, delForwardJid };