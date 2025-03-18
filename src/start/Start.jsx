import React from "react";
import { Link } from "react-router-dom";

function Start() {
  return (
    <div dir="rtl" className="flex flex-col gap-4 items-center justify-center min-h-dvh">
      <h1 className="font-bold text-2xl">مرحبا 👋 ادخل اسمك وعمرك للبدء!</h1>
      <Link to="/play/maze">start maze</Link>
    </div>
  );
}

export default Start;
