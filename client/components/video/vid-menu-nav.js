import React, { useState } from 'react';
import { FaVideo, FaHatWizard, FaSlidersH, FaClock } from 'react-icons/fa';
import Link from 'next/link';


export default function VidMenuNav() {
  const [selectedMenu, setSelectedMenu] = useState('all'); // 紀錄目前選擇的選單

  const resetFilter = () => {
    setSelectedMenu('all');
  };

  return (
    <>
      <nav>
        <a
          href='/video/videoList'
          onClick={resetFilter} // 點選 "所有課程" 後觸發重置
          className={selectedMenu === 'all' ? 'active' : ''}
        >
          <FaVideo style={{ size: '2xl' }} /> 所有課程
        </a>
        <Link href="/video/multiple-videoList" legacyBehavior>
          <a>
            <FaSlidersH style={{ size: '2xl' }} /> 組合課程
          </a>
        </Link>
        <Link href="/video/videoList-new" legacyBehavior>
          <a>
            <FaHatWizard style={{ size: '2xl' }} /> 最新釋出
          </a>
        </Link>
        <Link href="/video/video-history" legacyBehavior>
          <a>
            <FaClock style={{ size: '2xl' }} /> 觀看紀錄
          </a>
        </Link>
        <div className="animation start-home"></div>
      </nav>

      <style jsx>{`

        nav{
        position: relative;
        margin: 270px 750px 0;
        width: 564px;
        height: 60px;
        background: rgba(180, 180, 180,.3);
        border-radius: 8px;
        font-size: 0;
        box-shadow: 0 2px 3px 0 rgba(0,0,0,.1);
        }
        
        nav a{
          font-size: 17px;
          color: #fff;
          text-decoration: none;
          line-height: 60px;
          position: relative;
          z-index: 1;
          display: inline-block;
          text-align: center;
        }

        nav .animation{
          position: absolute;
          height: 100%;
          top: 0;
          z-index: 0;
          background: #e25d31;
          color:#fff; 
          border-radius: 8px;
          transition: all .5s ease 0s;
        }
        nav a:nth-child(1){
          width: 140px;
        }
        nav .start-home, a:nth-child(1):hover~.animation{
          width: 140px;
          left: 0;
        }
        nav a:nth-child(2){
          width: 140px;
        }
        nav a:nth-child(2):hover~.animation{
          width: 140px;
          left: 140px;
        }
        nav a:nth-child(3){
          width: 140px;
        }
        nav a:nth-child(3):hover~.animation{
          width: 140px;
          left: 280px;
        }
        nav a:nth-child(4){
          width: 140px;
        }
        nav a:nth-child(4):hover~.animation{
          width: 140px;
          left: 420px;
        }
        nav a:nth-child(5){
          width: 120px;
        }
        nav a:nth-child(5):hover~.animation{
          width: 120px;
          left: 470px;
        }

      `}</style>
    </>
  )
}