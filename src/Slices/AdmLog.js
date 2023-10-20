import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  email: "",
  password: "",
};

const adSlices = createSlice({
  name: "adminlogin",
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

export const { changeEmail, changePassword } = adSlices.actions;

export default adSlices.reducer;
