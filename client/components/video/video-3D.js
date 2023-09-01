import { React, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function VideoThreeD() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // 在初次進入頁面時設定 show 為 true
  }, []);

  return (
    <>
      <Modal
        style={{ zIndex: '4000' }}
        show={show}
        onHide={() => setShow(false)}
        centered={true}
        size='xl'
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title className='three-title' id="example-custom-modal-styling-title"	>
            WORK OUT ANYTIME,
            ANYWHERE,
            ON ANY DEVICE
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Spline scene="https://prod.spline.design/du6v0o7gf-sxI0Do/scene.splinecode" />
        </Modal.Body>
      </Modal>

      <style jsx>
        {`
          .title {
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
            letter-spacing: 5px;
            font-family: 'Noto Sans TC', sans-serif;
            color: #4A4A4A;
          }

          .title-1 {
            text-align: center;
            margin-bottom: 40px;
            letter-spacing: 4px;
            color: #4A4A4A;
          }
        `}
      </style>
    </>
  );
}
