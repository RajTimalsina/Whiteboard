import React, { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const WhiteBoard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
}) => {
  const [drawing, setDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);

    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    elements.forEach((element) => {
      const options = {
        stroke: element.stroke || "#000000", // Use stored stroke
        strokeWidth: 1,
        roughness: 0.1,
      };
      if (element.type == "pencil") {
        roughCanvas.linearPath(element.path, options);
      } else if (element.type == "line") {
        const line = roughGenerator.line(
          element.offsetX,
          element.offsetY,
          element.width,
          element.height,
          options
        );

        roughCanvas.draw(line);
      } else if (element.type == "rectangle") {
        const rectangle = roughGenerator.rectangle(
          element.offsetX,
          element.offsetY,
          element.width,
          element.height,
          options
        );

        roughCanvas.draw(rectangle);
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    console.log("Mouse Down at: ", offsetX, offsetY);
    console.log(elements);
    console.log(tool);

    if (tool == "pencil") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool == "line") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    } else if (tool == "rectangle") {
      setElements((prevElements) => [
        ...prevElements,
        {
          type: "rectangle",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    }

    setDrawing(true);
  };
  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    // console.log("Mouse Move at: ", offsetX, offsetY);
    if (drawing) {
      if (tool == "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        setElements((prevElements) => {
          return prevElements.map((ele, index) => {
            if (index === prevElements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          });
        });
      } else if (tool == "line") {
        setElements((prevElements) => {
          return prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          });
        });
      } else if (tool == "rectangle") {
        setElements((prevElements) => {
          return prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              };
            } else {
              return ele;
            }
          });
        });
      }
    }
  };
  const handleMouseUp = (e) => {
    setDrawing(false);
  };

  return (
    <div
      className="bg-white border border-black  rounded-lg overflow-hidden shadow-md h-full w-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WhiteBoard;

/* 

import React, { useEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements }) => {
  const [drawing, setDrawing] = useState(false);

  // Set up canvas context and fixed resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set internal pixel size (for crisp rendering)
    canvas.width = 1200;
    canvas.height = 800;

    ctxRef.current = ctx;
  }, []);

  // Draw all elements whenever they change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const roughCanvas = rough.canvas(canvas);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach((element) => {
      if (element.type === "pencil") {
        roughCanvas.linearPath(element.path, {
          stroke: element.stroke,
          strokeWidth: 2,
        });
      }
    });
  }, [elements]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setElements((prevElements) => [
      ...prevElements,
      {
        type: "pencil",
        path: [[x, y]],
        stroke: "black",
      },
    ]);
    setDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setElements((prevElements) => {
      const newElements = [...prevElements];
      const lastElement = newElements[newElements.length - 1];
      lastElement.path = [...lastElement.path, [x, y]];

      return newElements;
    });
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div className="bg-white border border-black rounded-lg shadow-md overflow-hidden w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default WhiteBoard;

*/
