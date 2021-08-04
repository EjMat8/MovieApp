import { createSlice } from "@reduxjs/toolkit";

const query = { term: "" };

const querySlice = createSlice({
  name: "query",
  initialState: query,
  reducers: {
    setQuery(state, action) {
      state.term = action.payload;
    },
  },
});

export const queryAction = querySlice.actions;
export default querySlice.reducer;
