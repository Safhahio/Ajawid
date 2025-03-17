import { useCallback } from "react";

const useMazeGenerator = () => {
  const generateMaze = useCallback((width, height) => {
    const maze = Array(height)
      .fill()
      .map(() => Array(width).fill(1));

    const isInBounds = (x, y) => x >= 0 && x < width && y >= 0 && y < height;

    const carvePath = (x, y) => {
      maze[y][x] = 0;

      const directions = [
        [2, 0],
        [0, 2],
        [-2, 0],
        [0, -2],
      ];

      for (let i = directions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [directions[i], directions[j]] = [directions[j], directions[i]];
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (isInBounds(nx, ny) && maze[ny][nx] === 1) {
          maze[y + dy / 2][x + dx / 2] = 0;
          carvePath(nx, ny);
        }
      }
    };

    const startX = 1;
    const startY = 1;
    carvePath(startX, startY);

    maze[startY][startX] = 2;

    let endX, endY;
    let maxDistance = 0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        if (maze[y][x] === 0) {
          const distance = Math.abs(x - startX) + Math.abs(y - startY);
          if (distance > maxDistance) {
            maxDistance = distance;
            endX = x;
            endY = y;
          }
        }
      }
    }

    if (endX && endY) {
      maze[endY][endX] = 3;
    } else {
      maze[height - 2][width - 2] = 3;
    }

    return maze;
  }, []);

  const findPosition = useCallback((maze, cellType) => {
    for (let y = 0; y < maze.length; y++) {
      for (let x = 0; x < maze[y].length; x++) {
        if (maze[y][x] === cellType) {
          return { x, y };
        }
      }
    }
    return { x: 1, y: 1 };
  }, []);

  return { generateMaze, findPosition };
};

export default useMazeGenerator;
