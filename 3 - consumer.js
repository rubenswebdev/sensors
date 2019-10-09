const config = require('./config');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const amqp = require('amqplib');

let queue;

async function createConnection() {
  const conn = await amqp.connect(config.rabbit);
  const ch = await conn.createChannel();
  ch.prefetch(1);
  return ch;
}

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

async function consumer(data, queue) {
  const msg = JSON.parse(data.content.toString());
  console.log(msg);
  io.emit('dados', msg);
  queue.ack(data);
}

async function start() {
  const queue = await createConnection();

  await queue.assertQueue('SENSORS', {
    durable: true,
  });

  queue.consume('SENSORS', (data) => consumer(data, queue), {
    noAck: false,
  });
}

start();