const config = require('./config');
const axios = require('axios');

async function start() {
  for (let i = 0; i < 1000000; i++) {
    const sensorData = {
      campo1: i,
      campo2: i + 1,
      campo3: i + 10,
    }

    const resultado = await axios.post(config.api, sensorData);
    console.log('API:', i, resultado.data.success);
  }
}

start();