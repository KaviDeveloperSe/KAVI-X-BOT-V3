const express = require('express');
const dotenv = require('dotenv');
require('./settings.js')

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Server is running', status: 'OK' });
});

app.listen(port, () => {
    console.log(`🛰️  Server is running on port ${port}`)
});