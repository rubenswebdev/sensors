const config = require('./config');

const amqp = require('amqplib');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let queue;

async function createConnection() {
  const conn = await amqp.connect(config.rabbit);
  const ch = await conn.createChannel();
  return ch;
}

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json({
  limit: '50mb'
}));

app.get('/', function (req, res) {
  res.json({success: true, data: 'API OK'});
});

app.post('/', async (req, res) => {
  console.log('API: Recebendo POST', req.body);
  const envelope = new Buffer(JSON.stringify(req.body));
  await queue.assertQueue('SENSORS', { durable: true });
  const postado = await queue.sendToQueue('SENSORS', envelope, { persistent: true });

  res.json({ success: postado });
});

async function start() {
  queue = await createConnection();
  app.listen(config.port, '0.0.0.0', err => console.log('server listem on', config.port));
}

start();
