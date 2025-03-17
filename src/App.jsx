import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Start from "./start/Start";
import Play from "./play/Play";
import Maze from "./maze/Maze";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/play" element={<Play />} />
        <Route path="/play/maze" element={<Maze />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
