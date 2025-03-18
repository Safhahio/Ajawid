import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

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
    (name) => {
      if (users.some((user) => user.name === name)) {
        throw new Error(`User "${name}" already exists`);
      }

      setUsers((current) => [...current, { name, score: 0 }]);
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
    addUser,
    removeUser,
    updateScore,
    getUser,
    getAllUsersSorted,
    reset,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
};
