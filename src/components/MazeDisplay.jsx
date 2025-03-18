import { useMaze } from "../providers/maze-game";
import clsx from "clsx";

const MazeDisplay = () => {
  const { maze, playerPosition, isRunning } = useMaze();

  return (
    <div className="col-span-2 flex items-center justify-center">
      <div
        className={clsx({
          "bg-light p-4 border-2 border-light-dark rounded-lg transition-transform origin-top-left duration-500 z-40": true,
          "scale-125": isRunning,
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
    </div>
  );
};

export default MazeDisplay;
