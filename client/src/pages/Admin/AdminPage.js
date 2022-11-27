import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import DashBoard from "./DashBoard";
import Product from "./Product";
import SideBar from "../../components/SideBar";
import Users from "./Users";
import Oder from "./Oder";
import HeaderAdmin from "../../components/Header/HeaderAdmin";
import { getAllUsers } from "../../api/adminApi";
import {
  addUsers,
  setTotalPageUsers,
  setTotalUsers,
} from "../../redux/reducers/managerUsers";
import { useDispatch } from "react-redux";
import { getProductsApi } from "../../api/ProductApi";
import {
  addProduct,
  setTotalPageProducts,
  setTotalProduct,
} from "../../redux/reducers/productSlice";
import { useSearchParams } from "../../hooks/useSearchParams";
import { getAllOrderApi } from "../../api/orderApi";
import {
  addOrder,
  setTotalOrder,
  setTotalPageOrder,
} from "../../redux/reducers/orderSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllUsers(searchParams.get("page"));
        if (res.data.success) {
          dispatch(addUsers(res.data.users));
          dispatch(setTotalPageUsers(res.data.totalPage));
          dispatch(setTotalUsers(res.data.totalUsers));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchParams.get("page")]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getProductsApi("All", searchParams.get("page"));
        if (res.data.success) {
          dispatch(addProduct(res.data.products));
          dispatch(setTotalPageProducts(res.data.totalPage));
          dispatch(setTotalProduct(res.data.totalProducts));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchParams.get("page")]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllOrderApi(searchParams.get("page"));
        if (res.data.success) {
          dispatch(addOrder(res.data.order));
          dispatch(setTotalOrder(res.data.totalOrder));
          dispatch(setTotalPageOrder(res.data.totalPage));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [searchParams.get("page")]);

  const { currentUser } = useSelector((state) => state.user);
  if (typeof currentUser === "undefined") return <Loading />;
  if (currentUser?.roleId !== "admin") return <Navigate to="/" />;
  if (!currentUser) return <Navigate to="/" />;

  return (
    <div className="flex">
      <SideBar setShowMenu={setShowMenu} showMenu={showMenu} />

      <div className="flex-1 h-[100vh] overflow-auto">
        <HeaderAdmin setShowMenu={setShowMenu} />

        {showMenu && (
          <div
            onClick={() => setShowMenu(false)}
            className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-50 z-10 transition-opacity"
          ></div>
        )}

        <Routes>
          <Route
            path=""
            element={
              <div className="h-[100%] flex items-center justify-center">
                <h1 className="text-xl font-bold text-center">
                  Chào mừng bạn đến trang quản trị của MLB
                </h1>
              </div>
            }
          />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="products/*" element={<Product />} />
          <Route path="users/*" element={<Users />} />
          <Route path="oders/*" element={<Oder />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
