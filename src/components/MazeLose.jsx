import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMaze } from "../providers/maze-game";

const MazeLose = () => {
  const { status } = useMaze();

  if (status !== "lose") return;

  return (
    <DotLottieReact
      src="/ball.lottie"
      className="fixed w-4xl h-auto object-contain top-0 left-0 right-0 m-auto z-50 pointer-events-none"
      loop
      autoplay
    />
  );
};

export default MazeLose;
