import React from 'react'
import Image from 'next/image'
import Homewhite from '@/public/img-record/home-white.png'
import Food from '@/public/img-record/food.png'
import Sportwhite from '@/public/img-record/sport-white.png'
import Personwhite from '@/public/img-record/person-white.png'
import Buttonbg from '@/public/img-record/button-bg.png'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import Calendar from '@/components/record/calendar'
import ChoiceBreakfast from '@/components/record/choice-breakfast'
import Foodoptioncard from '@/components/record/foodcard/food-option'

export default function foodrecord() {
  return (
    <>
      <div
        className="container-fluid p-0"
        style={{ marginTop: '70px', overflow: 'hidden' }}
      >
        <div className="row">
          <div className="col-1">
            {/* <!-- sidebar --> */}
            <div className="row sidebar-icon-position sidebar-height sidebar text-center p-0">
              <div className="col sidebar-icon-position-img ps-0">
                <Link href="record-index">
                  <Image src={Homewhite} alt="" />
                </Link>
              </div>
              <div className="col sidebar-icon-position-img ps-0">
                <Link href="foodrecord">
                  <Image
                    src={Food}
                    alt=""
                    style={{
                      position: 'absolute',
                      top: '83px',
                      left: '62px',
                      zIndex: '2',
                    }}
                  />
                  <Image
                    src={Buttonbg}
                    className="sidebar-icon-bg"
                    alt="buttonbg"
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '48px',
                      zIndex: '1',
                    }}
                  />
                </Link>
              </div>
              <div className="col sidebar-icon-position-img ps-0">
                <Link href="sportrecord">
                  <Image src={Sportwhite} alt="" />
                </Link>
              </div>
              <div
                className="col sidebar-icon-position-img ps-0"
                style={{ position: 'relative' }}
              >
                <Link href="bodyrecord">
                  <Image src={Personwhite} className="sidebar-icon" alt="" />
                </Link>
              </div>
            </div>
          </div>

          <style jsx>
            {`
              .sidebar {
                height: 92.5vh;
                width: 200px;
                background-color: #eb6100;
              }

              .logo-icon {
                width: 80%;
                height: 80%;
              }

              .sidebar-icon-position {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }

              .sidebar-icon-position-img {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
              }

              .sidebar-icon {
                position: absolute;
                top: 75px;
                left: 75px;
                z-index: 2;
              }

              .sidebar-icon-bg {
                position: absolute;
                top: 20px;
                left: 48px;
                z-index: 1;
              }
            `}
          </style>

          <div className="col-11">
            <div className="container-fluid text-center ms-5">
              <div className="row pt-4 ms-0">
                <Calendar />
                <ChoiceBreakfast />
              </div>
              <Foodoptioncard />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
