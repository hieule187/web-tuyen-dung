import React from 'react';
import './styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const NavbarMenu = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom" sticky="top">
        <Container>
          <Navbar.Brand className="me-4 fw-bold fs-4 text-success" href="#">
            <span className="text-dark">Fast</span>Job
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="me-2 fw-bold" to="/" as={Link}>
                Việc làm
              </Nav.Link>
              <Nav.Link className="me-2 fw-bold" to="/" as={Link}>
                Hồ sơ & CV
              </Nav.Link>
              <Nav.Link className="me-2 fw-bold" to="/" as={Link}>
                Công ty
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Link to="/login">
                <Button className="me-2" variant="outline-success">
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/signup-recruiter">
                <Button className="me-2" variant="success">
                  Đăng ký
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Collapse id="basic-navbar-nav" className="d-flex">
            <Form className="d-flex me-auto ms-auto">
              <Nav>
                <FormControl
                  type="search"
                  placeholder="Tên công việc, vị trí ..."
                  className="me-2"
                />
              </Nav>
              <Nav>
                <Form.Select
                  aria-label="Default select example"
                  className="me-2"
                >
                  <option>Tất cả ngành nghề</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Nav>
              <Nav>
                <Form.Select
                  aria-label="Default select example"
                  className="me-2"
                >
                  <option>Tất cả địa điểm</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Nav>
              <Nav>
                <Button variant="outline-success">Tìm</Button>
              </Nav>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
