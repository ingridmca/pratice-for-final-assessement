import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spaces: [],
  spaceDetails: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    dataFetched: (state, action) => {
      // console.log the action to see what data is coming from the thunk
      //console.log("postsFetched action", action.payload);
      state.spaces = [...action.payload]; // get our list of posts from the action payload
      // console.log(state.spaces);
    },
    getStoriesOfSpace: (state, action) => {
      //console.log("postsFetched action", action.payload);
      state.spaceDetails = { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
// as we add cases to our reducer we will also export the corresponding actions
export const { dataFetched, getStoriesOfSpace } = dataSlice.actions;

export default dataSlice.reducer;
