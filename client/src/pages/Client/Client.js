import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../../components/Private/PrivateRoute";
import Info from "../Info";
import Search from "../Search";
import Cart from "../Cart";
import Header from "../../components/Header/Header";
import Product from "../Product";
import ProductDetails from "../ProductDetails";
import HomePage from "./HomePage";
import Footer from "../../components/Footer";
import CheckOut from "../CheckOut";
import ThankYou from "../ThankYou";
import Order from "../Order";
import OrderDetails from "../OrderDetails";
import NotFound from "../NotFound";

const Client = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:category" element={<Product />} />
        <Route path="/product/details/:id" element={<ProductDetails />} />
        <Route
          path="/check-out"
          element={
            <PrivateRoute>
              <CheckOut />
            </PrivateRoute>
          }
        />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route
          path="/order"
          element={
            <PrivateRoute>
              <Order />
            </PrivateRoute>
          }
        />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route
          path="/edit-info/:id"
          element={
            <PrivateRoute>
              <Info />
            </PrivateRoute>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default Client;
