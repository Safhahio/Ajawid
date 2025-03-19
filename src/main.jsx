import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import MazeProvider from "./providers/maze-game";
import ScoreProvider from "./providers/score-system";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScoreProvider>
      <MazeProvider>
        <App />
      </MazeProvider>
    </ScoreProvider>
  </StrictMode>,
);
