import clsx from "clsx";
import { useMaze } from "../providers/maze-game";

const MazeCommands = () => {
  const { commands, isRunning, rmCmd } = useMaze();

  return (
    <div
      dir="rtl"
      className={clsx({
        "bg-light flex-1 py-4 px-2 border-2 border-light-dark rounded-lg transition-transform origin-top-right duration-500 z-40": true,
        "scale-125": isRunning,
      })}
    >
      <h2 className="px-4 font-bold text-lg">الأوامر: </h2>
      {commands.length ? (
        <div className="flex p-2 max-h-[60vh] overflow-y-scroll flex-col gap-2">
          {commands.map((cmd, idx) => {
            const isNone = cmd.valid === 0;
            const isValid = cmd.valid === 1;
            const isInvalid = cmd.valid === -1;

            return (
              <button
                className={clsx({
                  "w-full text-start sm flex": true,
                  neutral: isNone,
                  success: isValid,
                  danger: isInvalid,
                })}
                key={cmd.id}
                onClick={() => rmCmd(cmd.id)}
              >
                <span className="flex-1/12">{idx + 1}. </span>
                <span className="flex-11/12">
                  <span>{cmd.display}</span>
                  {isValid ? <span> ✓</span> : null}
                  {isInvalid ? <span> ✗</span> : null}
                  {cmd.steps ? <span> ({cmd.steps} خطوات)</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <p className="text-md font-semibold opacity-50">
            لا يوجد أوامر، اضغط على الاسهم، لإضافة أوامر
          </p>
        </div>
      )}
    </div>
  );
};

export default MazeCommands;
