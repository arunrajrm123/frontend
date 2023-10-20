import { createSlice } from "@reduxjs/toolkit";

const INITITALSTATE = {
  name: "",
  description: "",
  video: "",
};

const VideoUploadSlice = createSlice({
  name: "video",
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
    changeVideo: (state, action) => {
      state.value.video = action.payload;
    },
  },
});

export const { changeName, changeDescription, changeVideo } =
  VideoUploadSlice.actions;

export default VideoUploadSlice.reducer;
