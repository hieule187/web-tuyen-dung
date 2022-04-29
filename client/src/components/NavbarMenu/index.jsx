import React, { useContext } from 'react';
import './styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import userIcon from '../../assets/person-circle.svg';
import searchIcon from '../../assets/search.svg';
import { AccountContext } from '../../contexts/AccountContext';
import Spinner from 'react-bootstrap/Spinner';

const NavbarMenu = () => {
  let navigate = useNavigate();

  const {
    accountState: { authLoading, user },
    logoutUser,
  } = useContext(AccountContext);

  const logout = () => {
    logoutUser();
    return navigate('/login');
  };

  let body;

  if (authLoading)
    body = (
      <Nav className="d-inline">
        <Spinner
          animation="grow"
          size="sm"
          variant="success"
          className="me-1"
        />
        <Spinner
          animation="grow"
          size="sm"
          variant="success"
          className="me-1"
        />
        <Spinner
          animation="grow"
          size="sm"
          variant="success"
          className="me-4"
        />
      </Nav>
    );
  else if (user.role === 'candidate')
    body = (
      <Nav className="d-flex">
        <NavDropdown
          align="end"
          title={
            <span>
              <img
                src={userIcon}
                alt="userIcon"
                width="30"
                height="30"
                className="me-2"
              />{' '}
              {user.fullName}
            </span>
          }
          className="ms-0 me-0 fw-bold"
          active
        >
          <NavDropdown.Header className="navDropdown-header">
            Chức vụ: <span className="text-success fw-bold">Ứng Viên</span>
            <br />
            Email: <span className="text-success fw-bold">{user.email}</span>
          </NavDropdown.Header>
          <NavDropdown.Item href="#action/3.2">
            Hồ sơ cá nhân & CV
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">
            Tin tuyển dụng đã gửi CV
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  else if (user.role === 'recruiter')
    body = (
      <Nav className="d-flex">
        <NavDropdown
          align="end"
          title={
            <span>
              <img
                src={userIcon}
                alt="userIcon"
                width="30"
                height="30"
                className="me-2"
              />{' '}
              {user.fullName}
            </span>
          }
          className="ms-0 me-0 fw-bold"
          active
        >
          <NavDropdown.Header className="navDropdown-header">
            Chức vụ:{' '}
            <span className="text-success fw-bold">Nhà Tuyển Dụng</span>
            <br />
            Email: <span className="text-success fw-bold">{user.email}</span>
          </NavDropdown.Header>
          <NavDropdown.Item href="#action/3.2">
            Đăng tin tuyển dụng
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">
            Quản lý tin tuyển dụng
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Quản lý hồ sơ</NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  else if (user.role === 'admin')
    body = (
      <Nav className="d-flex">
        <NavDropdown
          align="end"
          title={
            <span>
              <img
                src={userIcon}
                alt="userIcon"
                width="30"
                height="30"
                className="me-2"
              />{' '}
              {user.fullName}
            </span>
          }
          className="ms-0 me-0 fw-bold"
          active
        >
          <NavDropdown.Header className="navDropdown-header">
            Chức vụ: <span className="text-success fw-bold">Admin</span>
          </NavDropdown.Header>
          <NavDropdown.Item href="#action/3.2">
            Quản lý tài khoản
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">
            Quản lý tin tuyển dụng
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>Đăng xuất</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  else
    body = (
      <Form className="d-flex">
        <Link to="/login">
          <Button className="me-2" variant="success">
            Đăng nhập
          </Button>
        </Link>
        <Link to="/signup-candidate">
          <Button className="me-2" variant="outline-success">
            Đăng ký
          </Button>
        </Link>
      </Form>
    );

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom" sticky="top">
        <Container>
          <Navbar.Brand className="me-4 fw-bold fs-4">
            <Link style={{ textDecoration: 'none', color: '#212529' }} to="/">
              Fast<span className="text-success">Job</span>
            </Link>
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
              <Nav.Link className="me-2 fw-bold" to="/" as={Link}>
                Hỗ trợ
              </Nav.Link>
            </Nav>
            {body}
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
                <Button variant="success" type="submit">
                  <img
                    src={searchIcon}
                    alt="searchIcon"
                    width="20"
                    height="20"
                  />
                </Button>
              </Nav>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
