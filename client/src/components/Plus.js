import React from "react";
import { Link } from "react-router-dom";

const Plus = () => {
  return (
    <Link
      to="add"
      className="w-[45px] h-[45px] rounded-full bg-[#ffd400] text-white fixed bottom-[10px] right-[12px] flex items-center justify-center z-10"
    >
      <i className="bx bx-plus text-2xl"></i>
    </Link>
  );
};

export default Plus;
