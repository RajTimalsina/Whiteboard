import React from "react";

const CreateRoomForm = () => {
  return (
    <form className="bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl rounded-xl p-6 w-full max-w-sm overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
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
        <div className="flex  gap-2">
          <input
            id="roomCode"
            type="text"
            placeholder="Generate Room Code"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 min-w-0"
            readOnly
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-lg transition-colors whitespace-nowrap"
          >
            <p className="text-sm"> Generate</p>
          </button>
          <button
            type="button"
            className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            <p className="text-sm">Copy</p>
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg shadow-md transition-colors duration-200"
      >
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
