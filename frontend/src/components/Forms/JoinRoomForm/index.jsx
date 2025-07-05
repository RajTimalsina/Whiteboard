// JoinRoomForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleJoinRoom = (e) => {
    e.preventDefault();
    const roomData = {
      name: name || "Untitled Room",
      roomId: roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    setUser(roomData);
    console.log("Room Data:", roomData);
    socket.emit("userJoined", roomData);
    navigate(`/${roomId}`);
    console.log("Navigating to room:", roomId);
  };
  return (
    <form
      className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl rounded-xl p-6 w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01]
    "
      onSubmit={handleJoinRoom}
    >
      <div className="mb-5">
        <label
          htmlFor="roomName"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Room Name
        </label>
        <input
          type="text"
          id="roomName"
          placeholder="Enter Room Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition-shadow"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="roomCode"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Room Code
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            id="roomCode"
            type="text"
            placeholder="Enter Room Code"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-0"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md transition-colors duration-200"
      >
        Enter Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
