import { useEffect } from 'react'
import '@/styles/globals.css'
import DefaultLayout from '@/components/layout/default-layout'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SessionProvider } from 'next-auth/react'

//使用context來傳date資料
import DateProvider from '../context/date'

//使用redux
import { Provider } from 'react-redux'
//使用redux-persist,創建持久化倉儲
import { PersistGate } from 'redux-persist/integration/react'
//使用store
import { store, persistor } from './store/store'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`(或components/layout/default-layout.js)
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <SessionProvider>
      <DateProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {getLayout(<Component {...pageProps} />)}
          </PersistGate>
        </Provider>
      </DateProvider>
    </SessionProvider>
  )
}
