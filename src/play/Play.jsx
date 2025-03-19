import { Crown, Medal, Award, Trophy, RotateCcw, Trash2 } from "lucide-react";
import React from "react";
import { useMaze } from "../providers/maze-game";
import clsx from "clsx";

function Play() {
  const { score, stopwatch } = useMaze();
  const { getAllUsersSorted, currentUser } = score;
  const users = getAllUsersSorted();

  const topPositionIcons = [
    <Trophy className="text-warning" size={24} />,
    <Medal className="text-info" size={24} />,
    <Award className="text-danger" size={24} />,
  ];

  return (
    <div dir="rtl" className="flex flex-col gap-4">
      <h1 className="py-4 flex flex-col items-center gap-4 justify-center text-4xl font-bold">
        <Crown size={64} />
        <span>لوحة النتائج </span>
      </h1>
      <div className="min-h-64 bg-light rounded-lg shadow-md overflow-y-scroll max-h-[65vh] w-full">
        <div className="bg-accent text-light py-2 px-4 font-bold text-lg">
          <div className="grid grid-cols-3 items-center">
            <span>المركز</span>
            <span className="text-center">الاسم</span>
            <span className="text-left">النقاط</span>
          </div>
        </div>
        <div className="divide-y divide-accent/25">
          {users.map((user, index) => (
            <div
              key={index}
              className={clsx({
                "py-3 px-4 grid grid-cols-3 items-center": true,
                "bg-accent/25": user.name === currentUser.name,
              })}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold">{index + 1}</span>
                {index < 3 && topPositionIcons[index]}
              </div>
              <span className="font-medium text-center">{user.name}</span>
              <span className="font-bold text-left">
                {stopwatch.formatTime(user.score)}
              </span>
            </div>
          ))}
          {users.length === 0 && (
            <div className="py-8 text-center text-accent/50">
              <p>لا توجد نتائج حتى الآن</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-stretch">
        <button onClick={score.restart} className="flex-1 flex items-center gap-4 warning">
          <RotateCcw />
          <span>العب مرة اخرى </span>
        </button>
        <button onClick={score.reset} className="flex-1 flex items-center gap-4 danger">
          <Trash2 />
          <span>احذف النتائج</span>
        </button>
      </div>
    </div>
  );
}

export default Play;
