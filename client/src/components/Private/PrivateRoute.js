import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) return toast.error("Cần đăng để đến trang này!");
  }, []);

  if (!currentUser)
    return (
      <Navigate
        to={`/auth/login?redirect=${encodeURIComponent(location.pathname)}`}
      />
    );

  return <>{children}</>;
};

export default PrivateRoute;
