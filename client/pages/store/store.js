//使用redux
import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import userSlice from './userSlice'
import historySlice from './historySlice'
import favoriteproductSlice from './favoriteproductSlice'
import favoriteVideoSlice from './favoriteVideoSlice'

//狀態持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 使用localStorage
import { combineReducers } from '@reduxjs/toolkit'
import { getDefaultMiddleware } from '@reduxjs/toolkit' //要留,方法還能用,但將被移除

const rootReducer = combineReducers({
  history: historySlice,
  favoriteVideo: favoriteVideoSlice,
  cart: cartSlice,
  user: userSlice,
  favoriteProduct: favoriteproductSlice,
});

const persistConfig = {
  key: 'root', // 存儲
  storage,     // 使用的存儲工具
};



const persistedReducer = persistReducer(persistConfig, rootReducer);
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false, // 禁用序列化檢查(方法將被移除)
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
});

const persistor = persistStore(store); // 創建持久化

export { store, persistor };
