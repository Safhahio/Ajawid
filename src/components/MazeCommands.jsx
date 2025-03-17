import { useMaze } from "../providers/maze-game";

const MazeCommands = () => {
  const { commands } = useMaze();

  return (
    <div className="w-full mb-4">
      {commands.map((cmd, i) => (
        <p
          key={i}
        >{`${cmd.display}, ${cmd.valid === -1 ? "not valid" : cmd.valid === 1 ? "valid" : "none"}, ${cmd.steps}`}</p>
      ))}
    </div>
  );
};

export default MazeCommands;
