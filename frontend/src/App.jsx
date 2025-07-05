import "./App.css";
import Forms from "./components/Forms";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import RoomPage from "./pages/Room";
import { io } from "socket.io-client";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      console.log("userIsJoined event received", data);
      if (data.success) {
        console.log("User has joined the room successfully");
      } else {
        console.error("Failed to join the room");
      }
    });
  }, []);
  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <>
      <div className="App min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-blue-50 ">
        <Routes>
          <Route
            path="/"
            element={
              <Forms
                uuid={uuid}
                socket={socket}
                setUser={setUser}
                user={user}
              />
            }
          />
          <Route
            path="/:roomId"
            element={<RoomPage user={user} socket={socket} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
