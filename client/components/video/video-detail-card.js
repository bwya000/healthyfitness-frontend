import React, { useEffect } from 'react'
import Image from 'next/image'
import line3 from '@/public/images/video_line/line3.png'
import btnArrow from '@/public/images/video_line/btn-arrow.png'
import Link from 'next/link'
import { WhatsappShareButton, LineShareButton, TwitterShareButton } from 'react-share'

const VideoDetailCard = ({ Title, ReleaseDate, Description, classname, muscleName }) => {
  
  const currentRoute = window.location.href;

  return (  
    <>
      <div className="title-detail">
        <p className="p-1">{Title}</p>
        <p className="p-2">釋出日 |{ReleaseDate}</p>
      </div>
      <div className="type-list">
        <ul className="list-unstyled">
          <li>#{classname}</li>
          <li>#{muscleName}</li>
        </ul>
      <div className='share'>
          <button>
            <span>Share</span>
            <div className="container">
              <WhatsappShareButton
                url={currentRoute}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                </WhatsappShareButton>
              <LineShareButton
                url={currentRoute}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-line" viewBox="0 0 16 16">
                  <path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z" />
                </svg>
              </LineShareButton>
              <TwitterShareButton
                url={currentRoute}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
             </TwitterShareButton>
            </div>
          </button>
        </div>
      </div>
      <Image
        className="line3"
        src={line3}
        alt="line3"
        width={600}
        height={0}
        style={{
          position: 'relative',
          top: '8px',
          left: '2px',
        }}
      />
      <div className="vid-desc">
        <p>
          {Description}
        </p>
      </div>

      <div className="btn3" style={{ position: 'relative' }}>
        <a href="/video/videoList" style={{ 'text-decoration': 'none' }}>
          <Image
            className="btn-arrow"
            src={btnArrow}
            alt="btnArrow"
            width={53}
            height={132}
            style={{
              position: 'absolute',
              top: '-65px',
              left: '155px',
            }}
          />
          <div className="view-btn">
            <p>想看更多</p>
          </div>
        </a>
      </div>

      <style jsx>
        {`
          ul li {
            font-size: 18px;
            font-family: 'Noto Sans TC', sans-serif;
            color:#2d3748;
            background-color:#e2e8f0;
            border: 2px solid #e2e8f0;
            border-radius: 50px;
            padding: 7px;
          }

          .list-unstyled {
            display: flex;
            margin: 0px;
            padding: 0px;
            list-style: none;
          }

          .title-detail p {
            font-family: 'Noto Sans TC', sans-serif;
            margin-bottom: -5px;
          }

          .type-list {
            margin-top: 45px;
          }

          .type-list li {
            font-size:20px;
            margin-right: 25px;
          }

          .p-1 {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 30px;
            color: #e25d31;
            letter-spacing: 2px;
          }

          .p-2 {
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 18px;
            color: #676161;
            letter-spacing: 1.5px;
          }

          .view-btn {
            margin-top: 200px;
            width: 230px;
            height: 75px;
            background-color: #e25d31;
            border: transparent;
            border-radius: 26px;
          }
          .view-btn:hover {
            width: 230px;
            height: 75px;
            background-color:  #e25d31;
            border: transparent;
            border-radius: 26px;
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }
          .view-btn p {
            position: relative;
            top: 20px;
            left: 46px;
            font-family: 'Noto Sans TC', sans-serif;
            font-size: 23px;
            letter-spacing: 2.5px;
            color: #ffffff;
          }

          .vid-desc p {
            margin-top:25px;
            font-family: 'Noto Sans TC', sans-serif;
            color: #4f4c4c;
            font-size: 20px;
            letter-spacing: 2px;
          }
          .share {
            margin-top:20px;
          }
          button {
            height: 60px;
            width: 230px;
            border: none;
            border-radius: 40px;
            background-color: #fff;
          }

          button span {
            position:relative;
            left:-5px;
            z-index: 1;
            display: inline-block;
            background-color: #e25d31;
            height:60px;
            width: 227px;
            border-radius: 40px;
            color: #fff;
            line-height: 55px;
            font-size: 20px;
            font-family: 'Noto Sans TC', sans-serif;
            letter-spacing: 3px;
            transition: all 0.5s;
          }

          button .container {
            z-index: -1;
            width: 0;
            position: relative;
            display: flex;
            justify-content: center;
            transform: translateY(-50px);
            transition: all 0.4s;
          }

          button .container svg {
            padding: 0 20px 10px 2px;

          }

          button:hover span {
            width: 0;
          }

          button:hover .container {
            z-index: 2;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}

export default VideoDetailCard
