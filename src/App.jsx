import { Routes, Route } from "react-router-dom";
import Start from "./start/Start";
import Play from "./play/Play";
import Maze from "./maze/Maze";

function App() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 6rem)",
      }}
      className="grid grid-cols-1 lg:grid-cols-12 p-8 gap-8"
    >
      <div className="lg:col-span-3" />
      <div className="lg:col-span-6 w-full max-w-4xl mx-auto">
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
      <div className="lg:col-span-3 flex flex-1 justify-between flex-col items-center gap-24 py-8">
        <div className="flex flex-col gap-24">
          <img className="w-64" src="/logo.png" alt="" />
          <img className="w-64" src="/club.png" alt="" />
        </div>
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-bold">أحد منتجات</p>
          <a
            className="w-64 origin-bottom hover:scale-110 transition-transform"
            href="https://x.com/safhahio/"
            target="_blank"
          >
            <img className="h-full" src="/safhah.svg" alt="Safhah Logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
