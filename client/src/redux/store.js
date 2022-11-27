import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import managerUsers from "./reducers/managerUsers";
import orderSlice from "./reducers/orderSlice";
import productSlice from "./reducers/productSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    managerUsers: managerUsers,
    product: productSlice,
    cart: cartSlice,
    order: orderSlice,
  },
});
