import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import useStopWatch from "../hooks/useStopWatch";
import { useNavigate } from "react-router-dom";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const stopwatch = useStopWatch();
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("scoreSystem");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const navigate = useNavigate();
  const defaultUser = useMemo(() => ({ name: "", age: "" }), []);
  const [currentUser, setCurrentUser] = useState(defaultUser);

  const resetTimer = stopwatch.reset;

  useEffect(resetTimer, [resetTimer, currentUser]);

  const resetUser = useCallback(() => {
    setCurrentUser(defaultUser);
  }, [defaultUser])

  const writeUsers = useCallback(() => {
    localStorage.setItem("scoreSystem", JSON.stringify(users));
  }, [users])

  useEffect(writeUsers, [writeUsers]);

  const addUser = useCallback(
    (name, score) => {
      if (users.some((user) => user.name === name)) return;

      setUsers((current) => [...current, { name, score }]);
    },
    [users],
  );

  const removeUser = useCallback((name) => {
    setUsers((current) => current.filter((user) => user.name !== name));
  }, []);

  const updateScore = useCallback((name, score) => {
    setUsers((current) =>
      current.map((user) => (user.name === name ? { ...user, score } : user)),
    );
  }, []);

  const getUser = useCallback(
    (name) => {
      return users.find((user) => user.name === name);
    },
    [users],
  );

  const getAllUsersSorted = useCallback(() => {
    return [...users].sort((a, b) => a.score - b.score);
  }, [users]);

  const reset = useCallback(() => {
    setUsers([]);
    writeUsers();
  }, [writeUsers]);

  const restart = useCallback(() => {
    resetUser();
    navigate("/");
  }, [resetUser, navigate]);

  const leaderboard = useCallback(() => {
    navigate("/play/");
  }, [navigate]);

  const value = {
    users,
    currentUser,
    setCurrentUser,
    addUser,
    removeUser,
    updateScore,
    getUser,
    getAllUsersSorted,
    reset,
    leaderboard,
    restart,
    stopwatch,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
};

export default ScoreProvider;

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};
