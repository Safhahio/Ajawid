import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useMazeGenerator from "../hooks/useMazeGenerator";
import useMazeMovement from "../hooks/useMazeMovement";

const MazeContext = createContext(null);

const MazeProvider = ({ children }) => {
  const mazeSize = useMemo(() => ({ width: 13, height: 7 }), []);

  const { generateMaze, findPosition } = useMazeGenerator();

  const [maze, setMaze] = useState(() =>
    generateMaze(mazeSize.width, mazeSize.height),
  );
  const [playerPosition, setPlayerPosition] = useState(() =>
    findPosition(maze, 2),
  );
  const [endPosition, setEndPosition] = useState(() => findPosition(maze, 3));
  const [commands, setCommands] = useState([]);
  const [status, setStatus] = useState("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [movementPath, setMovementPath] = useState([]);

  const addCommand = useCallback((cmd) => {
    setCommands((current) => [...current, cmd]);
  }, []);

  const { executeDirection, checkWin } = useMazeMovement(
    maze,
    playerPosition,
    endPosition,
  );

  const resetGame = useCallback(() => {
    const newMaze = generateMaze(mazeSize.width, mazeSize.height);
    setMaze(newMaze);

    const newPlayerPos = findPosition(newMaze, 2);
    const newEndPos = findPosition(newMaze, 3);

    setPlayerPosition(newPlayerPos);
    setEndPosition(newEndPos);
    setStatus("idle");
    setCurrentStep(0);
    setHistory([]);
    setMovementPath([]);
    setCommands([]);
  }, [generateMaze, findPosition, mazeSize]);

  const runCommands = useCallback(() => {
    if (commands.length === 0) return;

    const startPos = findPosition(maze, 2);
    setPlayerPosition(startPos);
    setStatus("running");
    setCurrentStep(0);
    setHistory([]);
    setMovementPath([]);
  }, [commands, findPosition, maze]);

  useEffect(() => {
    console.log({status})
    if (status !== "running") return;

    const timer = setTimeout(() => {
      if (currentStep >= commands.length) {
        setStatus(checkWin() ? "win" : "lose");
        return;
      }

      const result = executeDirection(commands[currentStep], playerPosition);

      setHistory((prev) => [
        ...prev,
        {
          command: commands[currentStep],
          valid: result.valid,
          steps: result.steps,
        },
      ]);

      if (result.valid) {
        setMovementPath(result.path);
        // setPlayerPosition(result.position);
      }

      setCurrentStep((prev) => prev + 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    status,
    currentStep,
    commands,
    playerPosition,
    executeDirection,
    checkWin,
  ]);

  useEffect(() => {
    if (movementPath.length <= 1) return;

    let stepIndex = 1;

    const animationTimer = setInterval(() => {
      if (stepIndex >= movementPath.length) {
        clearInterval(animationTimer);
        setMovementPath([]);
        return;
      }

      setPlayerPosition(movementPath[stepIndex]);
      stepIndex++;
    }, 150);

    return () => clearInterval(animationTimer);
  }, [movementPath]);

  const contextValue = useMemo(
    () => ({
      maze,
      playerPosition,
      endPosition,
      commands,
      status,
      history,
      resetGame,
      runCommands,
      addCommand,
    }),
    [
      addCommand,
      maze,
      playerPosition,
      endPosition,
      commands,
      status,
      history,
      resetGame,
      runCommands,
    ],
  );

  return (
    <MazeContext.Provider value={contextValue}>{children}</MazeContext.Provider>
  );
};

export default MazeProvider;

export const useMaze = () => {
  const context = useContext(MazeContext);
  if (!context) {
    throw new Error("useMaze must be used within a MazeProvider");
  }
  return context;
};
