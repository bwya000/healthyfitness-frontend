// jwt middleware
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser' // 導入cookie-parser,去解析cookie

export default function authenticateToken(req, res, next) {
  // 使用cookie-parser解析cookie
  cookieParser()(req, res, () => {
    const token = req.cookies.OutSiteJWT // 抓取名為OutSiteJWT的cookie
    if (!token) {
      //如果使用者沒有登入,也就是token空字串
      return res.status(401).json({ message: '未授權的訪問' })
    }
    //如果token有值,開始驗證
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: '驗證失敗' })
      }

      req.user = user // 將使用者存入req，以便後續的路由使用
      next() // 驗證通過，繼續執行下一個 Middleware 或路由處理
    })
  })
}
