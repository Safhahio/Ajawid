import { useMaze } from "../providers/maze-game";
import {
  ArrowBigUp,
  ArrowBigDown,
  ArrowBigRight,
  ArrowBigLeft,
  RotateCcw,
  Crown,
} from "lucide-react";

const MazeCommands = () => {
  const {
    commands,
    addCmdUp,
    addCmdDown,
    addCmdRight,
    addCmdLeft,
    isRunning,
    runCommands,
    resetGame,
  } = useMaze();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <button className="info" onClick={resetGame}>
          <Crown />
        </button>
        <button onClick={addCmdUp} disabled={isRunning}>
          <ArrowBigUp />
        </button>
        <button className="warning" onClick={resetGame}>
          <RotateCcw />
        </button>
        <button
          className="col-start-1"
          onClick={addCmdLeft}
          disabled={isRunning}
        >
          <ArrowBigLeft />
        </button>
        <button onClick={addCmdDown} disabled={isRunning}>
          <ArrowBigDown />
        </button>
        <button onClick={addCmdRight} disabled={isRunning}>
          <ArrowBigRight />
        </button>
      </div>
      <div className="w-full flex gap-4 my-4 *:w-full ">
        <button
          className="success"
          onClick={runCommands}
          disabled={isRunning || commands.length === 0}
        >
          ابدء
        </button>
      </div>
    </div>
  );
};

export default MazeCommands;
