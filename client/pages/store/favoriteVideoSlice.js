// src/pages/store/favoriteVideoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteVideos: [],
};

const favoriteVideoSlice = createSlice({
  name: 'favoriteVideo',
  initialState,
  reducers: {
    addfavoriteVideo: (state, action) => {
      state.favoriteVideos.push(action.payload);
    },
    removeFavoriteVideo: (state, action) => {
      state.favoriteVideos = state.favoriteVideos.filter(video => video.VideoID !== action.payload);
    },
    //初始化影片加入收藏
    resetfavoriteVideoSlice: () => initialState,
  },
});

export const { addfavoriteVideo, removeFavoriteVideo,resetfavoriteVideoSlice } = favoriteVideoSlice.actions;

export default favoriteVideoSlice.reducer;
