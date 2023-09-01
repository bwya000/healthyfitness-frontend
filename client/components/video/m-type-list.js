import Link from 'next/link'
import React from 'react'

export default function MtypeList() {
  return (
    <>
      <div className="m-typelist">
        <ul className="vid-type-style">
          <Link href="#">
            <div className="btn">
              <li>上半身</li>
            </div>
          </Link>
          <Link href="#">
            <div className="btn">
              <li>下半身</li>
            </div>
          </Link>
          <Link href="#">
            <div className="btn">
              <li>全身燃脂</li>
            </div>
          </Link>
          <Link href="#">
            <div className="btn">
              <li>居家訓練</li>
            </div>
          </Link>
          <Link href="#">
            <div className="btn">
              <li>啞鈴訓練</li>
            </div>
          </Link>
        </ul>
      </div>
      <style jsx>
        {`
          .btn {
            display: inline-block;
            width: 130px;
            height: 45px; 
            border: 2px solid #777777;
            border-radius: 50px;
            padding: 10px;
            margin-right: 30px; 
            transition: background-color 0.3s, border 0.3s, padding 0.3s;
          }

          .vid-type-style {
            position: absolute;
            display: flex;
            top: 10px;
            left: -150px;
            list-style: none;
          }

          ul li {
            color: #777777;
            font-family: 'Rambla', sans-serif;
            text-align: center;
            font-size: 22px;
            line-height: 29px;
            letter-spacing: 0.15em;
          }

          ul a li {
            color: #777777;
          }

          .btn:hover {
            background-color: #ea6f2a;
            border: 2px solid transparent;
            border-radius: 50px;
            padding: 10px;
          }

          .btn:hover li {
            color: #ffffff;
          }
        `}
      </style>
    </>
  )
}
