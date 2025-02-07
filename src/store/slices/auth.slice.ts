import { createSlice } from "@reduxjs/toolkit";

interface State {
  user: any;
  loggedIn: boolean;
  blockUi: boolean;
}

const initialState: State = {
  blockUi: true,
  user: null,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.loggedIn = action.payload;
    },
    setBlockUi: (state, action) => {
      state.blockUi = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setBlockUi, setUser } = authSlice.actions;
export default authSlice.reducer;
