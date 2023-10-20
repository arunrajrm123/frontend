import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  email: "",
  password: "",
};

const customerloginSlice = createSlice({
  name: "customerlogin",
  initialState: {
    value: INITITALSTATE,
  },
  reducers: {
    changeEmail: (state, action) => {
      state.value.email = action.payload;
    },
    changePassword: (state, action) => {
      state.value.password = action.payload;
    },
  },
});

export const { changeEmail, changePassword } = customerloginSlice.actions;

export default customerloginSlice.reducer;
