const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  currentUser: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      state.currentUser = null;
    },
  },
});

export const { addUser, logOut } = userSlice.actions;

export default userSlice.reducer;
