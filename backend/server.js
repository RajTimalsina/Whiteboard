const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("This is realtime whiteboard sharing app server ");
});
let rooIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, roomId, userId, host, presenter } = data;
    rooIdGlobal = roomId;
    socket.join(roomId);
    socket.emit("userIsJoined", { success: true });
    socket.broadcast.to(roomId).emit("whiteboardDataResponse", {
      imgURL: imgURLGlobal,
    });
  });

  console.log("A user connected");

  socket.on("whiteboardData", (data) => {
    imgURLGlobal = data;
    socket.broadcast.to(rooIdGlobal).emit("whiteboardDataResponse", {
      imgURL: data,
    });
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
