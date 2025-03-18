import { useNavigate } from "react-router-dom";

function Start() {
  const navigate = useNavigate();

  return (
    <div
      dir="rtl"
      className="flex flex-col gap-4 justify-center min-h-dvh max-w-lg mx-auto"
    >
      <h1 className="font-bold text-2xl text-center">
        مرحبا 👋 ادخل اسمك وعمرك للبدء!
      </h1>
      <input placeholder="الاسم الكامل" type="text" />
      <select defaultValue="" name="age">
        <option disabled value="">
          الفئة العمرية
        </option>
        <option value="sm">05-10</option>
        <option value="md">11-15</option>
        <option value="lg">16+</option>
      </select>
      <button className="accent" onClick={() => navigate("/play/maze")}>
        ابدء
      </button>
    </div>
  );
}

export default Start;
