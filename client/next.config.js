/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // don't use with `next start` or api route
  //distDir: 'dist',
  reactStrictMode: false,
  images: {
    unoptimized: true,
    domains: ['via.placeholder.com', 'localhost'],
  },
  experimental: {
    appDir: true, //啟用了 Next.js 的實驗性特性 appDir。這個特性允許你在 pages 目錄中創建子目錄來組織你的頁面文件。例如，你可以在 pages 目錄下創建一個名為 admin 的子目錄，並在其中放置與管理後台相關的頁面文件。
  },
  env: {
    DB_HOST: "localhost", //資料庫
    DB_USER: "root", //資料庫使用者
    DB_PASSWORD: "root", //資料庫密碼
    DB_NAME: "healthyfitness", //資料庫database
    NEXTAUTH_SECRET: "codingwithabbas", //這個不重要
    GOOGLE_CLIENT_ID:
      "334029093588-pgmvcipebmgi7rkia2gfbfpl99hmo2mu.apps.googleusercontent.com", //這個就是google api 的 ID , 要填入
    GOOGLE_CLIENT_SECRET: "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", //這個就是google api 的 KEY , 要填入
    // FACEBOOK_CLIENT_ID: "612377184332738",
    // FACEBOOK_CLIENT_SECRET: "d07c55c0c31d2a69b6e7825166d0ae7b",
  },
};

module.exports = nextConfig;