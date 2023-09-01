import Link from 'next/link'
import Image from 'next/image'
import btnArrow from '@/public/images/video_line/btn-arrow.png'
import { useRouter } from 'next/router'

export default function MyFooter() {
  const router = useRouter()
  return (
    <>
      <footer className="footer">
        <div className="container footer-container">
          <div className="fitnessRow footer-row">
            <div className="footer-content">
              <p className="footer-title">FITNESS</p>
              <ul className="list">
                <Link
                  href="/"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>首頁</li>
                </Link>
                <Link
                  href="/product"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>商城</li>
                </Link>
                <Link
                  href="/video/videoList"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>影音課程</li>
                </Link>
                <Link
                  href="/record/record-index"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>健康日誌</li>
                </Link>
                <Link
                  href="/disclaimer"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>免責聲明</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="purchaseRow footer-row">
            <div className="footer-content">
              <p className="footer-title">購物須知</p>
              <ul className="list">
                <Link
                  href="#"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>付款方式</li>
                </Link>
                <Link
                  href="#"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>貨運方式</li>
                </Link>
                <Link
                  href="#"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>退貨須知</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="followRow footer-row">
            <div className="footer-content">
              <p className="footer-title">追蹤我們</p>
              <ul className="list">
                <Link
                  href="#"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>FACEBOOK</li>
                </Link>
                <Link
                  href="#"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>INSTAGRAM</li>
                </Link>
                <Link
                  href="#"
                  style={{ textDecoration: 'none' }}
                  className="li-style"
                >
                  <li>TWITTER</li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
        <button
          className="sub-btn"
          onClick={() => {
            router.push('http://localhost:3000/video/video-subscribe')
          }}
        >
          <p>立即訂閱</p>
          <Image
            className="btn-arrow"
            src={btnArrow}
            alt="btnArrow"
            width={48}
            height={100}
            style={{
              position: 'relative',
              top: '-50px',
              left: '55px',
            }}
          />
        </button>
      </footer>
      <div className="copyright">
        <p>Copyright ©2023 HealthyFitness All Rights Reserved.</p>
      </div>
      <style jsx>
        {`
          .footer {
            background-color: #414141;
          }

          .list {
            list-style: none;
          }

          .footer-container {
            position: relative;
            top: 40px;
            left: -200px;
            display: flex;
            justify-content: space-between;
          }

          .sub-btn {
            width: 200px;
            height: 70px;
          }

          .sub-btn P {
            padding-left: 45px;
            margin-top: -40px;
          }
          .footer-row {
            flex: 1;
          }

          .footer-title {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 25px;
          }

          .sub-btn p {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 20px;
            position: relative;
            top: 60px;
            left: -40px;
          }

          .footer-content {
            display: flex;
            flex-direction: column;
          }
          .list {
            display: flex;
            flex-direction: column;
            padding-left: 0px;
          }

          ul li {
            font-size: 18px;
            font-family: 'Noto Sans TC', sans-serif;
            transition: color 0.3s ease, border-radius 0.3s ease;
          }

          .copyright p {
            font-family: 'Noto Sans TC', sans-serif;
            text-align: center;
            background-color: #414141;
            margin: 0;
            padding: 12px;
            color: #ffff;
            font-size: 13px;
          }
        `}
      </style>
    </>
  )
}
