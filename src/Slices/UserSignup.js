import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  name: "",
  email: "",
  phone: "",
  password: "",
};

const SignupSliceUser = createSlice({
  name: "usersignup",
  initialState: {
    value: initialstate,
  },
  reducers: {
    resetUser: (state) => initialstate,
    changeName: (state, action) => {
      state.value.name = action.payload;
    },
    changeEmail: (state, action) => {
      state.value.email = action.payload;
    },
    changePhone: (state, action) => {
      state.value.phone = action.payload;
    },
    changePassword: (state, action) => {
      state.value.password = action.payload;
    },
  },
});

export const {
  resetUser,
  changeEmail,
  changeName,
  changePassword,
  changePhone,
} = SignupSliceUser.actions;
export default SignupSliceUser.reducer;
