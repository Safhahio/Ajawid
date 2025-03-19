import { Routes, Route } from "react-router-dom";
import Start from "./start/Start";
import Play from "./play/Play";
import Maze from "./maze/Maze";

function App() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/maze" element={<Maze />} />
      </Routes>
      <span
        className="fixed top-2/3 right-1/2 -translate-y-1/2 z-50 left-1/2"
        id="confettiReward"
      />
    </div>
  );
}

export default App;
