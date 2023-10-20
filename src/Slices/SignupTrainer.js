import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  name: "",
  email: "",
  phone: "",
  password: "",
  experience: "",
  certificate: null,
  catogery: "",
  course: "",
  fee: "",
};

const SignupSliceTrainer = createSlice({
  name: "trainersignup",
  initialState: {
    value: initialstate,
  },
  reducers: {
    resetTrainer: (state) => initialstate,
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
    changeCertificate: (state, action) => {
      state.value.certificate = action.payload;
    },
    changeCatogery: (state, action) => {
      state.value.catogery = action.payload;
    },
    changeCourse: (state, action) => {
      state.value.course = action.payload;
    },
    changeExperience: (state, action) => {
      state.value.experience = action.payload;
    },
    changeImage: (state, action) => {
      state.value.image = action.payload;
    },
    changeCourseFee: (state, action) => {
      state.value.fee = action.payload;
    },
  },
});

export const {
  resetTrainer,
  changeEmail,
  changeName,
  changePassword,
  changePhone,
  changeCertificate,
  changeCatogery,
  changeCourse,
  changeCourseFee,
  changeImage,
  changeExperience,
} = SignupSliceTrainer.actions;
export default SignupSliceTrainer.reducer;
