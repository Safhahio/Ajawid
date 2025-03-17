import { useMaze } from "../providers/maze-game";

const MazeDisplay = () => {
  const { maze, playerPosition } = useMaze();

  return (
    <div className="border border-gray-300 rounded p-4 mb-4">
      {maze.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                w-8 h-8 flex items-center justify-center bg-white"
                ${cell === 1 ? "bg-gray-800" : "bg-white"}
              `}
            >
              {playerPosition.x === x && playerPosition.y === y ? (
                <div className="w-6 h-6 rounded-full bg-blue-500" />
              ) : cell === 2 ? (
                <div className="w-6 h-6 rounded-full bg-gray-300" />
              ) : cell === 3 ? (
                <div className="w-6 h-6 rounded-full bg-red-500" />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MazeDisplay;
