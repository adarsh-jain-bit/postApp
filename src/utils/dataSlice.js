import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

export const dataSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    allPost: (state, action) => {
      state.data = action.payload;
    },
    updatedPost: (state, action) => {
      state.data = state.data.map((post) =>
        post.url === action.payload.url ? action.payload : post
      );
    },
    deletedPost: (state, action) => {
        state.data = state.data.filter((post) => post.id !== action.payload);
    },
  },
});

export const { allPost, updatedPost, deletedPost } = dataSlice.actions;
export default dataSlice.reducer;
