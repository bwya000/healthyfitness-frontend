import React from 'react'
import Image from 'next/image'
import Homewhite from '@/public/img-record/home-white.png'
import Foodwhite from '@/public/img-record/food-white.png'
import Sportwhite from '@/public/img-record/sport-white.png'
import Person from '@/public/img-record/person.png'
import Buttonbg from '@/public/img-record/button-bg.png'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import BodydataForm from '@/components/record/bodydata-form'

export default function BodyRecord() {
  return (
    <>
      <div className="container-fluid p-0" style={{ marginTop: '70px',overflow:'hidden'}}>
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
                  <Image src={Foodwhite} alt="" />
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
                  <Image
                    src={Buttonbg}
                    className="sidebar-icon-bg"
                    alt=""
                    style={{
                      position: 'absolute',
                      top: '15px',
                      left: '48px',
                      zIndex: '1',
                    }}
                  />
                  <Image
                    src={Person}
                    className="sidebar-icon"
                    alt=""
                    style={{
                      position: 'absolute',
                      top: '68px',
                      left: '69px',
                      zIndex: '2',
                    }}
                  />
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
          <BodydataForm />
        </div>
      </div>
    </>
  )
}
