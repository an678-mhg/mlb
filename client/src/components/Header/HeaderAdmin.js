import React from "react";
import { useSelector } from "react-redux";

const HeaderAdmin = ({ setShowMenu }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex justify-between items-center px-3 py-2 border-b-2">
      <div
        onClick={() => setShowMenu(true)}
        className="flex items-center lg:hidden"
      >
        <i className="text-[30px] bx bx-menu mr-4"></i>
      </div>
      <div className="flex items-center">
        <i className="text-[30px] bx bx-search"></i>
      </div>

      <div className="flex-1 mx-6">
        <input className="w-full p-2 outline-none" placeholder="Search..." />
      </div>
      <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
        <img className="w-full h-full object-cover" src={currentUser.image} />
      </div>
    </div>
  );
};

export default HeaderAdmin;
