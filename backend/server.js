const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("This is realtime whiteboard sharing app server ");
});

io.on("connection", (socket) => {
  console.log("A user connected");
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
