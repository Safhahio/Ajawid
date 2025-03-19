import { useEffect } from "react";
import MazeGame from "../components/MazeGame";
import { useMaze } from "../providers/maze-game";
import { useNavigate } from "react-router-dom";

function Maze() {
  const { score } = useMaze();
  const { currentUser } = score;
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser.name) return;

    navigate("/");
  }, [currentUser.name, navigate]);

  return <MazeGame />;
}

export default Maze;
