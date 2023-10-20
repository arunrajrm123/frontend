import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  name: "",
  course: "",
};

const CourseSlice = createSlice({
  name: "catogery",
  initialState: {
    value: INITITALSTATE,
  },
  reducers: {
    changeName: (state, action) => {
      state.value.name = action.payload;
    },
    changeCatogery: (state, action) => {
      state.value.catogery = action.payload;
    },
  },
});

export const { changeName, changeCatogery } = CourseSlice.actions;

export default CourseSlice.reducer;
