const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://kavi-x-whatsapp-bot-download-server.vercel.app/api/v2/',
  headers: {
    'x-api-key': '4KYk2w09zqoOu45zXioVED3wFUFOU3J0zsEn7abQeGw'
  }
});

module.exports = { apiClient };