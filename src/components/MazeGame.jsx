import MazeCommands from "./MazeCommands";
import MazeControls from "./MazeControls";
import MazeDisplay from "./MazeDisplay";

const MazeGame = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <MazeDisplay />
      <MazeControls />
      <MazeCommands />
    </div>
  );
};

export default MazeGame;
