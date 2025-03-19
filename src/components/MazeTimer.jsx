import { useMaze } from "../providers/maze-game";

const MazeTimer = () => {
  const { stopwatch } = useMaze();

  return (
    <div className="flex p-4 max-h-96 overflow-y-scroll flex-col gap-2 text-center text-7xl font-mono">
      {stopwatch.timeFormatted()}
    </div>
  );
};

export default MazeTimer;
