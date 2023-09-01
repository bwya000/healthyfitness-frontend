import Link from 'next/link'
import React from 'react'

export default function TypeList({ setSelectedMuscle }) {
  const handleMuscleClick = (musclegroupID) => {
    setSelectedMuscle(musclegroupID);
  };

  return (
    <>
      <div className="typelist">
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
      <style jsx>
        {`
          .btn {
            display: inline-block;
            width: 120px;
            height: 45px; 
            border: 2px solid #676767;
            border-radius: 50px;
            margin-right: 20px; 
            transition: background-color 0.3s, border 0.3s, padding 0.3s;
          }

          .vid-type-style {
            position: relative;
            display: flex;
            top: 10px;
            left: -100px;
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
            background-color: #ea6f2a;
            border: 2px solid transparent;
            border-radius: 50px;
          }

          .btn:hover li {
            color: #ffffff;
          }

          @media screen and (max-width:768px){
            .typelist 
            {
              display:none;
            }
          } 
        `}
      </style>
    </>
  )
}
