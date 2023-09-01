import { createSlice } from '@reduxjs/toolkit'

const initialState = { favProducts: [] }

const favoriteProductSlice = createSlice({
  name: 'favoriteProduct',
  initialState,
  reducers: {
    addFavoriteProduct(state, action) {
      state.favProducts.push(action.payload)
    },
    cleanFavoriteProduct(state, action) {
      state.favProducts = state.favProducts.filter(
        (product) => product.p_id !== action.payload
      )
    },
    //初始化商品加入收藏
    resetfavoriteProductSlice: () => initialState,
  },
})

export const { addFavoriteProduct, cleanFavoriteProduct,resetfavoriteProductSlice } =
  favoriteProductSlice.actions

export default favoriteProductSlice.reducer
