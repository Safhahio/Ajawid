import { useMaze } from "../providers/maze-game";

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
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4">
        <button className="col-start-2" onClick={addCmdUp}>
          ^
        </button>
        <button className="col-start-1" onClick={addCmdLeft}>&lt;</button>
        <button onClick={addCmdDown}>v</button>
        <button onClick={addCmdRight}>&gt;</button>
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
