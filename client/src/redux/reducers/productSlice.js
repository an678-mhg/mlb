const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  products: [],
  totalPage: 0,
  totalProduct: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
    },
    createProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
    },
    deleteProducts: (state, action) => {
      const newListProducts = state.products.filter(
        (p) => p._id !== action.payload
      );
      state.products = newListProducts;
    },
    setTotalPageProducts: (state, action) => {
      state.totalPage = action.payload;
    },
    updateProduct: (state, action) => {
      const newProduct = state.products.map((p) => {
        if (p._id === action.payload._id) {
          return action.payload;
        }

        return p;
      });
      state.products = newProduct;
    },
    setTotalProduct: (state, action) => {
      state.totalProduct = action.payload;
    },
  },
});

export const {
  addProduct,
  createProduct,
  deleteProducts,
  setPage,
  setTotalPageProducts,
  updateProduct,
  setTotalProduct,
} = productSlice.actions;

export default productSlice.reducer;
