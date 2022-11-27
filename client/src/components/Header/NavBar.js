import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = ({ showMenu, setShowMenu }) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ul
      className={`transition-all mr-6 lg:flex lg:static lg:bg-transparent lg:w-auto py-4 lg:py-0 items-center fixed bg-white ${
        showMenu ? "left-0" : "left-[-100%]"
      } w-[320px] max-w-full bottom-0 top-0 z-10`}
    >
      <div
        className="p-2 w-[40px] lg:hidden"
        onClick={() => setShowMenu(false)}
      >
        <i className="bx bx-left-arrow-alt text-[30px]"></i>
      </div>
      <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
        <NavLink
          className="p-2 rounded-lg block lg:inline-block"
          to="/"
          activeclassname="active-home"
        >
          Trang chủ
        </NavLink>
      </li>
      <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
        <NavLink
          className="p-2 rounded-lg block lg:inline-block"
          to="/product?page=1"
          activeclassname="active-home"
        >
          Sản phẩm
        </NavLink>
      </li>
      {currentUser && (
        <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
          <NavLink
            className="p-2 rounded-lg block lg:inline-block"
            to="/order?page=1"
            activeclassname="active-home"
          >
            Đơn hàng
          </NavLink>
        </li>
      )}

      {currentUser?.roleId === "admin" && (
        <li onClick={() => setShowMenu(false)} className="mr-3 p-2 lg:p-0">
          <NavLink
            className="p-2 rounded-lg block lg:inline-block"
            to="/admin"
            activeclassname="active-home"
          >
            Quản trị Admin
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavBar;
