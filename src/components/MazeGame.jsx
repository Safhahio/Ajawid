import clsx from "clsx";
import { useMaze } from "../providers/maze-game";
import MazeCommands from "./MazeCommands";
import MazeControls from "./MazeControls";
import MazeDisplay from "./MazeDisplay";
import MazeTimer from "./MazeTimer";

const MazeGame = () => {
  const { isRunning } = useMaze();

  return (
    <div>
      <h1>Player: John</h1>
      <div className="flex gap-4">
        <MazeCommands />
        <div className="flex-1">
          <MazeDisplay />
          <MazeTimer />
          <MazeControls />
        </div>
      </div>
      <div
        className={clsx({
          "fixed z-0 pointer-events-none w-full h-full inset-0 transition-all duration-700": true,
          "bg-black/50 backdrop-blur-md ": isRunning,
        })}
      />
    </div>
  );
};

export default MazeGame;
