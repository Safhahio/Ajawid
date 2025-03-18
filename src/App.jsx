import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./start/Start";
import Play from "./play/Play";
import Maze from "./maze/Maze";

function App() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/play" element={<Play />} />
          <Route path="/play/maze" element={<Maze />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
