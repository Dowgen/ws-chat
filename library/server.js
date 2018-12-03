var broadcast = function(obj){
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(obj));
  });
}

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({ port: 8181 });
wss.on("connection", function(ws, req) {
  const ip = req.connection.remoteAddress.split('ffff')[1].split('.')[3];
  console.log("有个用户连进来了，他是：" + ip);

  ws.on("message", function(message) {
    broadcast({
      time: new Date(),
      name: ip,
      msg: message
    });
  });
  ws.on('close', function close() {
    broadcast({
      time: new Date(),
      name: '服务器',
      msg: ip + '走了，大家欢送ta！'
    });
  });
  /* wss.clients.forEach(function each(client) {
    client.send(JSON.stringify({
      time: new Date(),
      name: '服务器',
      msg: ip + '来了，大家欢迎ta！'
    }));
  }); */
  broadcast({
    time: new Date(),
    name: '服务器',
    msg: ip + '来了，大家欢迎ta！'
  });
});
