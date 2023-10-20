import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  blockactive: null,
  searchvalue: "",
};

const adminHomeSlice = createSlice({
  name: "adminhome",
  initialState: {
    value: INITITALSTATE,
  },
  reducers: {
    changeBlockstate: (state, action) => {
      state.value.blockactive = action.payload;
    },
    changeSearch: (state, action) => {
      state.value.searchvalue = action.payload;
    },
  },
});

export const { changestatBlock, changeSearch } = adminHomeSlice.actions;

export default adminHomeSlice.reducer;
