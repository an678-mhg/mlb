import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";
import { useSelector } from "react-redux";
import { useSearchParams } from "../hooks/useSearchParams";

const Auth = () => {
  const { currentUser } = useSelector((state) => state.user);

  const searchParams = useSearchParams();

  if (currentUser) {
    return <Navigate to={searchParams.get("redirect") || "/"} />;
  }

  return (
    <div className="flex items-center h-screen container">
      <div className="h-[550px] flex justify-between w-full rounded-lg overflow-hidden">
        <div className="flex-1 bg-[#dff9fb] hidden md:block relative">
          <img
            src="https://images.fpt.shop/unsafe/filters:quality(90)/fptshop.com.vn/uploads/images/tin-tuc/136691/Originals/214943848_2004259286393777_8512557388276275748_n.jpg"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md overflow-hidden">
            <Link
              className="text-center text-lg font-semibold text-blue-500 bg-yellow-200 py-2 px-3 block"
              to="/"
            >
              Trở về trang chủ
            </Link>
          </div>
        </div>
        <div className="flex-1 bg-yellow-200 p-6 flex items-center">
          <Routes>
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Auth;
