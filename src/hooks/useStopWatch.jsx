import { useState, useEffect, useCallback } from "react";

const useStopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [running]);

  const start = useCallback(() => setRunning(true), []);
  const stop = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => {
    setTime(0);
    setRunning(true);
  }, []);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor((time / 60000) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time / 10) % 100);

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  }, []);

  const timeFormatted = useCallback(() => {
    return formatTime(time);
  }, [time, formatTime]);

  return { time, running, start, stop, reset, formatTime, timeFormatted };
};

export default useStopwatch;
