import "./App.css";
import Forms from "./components/Forms";
import { Route, Routes } from "react-router-dom";
import React from "react";
import RoomPage from "./pages/Room";

const App = () => {
  return (
    <>
      <div className="App min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-blue-50 ">
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/:roomId" element={<RoomPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
