import { useCallback } from "react";

const useMazeMovement = (maze, playerPosition, endPosition) => {
  const executeDirection = useCallback(
    (direction, position) => {
      let newPosition = { ...position };
      let steps = 0;
      let path = [{ ...position }];

      const dx = direction === "right" ? 1 : direction === "left" ? -1 : 0;
      const dy = direction === "down" ? 1 : direction === "up" ? -1 : 0;

      let keepMoving = true;

      while (keepMoving) {
        const nextPosition = {
          x: newPosition.x + dx,
          y: newPosition.y + dy,
        };

        if (
          nextPosition.y < 0 ||
          nextPosition.y >= maze.length ||
          nextPosition.x < 0 ||
          nextPosition.x >= maze[0].length ||
          maze[nextPosition.y][nextPosition.x] === 1
        ) {
          keepMoving = false;
        } else {
          newPosition = { ...nextPosition };
          path.push({ ...newPosition });
          steps++;

          if (maze[newPosition.y][nextPosition.x] === 3) {
            keepMoving = false;
          }
        }
      }

      return { position: newPosition, steps, valid: steps > 0, path };
    },
    [maze],
  );

  const checkWin = useCallback(() => {
    return (
      playerPosition.x === endPosition.x && playerPosition.y === endPosition.y
    );
  }, [playerPosition, endPosition]);

  return { executeDirection, checkWin };
};

export default useMazeMovement;
