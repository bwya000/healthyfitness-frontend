import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Image from 'next/image'
import Logo from 'public/images/logo.png'
import Link from 'next/link'

export default function OffcanvasExample() {
  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" style={{
          position: 'fixed',
          width:'100%',
          zIndex: '3000'}}>
          <Container
            fluid
            style={{ backgroundColor: '#414141', padding: '0' }}
          >
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} style={{ border: 'none', color: 'rgba(0,0,0,0)'}}/>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
              style={{
                zIndex: '2000'
              }}
            >
              <Offcanvas.Header
                closeButton
                style={{ backgroundColor: '#414141' }}
              >
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Image src={Logo} width={70} />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">首頁</Nav.Link>
                  <Nav.Link href="/product">商城</Nav.Link>
                  <Nav.Link href="/video/videoList">影音課程</Nav.Link>
                  <Nav.Link href="/record/record-index">健康日誌</Nav.Link>
                  <NavDropdown
                    title="會員中心"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="/member/favorite-product">
                      編輯個人資料
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/member/favorite-product">
                      收藏商品
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/member/favorite-video">
                      收藏影片
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/member/order-list">
                      購買清單
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/api/auth/signout">
                      登出
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Navbar.Brand href="#">
              <Link href="/">
                <Image src={Logo} width={70} style={{ marginLeft: '-200px' }} />
              </Link>
              <i
                className="fa-solid fa-circle-user"
                style={{ marginRight: '5px', marginLeft: '90px' }}
              ></i>
              <i className="bi bi-cart-fill car"></i>
            </Navbar.Brand>
          </Container>
        </Navbar>
      ))}

      <style jsx>
        {`
          .fa-circle-user {
            color: #e25d31;
          }
          .car {
          color: #e25d31;
          }

        `}
      </style>
    </>
  )
}
