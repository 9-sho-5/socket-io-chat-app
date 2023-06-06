/*
const express = require('express');
const http = require('http');
const app = express();
const server = http.Server(app);
*/

const app = require('express')();
const server = require('http').createServer(app);

/*
// Socket.ioをインポート
const socketIo = require('socket.io');
// 初期化
const io = socketIo(server);
*/

const io = require('socket.io')(server);

const PORT = 3000;

// ルーティングの設定。'/' にリクエストがあった場合 src/index.html を返す
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 3000番ポートでHTTPサーバーを起動
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

// クライアントとのコネクションが確立したら'connected'という表示させる
io.on('connection', (socket) => {
    console.log('user connected');
  
    // 'sendMessage' というイベント名で受信できる
    // 第一引数には受信したメッセージが入り、ログに出力する
    socket.on('sendMessage', (message) => {
      console.log('Message has been sent: ', message);
      // 'receiveMessage' というイベントを発火、受信したメッセージを全てのクライアントに対して送信する
        io.emit('receiveMessage', message);
    });
});
