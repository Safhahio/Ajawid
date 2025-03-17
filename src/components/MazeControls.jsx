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
    <div className="w-full mb-4">
      <div className="flex justify-between mt-2">
        <button onClick={addCmdUp}>^</button>
        <button onClick={addCmdRight}>&gt;</button>
        <button onClick={addCmdLeft}>&lt;</button>
        <button onClick={addCmdDown}>v</button>
        <button onClick={runCommands} disabled={status === "running"}>
          Start
        </button>
        <button onClick={resetGame}>New Maze</button>
      </div>
    </div>
  );
};

export default MazeCommands;
