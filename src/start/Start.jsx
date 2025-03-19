import { useNavigate } from "react-router-dom";
import { useScore } from "../providers/score-system";
import { useState } from "react";
import { Crown, Swords } from "lucide-react";

function Start() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const { setCurrentUser, users } = useScore();

  const validName = name !== "";
  const validAge = age !== "";
  const allGood = validName && validAge;

  const handleStart = () => {
    if (!allGood) return;

    setCurrentUser({
      name,
      age,
    });
    navigate("/play/maze/");
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col gap-4 py-8 justify-between h-full max-w-lg mx-auto"
    >
      <div />
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl text-center">
          مرحبا 👋 ادخل اسمك وعمرك للبدء!
        </h1>
        <input
          onInput={(e) => setName(e.target.value)}
          placeholder="الاسم الكامل"
          type="text"
        />
        <select
          onChange={(e) => setAge(e.target.value)}
          defaultValue=""
          name="age"
        >
          <option disabled value="">
            الفئة العمرية
          </option>
          <option value="sm">05-10</option>
          <option value="md">11-15</option>
          <option value="lg">16+</option>
        </select>
        <button disabled={!allGood} className="accent" onClick={handleStart}>
          <Swords />
          ابدء اللعب
        </button>
      </div>
      {users.length > 0 ? (
        <button className="info" onClick={() => navigate("/play/")}>
          <Crown />
          <span>لوحة النتائج </span>
        </button>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Start;
