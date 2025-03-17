import { useMaze } from "../providers/maze-game";

const MazeHistory = () => {
  const { history } = useMaze();

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">Command History:</h2>
      <div>
        {history.length === 0 ? (
          <p className="text-gray-500">No commands executed yet</p>
        ) : (
          <ul>
            {history.map((item, index) => (
              <li
                key={index}
                className={`${item.valid ? "text-green-600" : "text-red-600"}`}
              >
                {index + 1}. {item.command}{" "}
                {item.valid ? `✓ (moved ${item.steps} steps)` : "✗"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MazeHistory;
