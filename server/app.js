import createError from 'http-errors'
import express from 'express'
import path from 'path'
import logger from 'morgan'
import cors from 'cors'
// import session from 'express-session'
// 使用檔案的session store，存在sessions資料夾
// import sessionFileStore from 'session-file-store'
// const FileStore = sessionFileStore(session)
import authenticateToken from './middlewares/jwt.js' //把token驗證引入

//把方法import近來
import webSocket from './api/webSocket.js' //websocket用
import http from 'http' //websocket用
import getFoodCard from './api/record/getFoodCard.js'
import getFoodData from './api/record/getFoodData.js'
import getSportCard from './api/record/getSportCard.js'
import getSportTime from './api/record/getSportTime.js'
import getSportCal from './api/record/getSportCal.js'
import getFoodLine from './api/record/getFoodLine.js'
import getBodyRecord from './api/record/getBodyRecord.js'
import getRecordCal from './api/record/getRecordCal.js'
import getSportCalDetail from './api/record/getSportCalDetail.js'
import getBodyForm from './api/record/getBodyForm.js'
import postBodyData from './api/record/postBodyData.js'
import postSportData from './api/record/postSportData.js'
import postFoodData from './api/record/postFoodData.js'
import getproductFeedback from './api/getProductFeedback.js'
import getFeedback from './api/getFeedback.js'
import postFavoriteproduct from './api/postFavoriteproduct.js' //預留
import getVideo from './api/getVedio.js'
import getvedioDetail from './api/getvedioDetail.js'
import getProduct from './api/getProduct.js'
import getproductDetail from './api/getproductDetail.js'
import SevenMapScrape from './api/sevenMapScrape.js'
import getHistory from './api/getHistory.js'
import CreatOrder from './api/cart/creatOrder.js'
import CreatorderDetail from './api/cart/creatorderDetail.js'
import LinePay from './api/cart/pay/linePay.js'
import OrderSub from './api/cart/buyvideo/orderSub.js'
import PostHistory from './api/PostHistory.js'
import FindskuID from './api/cart/findskuID.js'
import favoriteProduct from './api/member/favorite-product.js'
import Login from './api/login.js'
import googleLogin from './api/member/googlelogin.js'
import EditProfile from './api/member/editprofile.js'
import OrderCourse from './api/cart/buyvideo/orderCourse.js'
import LinepaySuccess from './api/cart/pay/linepaySuccess.js'
import PostFavoriteVideo from './api/PostFavoriteVideo.js'
import removeFavoriteVideo from './api/removeFavoriteVideo.js'
import EditPassword from './api/member/editpassword.js'
import Register from './api/register.js'
import Orderlist from './api/cart/orderlist.js'
import cleanFavoriteproduct from './api/cleanFavoriteProduct.js'
import getCommit from './api/getCommit.js'
import getLastTenProducts from './api/getLastTenProducts.js'
import Getmaybe from './api/cart/getmaybe.js'
import getbuyagain from './api/cart/getbuyagain.js'

// 修正 __dirname for esm
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// end 修正 __dirname

// 讓console.log可以呈現檔案與行號
import { extendLog } from './utils/tool.js'
extendLog() // 執行全域套用
// console.log呈現顏色用 全域套用
import 'colors'

// fileStore的選項
// const fileStoreOptions = {}

// import authJwtRouter from './routes/auth-jwt.js'
// import authRouter from './routes/auth.js'
import emailRouter from './routes/email.js'
// import indexRouter from './routes/index.js'
// import productsRouter from './routes/products.js'
import resetPasswordRouter from './routes/reset-password.js'
// import usersRouter from './routes/users.js'
// import { get } from 'https'

const app = express()

//指定跨域請求可以通行的port,與其中的方法
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['HEAD', 'GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

// view engine setup , 一些報錯頁面
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())

// app.use(express.urlencoded({ extended: false }))
// app.use(express.static(path.join(__dirname, 'public')))

// app.use(
//   session({
//     store: new FileStore(fileStoreOptions), // 使用檔案記錄session
//     name: 'SESSION_ID', // cookie名稱，儲存在瀏覽器裡
//     secret: '67f71af4602195de2450faeb6f8856c0', // 安全字串，應用一個高安全字串
//     cookie: {
//       maxAge: 30 * 86400000, // 30 * (24 * 60 * 60 * 1000) = 30 * 86400000 => session保存30天
//       // httpOnly: false,
//       // sameSite: 'none',
//     },
//     resave: false,
//     saveUninitialized: false,
//   })
// )

// app.use('/api/', indexRouter)
// app.use('/api/auth-jwt', authJwtRouter)
// app.use('/api/auth', authRouter)
app.use('/api/email', emailRouter)
// app.use('/api/products', productsRouter)
app.use('/api/reset-password', resetPasswordRouter)
// app.use('/api/users', usersRouter)

//純粹為了token使用者登入搭橋,驗證沒有成功者,阻止一切(for阻止前端頁面)
app.get('/checklogin', authenticateToken, (req, res) => {
  // 驗證成功後,繼續執行
  res.status(200).json({ message: true })
})

//移除收藏
app.use('/api/removeFavoriteVideo', removeFavoriteVideo)
app.use('/api/cleanFavoriteproduct', cleanFavoriteproduct)

//把api用get方法建立路由
app.get('/api/getVedio', getVideo)
app.get('/api/getvedioDetail', getvedioDetail)
app.get('/api/getproductDetail', getproductDetail)
app.get('/api/getHistory', getHistory)
app.get('/api/SevenMapScrape', SevenMapScrape)
app.get('/api/getProduct', getProduct)
app.get('/api/getproductDetail', getproductDetail)
app.get('/api/getproductFeedback', getproductFeedback)
app.get('/api/record/getFoodCard', getFoodCard)
app.get('/api/record/getFoodData', getFoodData)
app.get('/api/record/getSportCard', getSportCard)
app.get('/api/record/getSportTime', getSportTime)
app.get('/api/record/getSportCal', getSportCal)
app.get('/api/record/getFoodLine', getFoodLine)
app.get('/api/record/getBodyRecord', getBodyRecord)
app.get('/api/record/getRecordCal', getRecordCal)
app.get('/api/record/getSportCalDetail', getSportCalDetail)
app.get('/api/record/getBodyForm', getBodyForm)
app.get('/api/getLastTenProducts', getLastTenProducts)

//把api用post方法建立路由
app.post('/api/PostFavoriteVideo', PostFavoriteVideo)
app.post('/api/PostHistory', PostHistory)
app.post('/api/cart/CreatOrder', CreatOrder)
app.post('/api/cart/CreatorderDetail', CreatorderDetail)
app.post('/api/cart/pay/linePay', LinePay)
app.post('/api/cart/buyvideo/orderSub', OrderSub)
app.post('/api/cart/findskuID', FindskuID)
app.post('/api/login', Login)
app.post('/api/register', Register)
app.post('/api/member/editprofile', EditProfile)
app.post('/api/cart/buyvideo/orderCourse', OrderCourse)
app.post('/api/cart/pay/linepaySuccess', LinepaySuccess)
app.post('/api/getFeedback', getFeedback)
app.post('/api/postFavoriteproduct', postFavoriteproduct)
app.post('/api/member/editprofile', EditProfile)
app.post('/api/member/editpassword', EditPassword)
app.post('/api/member/favorite-product',favoriteProduct)
app.post('/api/cart/orderlist', Orderlist)
app.post('/api/record/postBodyData', postBodyData)
app.post('/api/record/postSportData', postSportData)
app.post('/api/record/postFoodData', postFoodData)
app.post('/api/getCommit', getCommit)
app.post('/api/member/googlelogin', googleLogin)
app.post('/api/cart/getmaybe', Getmaybe)
app.post('/api/cart/getbuyagain', getbuyagain)
//websocket伺服器-----------------------------------------------
const server = http.createServer(app)
webSocket(server) // 设置 WebSocket 服务器
server.listen(3001, () => {
  console.log('WebSocket server is listening on port 3001')
})
//websocket伺服器-----------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  // 更改為錯誤訊息預設為JSON格式
  res.status(500).send({ error: err })
})

export default app
