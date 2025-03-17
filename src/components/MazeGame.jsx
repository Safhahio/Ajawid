import MazeCommands from "./MazeCommands";
import MazeControls from "./MazeControls";
import MazeDisplay from "./MazeDisplay";

const MazeGame = () => {
  return (
    <div className="flex flex-col items-center p-4 max-w-2xl mx-auto">
      <MazeCommands />
      <MazeControls />
      <MazeDisplay />
    </div>
  );
};

export default MazeGame;
