import React from 'react'
import VideoDetail from '@/components/videoDetail'

const VideoDetailPage = () => {
  return (
    <div>
      <VideoDetail />
    </div>
  )
}

export default VideoDetailPage

// 在 Next.js 中，使用動態路由（Dynamic Routing）可以讓你創建具有動態路徑的頁面。當你在 pages 目錄下創建了一個檔案名稱包含方括號 [...] 的檔案，Next.js 會將方括號內的名稱視為路由參數（Route Parameter），這表示該部分 URL 可以動態改變，並會被捕捉為相應的路由參數。

// 在你的情況中，你創建了一個名為 [pid].js 的檔案，這意味著它是一個動態路由的頁面，[pid] 是一個路由參數，代表商品ID。

// 當你輸入 http://localhost:3000/productCard/2 這個 URL 時，Next.js 會解析該 URL，並將 2 視為 pid 的值，然後將你導向 [pid].js 這個檔案。因為你已經在 pages/productCard/[pid].js 中創建了相對應的動態路由頁面，所以 Next.js 知道這個 URL 應該對應到 [pid].js，並且會根據 pid 的值來動態渲染商品細節頁面。

// 這種方式讓你可以在一個檔案中創建一個通用的商品細節頁面，而不需要為每個商品都創建一個獨立的頁面。這樣的設計讓你的應用程式更具擴展性和可維護性，並且可以更輕鬆地處理不同商品的顯示需求。
