import { useMaze } from "../providers/maze-game";
import {
  ArrowBigUp,
  ArrowBigDown,
  ArrowBigRight,
  ArrowBigLeft,
} from "lucide-react";

const MazeCommands = () => {
  const {
    addCmdUp,
    addCmdDown,
    addCmdRight,
    addCmdLeft,
    status,
    runCommands,
    resetGame,
  } = useMaze();

  return (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-3 gap-4">
        <button className="col-start-2" onClick={addCmdUp}>
          <ArrowBigUp />
        </button>
        <button className="col-start-1" onClick={addCmdLeft}>
          <ArrowBigLeft />
        </button>
        <button onClick={addCmdDown}>
          <ArrowBigDown />
        </button>
        <button onClick={addCmdRight}>
          <ArrowBigRight />
        </button>
      </div>
      <div className="w-full flex gap-4 my-4 *:w-full">
        <button onClick={runCommands} disabled={status === "running"}>
          Start
        </button>
        <button onClick={resetGame}>New Maze</button>
      </div>
    </div>
  );
};

export default MazeCommands;
