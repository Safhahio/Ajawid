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
  const [movementPath, setMovementPath] = useState([]);

  const addCmd = useCallback((cmd) => {
    const id = Date.now() + Math.random();
    setCommands((current) => [...current, { ...cmd, id, valid: 0, steps: 0 }]);
  }, []);

  const addCmdUp = useCallback(() => {
    addCmd({ dir: "up", display: "Up" });
  }, [addCmd]);

  const addCmdDown = useCallback(() => {
    addCmd({ dir: "down", display: "Down" });
  }, [addCmd]);

  const addCmdRight = useCallback(() => {
    addCmd({ dir: "right", display: "Right" });
  }, [addCmd]);

  const addCmdLeft = useCallback(() => {
    addCmd({ dir: "left", display: "Left" });
  }, [addCmd]);

  const updateCmd = useCallback((opts, idx) => {
    setCommands((prevCmds) =>
      prevCmds.map((cmd, i) => (i === idx ? { ...cmd, ...opts } : cmd)),
    );
  }, []);

  const rmCmd = useCallback((id) => {
    setCommands((current) => current.filter((cmd) => cmd.id !== id));
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
    setMovementPath([]);
    setCommands([]);
  }, [generateMaze, findPosition, mazeSize]);

  const runCommands = useCallback(() => {
    if (commands.length === 0) return;

    const startPos = findPosition(maze, 2);
    setPlayerPosition(startPos);
    setStatus("running");
    setCurrentStep(0);
    setMovementPath([]);
  }, [commands, findPosition, maze]);

  useEffect(() => {
    console.log({ status });
    if (status !== "running") return;

    const timer = setTimeout(() => {
      if (currentStep >= commands.length) {
        setStatus(checkWin() ? "win" : "lose");
        return;
      }

      const result = executeDirection(
        commands[currentStep].dir,
        playerPosition,
      );

      updateCmd(
        {
          valid: result.valid ? 1 : -1,
          steps: result.steps,
        },
        currentStep,
      );

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
    updateCmd,
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
      resetGame,
      runCommands,
      addCmdUp,
      rmCmd,
      addCmdDown,
      addCmdLeft,
      addCmdRight,
    }),
    [
      maze,
      playerPosition,
      endPosition,
      commands,
      status,
      resetGame,
      runCommands,
      addCmdUp,
      rmCmd,
      addCmdDown,
      addCmdLeft,
      addCmdRight,
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
