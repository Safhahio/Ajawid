import MazeCommands from "./MazeCommands";
import MazeDisplay from "./MazeDisplay";
import MazeHistory from "./MazeHistory";

const MazeGame = () => {
  return (
    <div className="flex flex-col items-center p-4 max-w-2xl mx-auto">
      <MazeCommands />
      <MazeDisplay />
      <MazeHistory />
    </div>
  );
};

export default MazeGame;
