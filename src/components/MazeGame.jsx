import clsx from "clsx";
import { useMaze } from "../providers/maze-game";
import MazeCommands from "./MazeCommands";
import MazeControls from "./MazeControls";
import MazeDisplay from "./MazeDisplay";
import MazeTimer from "./MazeTimer";
import { User, X } from "lucide-react";

const MazeGame = () => {
  const { isRunning, stopGame, score } = useMaze();

  return (
    <div>
      <h1
        dir="rtl"
        className="flex items-center justify-center gap-4 py-4 font-bold text-2xl"
      >
        <User size={32} />
        <span>{score.currentUser.name}</span>
      </h1>
      <div className="flex gap-4">
        <MazeCommands />
        <div className="flex-1 flex gap-4 flex-col">
          <MazeDisplay />
          <MazeTimer />
          <MazeControls />
        </div>
      </div>
      <div
        className={clsx({
          "fixed z-0 w-full h-full inset-0 transition-all duration-700": true,
          "bg-black/50 backdrop-blur-md": isRunning,
          "pointer-events-none": !isRunning,
        })}
      >
        <div
          className={clsx({
            "opacity-0 fixed top-4 right-4 z-20 transition-all duration-700": true,
            "opacity-100": isRunning,
          })}
        >
          <button className="sm" disabled={!isRunning} onClick={stopGame}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MazeGame;
