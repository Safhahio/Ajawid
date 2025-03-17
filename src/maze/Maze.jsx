import MazeProvider from "../providers/maze-game";
import MazeGame from "../components/MazeGame";

function Maze() {
  return (
    <MazeProvider>
      <MazeGame />
    </MazeProvider>
  );
}

export default Maze;
