import React from 'react'
import Image from 'next/image'
import { Navbar, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faUser,
  faEnvelope,
  faBell,
  faCog,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons'

const CustomNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="custom-navbar">
      <Navbar.Brand href="#" className="logo">
        <a href="#">
          <Image
            className="logo"
            src="http://localhost:3000/images/logo.png"
            alt="HealthyFitness"
            width={110}
            height={50}
            style={{
              position: 'relative',
              top: '6px',
              left: '20px',
            }}
          />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNav" />
      <Navbar.Collapse id="navbarNav">
        <Nav className="mx-auto nav1">
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faHome} /> Home
          </Nav.Link>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faUser} /> User
          </Nav.Link>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faEnvelope} /> Messages
          </Nav.Link>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faBell} /> Notifications
          </Nav.Link>
        </Nav>
        <Nav className="ml-auto d-none d-md-flex">
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faCog} />
          </Nav.Link>
          <Nav.Link href="#">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <style jsx>
        {`
          .custom-navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .logo {
            display: flex;
            align-items: center;
          }

          @media (max-width: 767px) {
            .logo {
              justify-content: center;
              width: 100%;
            }
          }

          .nav1 {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
        `}
      </style>
    </Navbar>
  )
}

export default CustomNavbar
