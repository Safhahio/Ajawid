import clsx from "clsx";
import { useMaze } from "../providers/maze-game";
import MazeCommands from "./MazeCommands";
import MazeControls from "./MazeControls";
import MazeDisplay from "./MazeDisplay";

const MazeGame = () => {
  const { status } = useMaze();
  const isRunning = status === "running";

  return (
    <>
      <div className="flex flex-col items-center gap-4 relative z-10">
        <MazeDisplay />
        <MazeControls />
        <MazeCommands />
      </div>
      <div
        className={clsx({
          "fixed z-0 pointer-events-none w-full h-full inset-0 transition-all duration-700": true,
          "bg-black/50 backdrop-blur-md ": isRunning,
        })}
      />
    </>
  );
};

export default MazeGame;
