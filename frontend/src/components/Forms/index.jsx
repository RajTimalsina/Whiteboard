// Forms.jsx
import React from "react";
import "./index.css";
import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";

const Forms = ({ uuid, socket, setUser, user }) => {
  console.log("user in form page:", user);
  return (
    <div className="min-h-screen w-full justify-center flex items-center   p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl rounded-2xl overflow-hidden ">
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Room</h1>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>

        <div className="flex flex-col items-center  p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Join Room</h1>
          <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
      </div>
    </div>
  );
};

export default Forms;
