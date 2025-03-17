import { useMaze } from "../providers/maze-game";

const MazeCommands = () => {
  const { commands, addCommand, status, runCommands, resetGame } = useMaze();

  return (
    <div className="w-full mb-4">
      {commands.map((cmd, i) => (
        <p key={i}>{cmd}</p>
      ))}
      <div className="flex justify-between mt-2">
        <button onClick={() => addCommand("up")}>^</button>
        <button onClick={() => addCommand("right")}>&gt;</button>
        <button onClick={() => addCommand("left")}>&lt;</button>
        <button onClick={() => addCommand("down")}>v</button>
        <button onClick={runCommands} disabled={status === "running"}>
          Start
        </button>
        <button onClick={resetGame}>New Maze</button>
      </div>
    </div>
  );
};

export default MazeCommands;
