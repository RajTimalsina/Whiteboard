import React, { useState, useRef } from "react";
import WhiteBoard from "../../components/Whiteboard";

const RoomPage = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const canvas = canvasRef.current;
  const ctx = ctxRef.current;
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");

  const handleClearCanvas = () => {
    setElements([]);
    setHistory([]);
    setRedoHistory([]);

    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    console.log("Canvas cleared");
  };

  const handleUndo = () => {
    if (elements.length === 0) return;

    const newElements = [...elements];
    const lastElement = newElements.pop();

    setElements(newElements);
    setRedoHistory([...redoHistory, lastElement]);
    // if (newElements.length === 0) {
    //   if (canvas && ctx) {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   }
    //   console.log("Canvas cleared after undo");
    // }
  };
  const handleRedo = () => {
    const newRedoHistory = [...redoHistory];
    const redoElement = newRedoHistory.pop();

    if (redoElement) {
      setElements([...elements, redoElement]);
      setRedoHistory(newRedoHistory);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-6">
        White Board Sharing App{" "}
        <span className="text-sm text-gray-500 block mt-1">
          <p>Room ID: {window.location.pathname.split("/").pop()}</p>
          <p>Users Online: 0</p>
        </span>
      </h1>

      {/* Toolbar */}
      <div className="flex flex-wrap justify-around gap-4 items-center mb-8">
        {/* Tools */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="tool"
              value="pencil"
              checked={tool === "pencil"}
              onChange={(e) => setTool(e.target.value)}
            />
            Pencil
          </label>

          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="tool"
              value="line"
              checked={tool === "line"}
              onChange={(e) => setTool(e.target.value)}
            />
            Line
          </label>

          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="tool"
              value="rectangle"
              checked={tool === "rectangle"}
              onChange={(e) => setTool(e.target.value)}
            />
            Rectangle
          </label>
        </div>

        {/* Color Picker */}
        <div className="flex items-center">
          <label htmlFor="colorPicker" className="mr-2">
            Select Color:
          </label>
          <input
            type="color"
            id="color"
            className="h-6 w-6"
            value={color}
            onChange={(e) => (
              console.log("Selected Color:", e.target.value),
              setColor(e.target.value)
            )}
          />
        </div>

        {/* Undo / Redo */}
        <div className="flex gap-2">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleUndo}
            disabled={elements.length === 0}
          >
            Undo
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleRedo}
            disabled={redoHistory.length === 0}
          >
            Redo
          </button>
        </div>

        {/* Clear Button */}
        <div>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleClearCanvas}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Whiteboard Area */}
      <div className="mt-4 flex justify-center h-[calc(100vh-220px)]">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
        />
      </div>
    </div>
  );
};

export default RoomPage;
