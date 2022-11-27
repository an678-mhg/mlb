import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
  totalPageOrder: 0,
  totalOrder: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.order = action.payload;
    },
    setTotalPageOrder: (state, action) => {
      state.totalPageOrder = action.payload;
    },
    setTotalOrder: (state, action) => {
      state.totalOrder = action.payload;
    },
    editOrder: (state, action) => {
      console.log(action.payload);
      const newOrder = state.order.map((p) => {
        if (p._id === action.payload._id) {
          return action.payload;
        }

        return p;
      });
      state.order = newOrder;
    },
  },
});

export const { addOrder, setTotalPageOrder, setTotalOrder, editOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
