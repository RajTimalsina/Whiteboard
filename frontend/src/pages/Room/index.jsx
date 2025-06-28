import React, { useState } from "react";
import WhiteBoard from "../../components/Whiteboard";

const RoomPage = () => {
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">
        White Board Sharing App{" "}
        <span className="text-sm text-gray-500">
          <p> Room ID: {window.location.pathname.split("/").pop()}</p>
          <p> Users Online: 0</p>
        </span>
      </h1>
      <div className="flex flex-col md:flex-row justify-around items-center gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex gap-1">
            <label htmlFor="pencil" className="mr-2">
              Pencil
            </label>
            <input
              type="radio"
              name="tool"
              value="pencil"
              checked={tool === "pencil"}
              id="pencil"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="line" className="mr-2">
              Line
            </label>
            <input
              type="radio"
              name="tool"
              value="line"
              checked={tool === "line"}
              id="line"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="rectangle" className="mr-2">
              Rectangle
            </label>
            <input
              type="radio"
              name="tool"
              value="rectangle"
              checked={tool === "rectangle"}
              id="rectangle"
              onChange={(e) => setTool(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label htmlFor="colorPicker" className="mr-2">
            Select Color:
          </label>
          <input
            type="color"
            id="color"
            className="h-6 w-6"
            value={color}
            name="color"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Undo
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Redo
          </button>
        </div>

        <div>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center h-[calc(100vh-200px)] ">
        <WhiteBoard />
      </div>
    </div>
  );
};

export default RoomPage;
