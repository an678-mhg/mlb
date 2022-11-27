import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <div className="container bg-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-[60px] font-semibold my-10">404 !</h1>
        <p className="mb-4 border p-4">Không thể tìm thấy trang này!</p>
        <button
          onClick={() => navigate("/")}
          className="py-1 px-4 bg-[#ffd400] my-4 text-white"
        >
          Trở về trang chủ !
        </button>
      </div>
    </div>
  );
};

export default NotFound;
