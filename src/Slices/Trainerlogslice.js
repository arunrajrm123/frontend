import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  email: "",
  password: "",
};

const trainerloginSlice = createSlice({
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

export const { changeEmail, changePassword } = trainerloginSlice.actions;

export default trainerloginSlice.reducer;
