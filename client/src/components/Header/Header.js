import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { logOut } from "../../redux/reducers/userSlice";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuInfo, setShowMenuInfo] = useState(false);
  const [searchText, setSearchText] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    setShowMenu(false);
    setShowMenuInfo(false);
  }, [location.pathname]);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;
    navigate(`/search?q=${searchText}`);
    setSearchText("");
  };

  return (
    <div className="py-3 bg-[#ffd400] shadow-md">
      <div className="flex justify-between items-center container">
        <div className="block lg:hidden" onClick={() => setShowMenu(true)}>
          <i className="bx bx-menu-alt-left text-[30px]"></i>
        </div>

        <Link to="/" className="text-2xl flex items-center logo">
          <img
            className="w-[100px] aspect-auto"
            src="https://res.cloudinary.com/annnn/image/upload/v1654943393/logo-removebg-preview_lkf7ph.png"
            alt="logo"
          />
        </Link>

        <form
          onSubmit={handleSearch}
          className="w-[300px] hidden items-center rounded-md overflow-hidden h-[40px] lg:flex md:flex"
        >
          <input
            className="w-full h-full py-1 px-3 outline-none flex-1"
            placeholder="Tìm kiếm sản phẩm...."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="px-3 h-full bg-yellow-400 flex items-center justify-center cursor-pointer">
            <i class="text-[20px] text-white bx bx-search-alt-2"></i>
          </div>
        </form>

        <div className="flex items-center relative">
          <NavBar showMenu={showMenu} setShowMenu={setShowMenu} />
          <Link to="/cart" className="relative flex items-center">
            <i className="text-[30px] bx bx-cart-alt"></i>
            <p className="bg-red-600 text-xs w-[15px] h-[15px] text-white flex items-center justify-center rounded-full absolute top-[-6px] right-[0]">
              {cart.length}
            </p>
          </Link>
          {currentUser ? (
            <>
              <div className="flex items-center overflow-hidden ml-6">
                <img
                  onClick={() => setShowMenuInfo(!showMenuInfo)}
                  className="w-[35px] h-[35px] rounded-full object-cover cursor-pointer"
                  src={currentUser.image}
                />
                <button
                  onClick={() => dispatch(logOut())}
                  className="px-2 bg-[#ffbc06] text-white ml-3 flex items-center justify-center rounded-md"
                >
                  <i class="bx bx-log-in text-2xl"></i>
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/auth/login"
              className="ml-6 py-1 px-3 bg-[#ffbc06] text-white rounded-md transition-colors"
            >
              Đăng nhập
            </Link>
          )}

          {showMenuInfo && (
            <div className="absolute bg-white shadow-md p-4 right-0 bottom-[-120px] z-10 transition-all">
              <p className="py-2 px-3 border-b-2">{currentUser?.name}</p>
              <p className="py-2 px-3 border-b-2">{currentUser?.email}</p>
              <Link
                to={`/edit-info/${currentUser._id}`}
                className="py-2 px-3 border-b-2 block"
              >
                Chỉnh sửa hồ sơ
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
