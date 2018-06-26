const socket = io => {
  var sockets = {};

  io.on("connection", function(socket) {
    var id = socket.request._query["id"];
    sockets[id] = socket;
    socket.room = id;
    socket.join(id);
    console.log("CONNECTED SOCKET", id);

    socket.on("disconnect", () => {
      delete sockets[id];
      if (socket.room) {
        socket.leave(socket.room);
      }
    });

    socket.on("sendmessage", msg => {
      if (sockets[id]) {
        //guardar el mensjae en la base de datos
        console.log(msg);
        console.log(id);

        socket.broadcast.to(socket.room).emit("newmessage", msg);
        // sockets[id].emit('newmessage', msg);
      }
    });

    socket.on('test', (meetupId) => {
        socket.room = meetupId;
        socket.join(meetupId);
        console.log("hehe");
    });

    socket.on('sendtoroom', (message) => {
        socket.broadcast.to(socket.room).emit('updateroom', message);
    });
  });
  // var nsp = io.of('/chats');
  // nsp.on('connection', function (socket) {
  //     console.log('someone connected');
  // });
  // nsp.emit('hi', 'everyone!');
};
module.exports = socket;
