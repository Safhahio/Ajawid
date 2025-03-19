import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import useStopWatch from "../hooks/useStopWatch";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const stopwatch = useStopWatch();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({ name: "", age: "" });

  const resetTimer = stopwatch.reset;

  useEffect(resetTimer, [resetTimer, currentUser]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("scoreSystem");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scoreSystem", JSON.stringify(users));
  }, [users]);

  const addUser = useCallback(
    (name, score) => {
      if (users.some((user) => user.name === name)) {
        throw new Error(`User "${name}" already exists`);
      }

      setUsers((current) => [...current, { name, score }]);
    },
    [users],
  );

  const removeUser = useCallback((name) => {
    setUsers((current) => current.filter((user) => user.name !== name));
  }, []);

  const updateScore = useCallback((name, newScore) => {
    setUsers((current) =>
      current.map((user) =>
        user.name === name ? { ...user, score: Number(newScore) } : user,
      ),
    );
  }, []);

  const getUser = useCallback(
    (name) => {
      return users.find((user) => user.name === name);
    },
    [users],
  );

  const getAllUsersSorted = useCallback(() => {
    return [...users].sort((a, b) => b.score - a.score);
  }, [users]);

  const reset = useCallback(() => {
    setUsers([]);
  }, []);

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
