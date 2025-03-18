import { useMaze } from "../providers/maze-game";
import clsx from "clsx";

const MazeDisplay = () => {
  const { maze, playerPosition, status } = useMaze();

  const isRunning = status === "running";

  return (
    <div
      className={clsx({
        "bg-neutral transition-transform origin-top duration-500 my-4 z-40": true,
        "scale-200": isRunning,
      })}
    >
      {maze.map((row, y) => (
        <div key={y} className="flex">
          {row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`
                w-8 h-8 flex items-center justify-center
                ${cell === 1 ? "bg-accent" : ""}
              `}
            >
              {playerPosition.x === x && playerPosition.y === y ? (
                <div className="w-6 h-6 rounded-full bg-info" />
              ) : cell === 2 ? (
                <div className="w-6 h-6 rounded-full bg-neutral" />
              ) : cell === 3 ? (
                <div className="w-6 h-6 rounded-full bg-danger" />
              ) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MazeDisplay;
