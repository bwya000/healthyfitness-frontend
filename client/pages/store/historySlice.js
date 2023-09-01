import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  historyList: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory(state, action) {
      state.historyList.push(action.payload);
    },
    clearHistory(state) {
      state.historyList = [];
    },
    reverseHistory(state) {
      state.historyList.reverse(); // 使用 reverse() 方法反轉數組
    },
    //初始化歷史紀錄
    resethistoryList: () => initialState,
  },
});

export const { addHistory, clearHistory, reverseHistory,resethistoryList } = historySlice.actions;

export default historySlice.reducer;
