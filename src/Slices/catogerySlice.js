import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  name: "",
  description: "",
};

const Catoslice = createSlice({
  name: "catogery",
  initialState: {
    value: INITITALSTATE,
  },
  reducers: {
    changeName: (state, action) => {
      state.value.name = action.payload;
    },
    changeDescription: (state, action) => {
      state.value.description = action.payload;
    },
  },
});

export const { changeName, changeDescription } = Catoslice.actions;

export default Catoslice.reducer;
