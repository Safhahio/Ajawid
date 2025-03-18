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
import useStopWatch from "../hooks/useStopWatch";

const MazeContext = createContext(null);

const MazeProvider = ({ children }) => {
  const mazeSize = useMemo(() => ({ width: 13, height: 9 }), []);
  const stopwatch = useStopWatch();
  const defaultCmd = useMemo(() => ({ valid: 0, steps: 0 }), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(stopwatch.start, []);

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

  const isRunning = status === "running";

  const addCmd = useCallback(
    (cmd) => {
      if (commands.length && commands[commands.length - 1].dir === cmd.dir)
        return;
      const id = Date.now() + Math.random();
      setCommands((current) => [...current, { ...cmd, id, ...defaultCmd }]);
    },
    [commands, defaultCmd],
  );

  const addCmdUp = useCallback(() => {
    addCmd({ dir: "up", display: "استدر للأعلى" });
  }, [addCmd]);

  const addCmdDown = useCallback(() => {
    addCmd({ dir: "down", display: "استدر للأسفل" });
  }, [addCmd]);

  const addCmdRight = useCallback(() => {
    addCmd({ dir: "right", display: "استدر لليمين" });
  }, [addCmd]);

  const addCmdLeft = useCallback(() => {
    addCmd({ dir: "left", display: "استدر لليسار" });
  }, [addCmd]);

  const updateCmd = useCallback((opts, idx) => {
    setCommands((prevCmds) =>
      prevCmds.map((cmd, i) => (i === idx ? { ...cmd, ...opts } : cmd)),
    );
  }, []);

  const rmCmd = useCallback(
    (id) => {
      if (isRunning) return;
      setCommands((current) => current.filter((cmd) => cmd.id !== id));
    },
    [isRunning],
  );

  const { executeDirection, checkWin } = useMazeMovement(
    maze,
    playerPosition,
    endPosition,
  );

  const resetGame = useCallback(() => {
    const newMaze = generateMaze(mazeSize.width, mazeSize.height);
    setMaze(newMaze);
    stopwatch.reset();
    stopwatch.start();

    const newPlayerPos = findPosition(newMaze, 2);
    const newEndPos = findPosition(newMaze, 3);

    setPlayerPosition(newPlayerPos);
    setEndPosition(newEndPos);
    setStatus("idle");
    setCurrentStep(0);
    setMovementPath([]);
    setCommands([]);
  }, [generateMaze, mazeSize.width, mazeSize.height, stopwatch, findPosition]);

  const runCommands = useCallback(() => {
    if (commands.length === 0) return;
    stopwatch.stop();

    setCommands((current) => current.map((cmd) => ({ ...cmd, ...defaultCmd })));

    const startPos = findPosition(maze, 2);
    setPlayerPosition(startPos);
    setStatus("running");
    setCurrentStep(0);
    setMovementPath([]);
  }, [commands.length, findPosition, maze, stopwatch]);

  useEffect(() => {
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
      isRunning,
      resetGame,
      runCommands,
      addCmdUp,
      rmCmd,
      addCmdDown,
      addCmdLeft,
      addCmdRight,
      stopwatch,
    }),
    [
      maze,
      playerPosition,
      endPosition,
      commands,
      status,
      isRunning,
      resetGame,
      runCommands,
      addCmdUp,
      rmCmd,
      addCmdDown,
      addCmdLeft,
      addCmdRight,
      stopwatch,
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
