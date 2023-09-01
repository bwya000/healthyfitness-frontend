import { createSlice } from '@reduxjs/toolkit'

const initiaState = {
  shoppingcart: [],
  totalPrice: 0,
  selectedShippingMethod: '711method',
  selectedPaymentMethod: 'LinePay',
  orderNote: '', //抓取訂單備註內容
  receviver_date: {
    name: '',
    phone: '',
  },
  sevenStore: {
    storeNumber: '',
    storeName: '',
  },
  sevenStoreinput: false,
  meowAdress: '',
  orderMenu: {
    //這個數值,是訂單明細,與資料庫的orderID無關
    orderNumber: '',
    orderDate: '',
  },
  videosub_order: {
    shortId: '',
    subday: '',
    memberid: '',
    formattedCurrentDate: '',
    formattedFutureDate: '',
    price: '',
  },
  famousevideo: [],
  newvideo: [],
  hardvideo: [],
  buyvideoCourse: '',
  todaybrowse: [],
  filterbrowse: [],
  productallLength: '',
}

//把計算總額函式拉出來
const countTotalprice = (state) => {
  // 計算總價格
  const totalPrice = state.shoppingcart.reduce((total, item) => {
    const itemTotalPrice = item.productPrice * item.productNum
    return total + itemTotalPrice
  }, 0)

  // 更新總價格
  state.totalPrice = totalPrice
}

//排序演算法..............start
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}
const setfilterbrowse = (state) => {
  state.todaybrowse.sort((a, b) => b.time - a.time)
  const sortedNames = state.todaybrowse.map((item) => item.name)
  const numberArray = sortedNames.map((str) => parseInt(str, 10))
  const remainingNumbers = state.productallLength.filter(
    (num) => !numberArray.includes(num)
  )
  shuffleArray(remainingNumbers)
  const shuffledArray = [...numberArray, ...remainingNumbers]
  state.filterbrowse = shuffledArray
}
//排序演算法..............end

const cartSlice = createSlice({
  name: 'Cart',
  initialState: initiaState,
  reducers: {
    //把商品用物件形式加入array
    setCart(state, action) {
      const newItem = action.payload

      // 檢查購物車是否有相同商品
      const existingItemIndex = state.shoppingcart.findIndex(
        (item) => item.productId === newItem.productId
      )

      if (existingItemIndex !== -1) {
        //如果商品已存在 -> 不做事
      } else {
        // 如果購物車沒有同樣商品,則加入
        state.shoppingcart.push(newItem)
      }
      //計算總額
      countTotalprice(state)
    },
    removeCart(state, action) {
      const productIdToRemove = action.payload

      // 使用 filter 方法過濾要刪除的商品
      state.shoppingcart = state.shoppingcart.filter(
        (item) => item.productId !== productIdToRemove
      )
      //計算總額
      countTotalprice(state)
    },

    //修改商品數量
    fixItemnum(state, action) {
      const { productId, PlusorSubtract } = action.payload

      // 在購物車中查找目標商品的索引
      const itemIndex = state.shoppingcart.findIndex(
        (item) => item.productId === productId
      )

      if (itemIndex !== -1) {
        // 複製目標商品以避免直接修改原始物件
        const updatedItem = { ...state.shoppingcart[itemIndex] }

        // 根據 PlusorSubtract 參數來增減商品數量
        updatedItem.productNum += PlusorSubtract

        // 確保商品數量不小於 1
        updatedItem.productNum = Math.max(updatedItem.productNum, 1)

        // 替換購物車中原有的商品
        state.shoppingcart[itemIndex] = updatedItem
      }
      //計算總額
      countTotalprice(state)
    },
    //首次進入購物車頁面就幫我計算總金額
    calculateTotalPrice(state) {
      //計算總額
      countTotalprice(state)
    },
    // 物流選取
    setSelectedShippingMethod(state, action) {
      state.selectedShippingMethod = action.payload
    },

    // 金流選取
    setSelectedPaymentMethod(state, action) {
      state.selectedPaymentMethod = action.payload
    },

    //抓取訂單備註內容
    setOrderNote: (state, action) => {
      state.orderNote = action.payload
    },
    //把收貨人姓名與電話存入
    setReceiver: (state, action) => {
      state.receviver_date.name = action.payload.name
      state.receviver_date.phone = action.payload.phone
    },
    //把711超商資料存入
    setSeven: (state, action) => {
      state.sevenStore.storeNumber = action.payload.storeNumber
      state.sevenStore.storeName = action.payload.storeName
    },
    //把最新成立的訂單編號與時間加入
    setOrderMenu: (state, action) => {
      state.orderMenu.orderNumber = action.payload.orderNumber
      state.orderMenu.orderDate = action.payload.orderDate
    },
    //把黑貓物流地址存入
    setmeowAdress: (state, action) => {
      state.meowAdress = action.payload
    },
    //把訂閱資料寫入資料庫
    setVideosub_order: (state, action) => {
      state.videosub_order.shortId = action.payload.shortId
      state.videosub_order.subday = action.payload.subday
      state.videosub_order.memberid = action.payload.memberid
      state.videosub_order.formattedCurrentDate =
        action.payload.formattedCurrentDate
      state.videosub_order.formattedFutureDate =
        action.payload.formattedFutureDate
      state.videosub_order.price = action.payload.price
    },
    //初始化所有購物車
    reset: () => initiaState,
    //熱門組合課程
    setfamousevideo: (state, action) => {
      if (state.famousevideo.length < 3) {
        state.famousevideo.push(action.payload)
      }
    },
    //新手組合課程
    setnewvideo: (state, action) => {
      if (state.newvideo.length < 3) {
        state.newvideo.push(action.payload)
      }
    },
    //高強度組合課程
    sethardvideo: (state, action) => {
      if (state.hardvideo.length < 3) {
        state.hardvideo.push(action.payload)
      }
    },
    //重製化每次課程的渲染
    resetCourse: (state, action) => {
      state.famousevideo = []
      state.newvideo = []
      state.hardvideo = []
    },
    setbuyvideoCourse: (state, action) => {
      state.buyvideoCourse = action.payload
    },
    setsevenStoreinput: (state, action) => {
      state.sevenStoreinput = action.payload
    },
    //抓取目前所有商品
    setproductallLength: (state, action) => {
      state.productallLength = action.payload
    },
    //今日瀏覽商品權重
    setTodaybrowse: (state, action) => {
      const { name, time } = action.payload
      const existingProduct = state.todaybrowse.find(
        (item) => item.name === name
      )

      if (existingProduct) {
        existingProduct.time += time
      } else {
        state.todaybrowse.push({ name, time })
      }
      setfilterbrowse(state)
    },
  },
})
export const {
  setCart,
  removeCart,
  fixItemnum,
  calculateTotalPrice,
  setSelectedShippingMethod,
  setSelectedPaymentMethod,
  setOrderNote,
  setReceiver,
  setSeven,
  setOrderMenu,
  reset,
  setmeowAdress,
  setVideosub_order,
  setfamousevideo,
  setnewvideo,
  sethardvideo,
  resetCourse,
  setbuyvideoCourse,
  setsevenStoreinput,
  setTodaybrowse,
  setproductallLength,
} = cartSlice.actions
export default cartSlice.reducer
