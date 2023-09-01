import React, { useState } from 'react'


export default function VidMenu({ setSelectedMuscle }) {
  const handleMuscleClick = (musclegroupID) => {
    setSelectedMuscle(musclegroupID)
  }
  return (
    <>
      <div className="guide" >
        <div className="tilte-menu-1" >
          <p className="tilte-1">肌群分類</p>
        </div>
        <div className="typelist" >
          <ul className="vid-type-style">
            <div className="btn" onClick={() => handleMuscleClick(1)}>
              <li>胸肌</li>
            </div>
            <div className="btn" onClick={() => handleMuscleClick(2)}>
              <li>背肌</li>
            </div>
            <div className="btn" onClick={() => handleMuscleClick(3)}>
              <li>腹肌</li>
            </div>
            <div className="btn" onClick={() => handleMuscleClick(4)}>
              <li>腿部肌群</li>
            </div>
            <div className="btn" onClick={() => handleMuscleClick(5)}>
              <li>肩部肌群</li>
            </div>
            <div className="btn" onClick={() => handleMuscleClick(6)}>
              <li>手臂肌群</li>
            </div>
            <div className="btn" onClick={() => handleMuscleClick(7)}>
              <li>臀肌</li>
            </div>
            <div className="btn" onClick={() => handleMuscleClick(8)}>
              <li>全身肌群</li>
            </div>
          </ul>
        </div>
        <br />
      </div>
      <style jsx>{`
        .guide {
          position: relative;
          max-width: 300px;
          margin-top: 10px;
          color: #e25d31;
          font-size: 23px;
          border-radius: 20px;
          background-color: rgba(255, 255, 255, 0.5);
        }

        .tilte-menu-1 {
          text-align: center;
          font-family: 'Noto Sans TC', sans-serif;
          padding: 20px;
          letter-spacing: 3px;
        }

        .btn {
          display: inline-block;
          width: 120px;
          height: 45px;
          border: 2px solid #676767;
          margin-bottom: 10px;
          border-radius: 50px;
          margin-right: 20px;
          transition: background-color 0.3s, border 0.3s, padding 0.3s;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          transform: skewY(45deg); 
          transition: top 0.3s ease; // 添加过渡效果
        }

        .btn:hover::before {
          top: 0; // 鼠标悬停时移动到显示位置
        }

        .vid-type-style {
          list-style: none;
        }

        ul li {
          color: #676767;
          font-family: 'Noto Sans TC', sans-serif;
          font-size: 20px;
          letter-spacing: 0.15em;
        }

        ul a li {
          color: #676767;
        }

        .btn:hover {
          background-color: #e25d31;
          border: 2px solid transparent;
          border-radius: 50px;
        }

        .btn:hover li {
          color: #ffffff;
        }

        @media screen and (max-width: 768px) {
          .guide {
            display: none;
          }
        }
      `}</style>
    </>
  )
}