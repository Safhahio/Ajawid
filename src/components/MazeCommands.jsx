import clsx from "clsx";
import { useMaze } from "../providers/maze-game";

const MazeCommands = () => {
  const { commands, rmCmd } = useMaze();

  return (
    <div className="w-full">
      <h2>Commands</h2>
      <div className="flex flex-col gap-2 [&>*:p-2]">
        {commands.map((cmd, idx) => {
          const isNone = cmd.valid === 0;
          const isValid = cmd.valid === 1;
          const isInvalid = cmd.valid === -1;

          return (
            <button
              className={clsx({
                "w-full text-left": true,
                neutral: isNone,
                success: isValid,
                danger: isInvalid,
              })}
              key={cmd.id}
              onClick={() => rmCmd(cmd.id)}
            >
              <span>{idx + 1}. </span>
              <span>{cmd.display}</span>
              {isValid ? <span> ✓</span> : null}
              {isInvalid ? <span> ✗</span> : null}
              {cmd.steps ? <span> ({cmd.steps} steps)</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MazeCommands;
