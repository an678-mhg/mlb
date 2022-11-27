import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { getUserInfo } from "./api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { addUser, logOut } from "./redux/reducers/userSlice";
import setAuthToken from "./utils/setAuthToken";
import Loading from "./components/Loading/Loading";
import Client from "./pages/Client/Client";
import Auth from "./pages/Auth";
import AdminPage from "./pages/Admin/AdminPage";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { currentUser } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        setAuthToken(localStorage.getItem("token"));
      }

      try {
        const res = await getUserInfo();
        dispatch(addUser(res.data.user));
      } catch (error) {
        dispatch(logOut());
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.search, location.pathname]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  if (typeof currentUser === "undefined") return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/*" element={<Client />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </>
  );
};

export default App;
