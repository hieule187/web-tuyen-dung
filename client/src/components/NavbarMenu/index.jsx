import React, { useContext } from 'react';
import './styles.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import userIcon from '../../assets/user-male.jpg';
import createIcon from '../../assets/create.svg';
import manageIcon from '../../assets/manage.svg';
import logoutIcon from '../../assets/logout.svg';
import searchIcon from '../../assets/search-black.svg';
import bagIcon from '../../assets/bag-black.svg';
import editIcon from '../../assets/pencil-square.svg';
import { AccountContext } from '../../contexts/AccountContext';
import Spinner from 'react-bootstrap/Spinner';
import convertSlugUrl from '../../utils/convertSlugUrl';

const NavbarMenu = () => {
  const history = useHistory();
  // Context
  const {
    accountState: { authLoading, isAuthenticated, user },
    logoutUser,
    setShowSignupPostModal,
  } = useContext(AccountContext);

  const logout = () => {
    logoutUser();
    history.push('/login');
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
  else if (isAuthenticated && user.role === 'candidate')
    body = (
      <Nav className="d-flex menuNav">
        <span className="ms-1 me-1"></span>
        <NavDropdown
          align="end"
          title={
            <span>
              <img
                src={userIcon}
                alt="userIcon"
                width="30"
                height="30"
                className="me-2 iconUser-ms rounded-circle no-select"
              />{' '}
              {user.fullName}
            </span>
          }
          className="ms-0 me-0"
          active
        >
          <NavDropdown.Header className="navDropdown-header d-flex">
            <img
              src={userIcon}
              alt="userIcon"
              width="30"
              height="30"
              className="iconUser-me rounded-circle no-select"
            />
            <div>
              <span className="text-success fw-bold">Ứng Viên</span>
              <div className="user-email">
                <span>{user.email}</span>
              </div>
            </div>
          </NavDropdown.Header>
          <NavDropdown.Item to="/profile" as={Link}>
            <img
              src={createIcon}
              alt="createIcon"
              width="17"
              height="17"
              className="createIcon no-select"
            />
            Hồ sơ xin việc
          </NavDropdown.Item>
          <NavDropdown.Item to="/my-cv" as={Link}>
            <img
              src={manageIcon}
              alt="manageIcon"
              width="16"
              height="16"
              className="manageIcon no-select"
            />
            Tin tuyển dụng đã gửi hồ sơ
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="18"
              height="18"
              className="logoutIcon no-select"
            />
            Đăng xuất
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  else if (isAuthenticated && user.role === 'recruiter')
    body = (
      <Nav className="d-flex menuNav">
        <span className="ms-1 me-1"></span>
        <NavDropdown
          align="end"
          title={
            <span>
              <img
                src={userIcon}
                alt="userIcon"
                width="30"
                height="30"
                className="me-2 iconUser-ms rounded-circle no-select"
              />{' '}
              {user.fullName}
            </span>
          }
          className="ms-0 me-0"
          active
        >
          <NavDropdown.Header className="navDropdown-header d-flex">
            <img
              src={userIcon}
              alt="userIcon"
              width="30"
              height="30"
              className="iconUser-me rounded-circle no-select"
            />
            <div>
              <span className="text-success fw-bold">Nhà Tuyển Dụng</span>
              <div className="user-email">
                <span>{user.email}</span>
              </div>
            </div>
          </NavDropdown.Header>
          <NavDropdown.Item
            to={`/create-recruitment/${convertSlugUrl(user.fullName)}`}
            as={Link}
          >
            <img
              src={createIcon}
              alt="createIcon"
              width="17"
              height="17"
              className="createIcon no-select"
            />
            Đăng tin tuyển dụng
          </NavDropdown.Item>
          <NavDropdown.Item to="/my-recruitment" as={Link}>
            <img
              src={manageIcon}
              alt="manageIcon"
              width="16"
              height="16"
              className="manageIcon no-select"
            />
            Quản lý tin tuyển dụng
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="18"
              height="18"
              className="logoutIcon no-select"
            />
            Đăng xuất
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  else if (isAuthenticated && user.role === 'admin')
    body = (
      <Nav className="d-flex menuNav">
        <span className="ms-1 me-1"></span>
        <NavDropdown
          align="end"
          title={
            <span>
              <img
                src={userIcon}
                alt="userIcon"
                width="30"
                height="30"
                className="me-2 iconUser-ms rounded-circle no-select"
              />{' '}
              {user.fullName}
            </span>
          }
          className="ms-0 me-0"
          active
        >
          <NavDropdown.Header className="navDropdown-header d-flex">
            <img
              src={userIcon}
              alt="userIcon"
              width="30"
              height="30"
              className="iconUser-me rounded-circle no-select"
            />
            <div>
              <span className="text-success fw-bold">Admin</span>
              <div className="user-email">
                <span>admin</span>
              </div>
            </div>
          </NavDropdown.Header>
          <NavDropdown.Item to="/account-management" as={Link}>
            <img
              src={manageIcon}
              alt="manageIcon"
              width="16"
              height="16"
              className="manageIcon no-select"
            />
            Quản lý tài khoản
          </NavDropdown.Item>
          <NavDropdown.Item to="/recruitment-management" as={Link}>
            <img
              src={manageIcon}
              alt="manageIcon"
              width="16"
              height="16"
              className="manageIcon no-select"
            />
            Quản lý tin tuyển dụng
          </NavDropdown.Item>
          <NavDropdown.Item onClick={logout}>
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="18"
              height="18"
              className="logoutIcon no-select"
            />
            Đăng xuất
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    );
  else
    body = (
      <Nav>
        <span className="ms-1 me-1"></span>
        <Button className="btn-mt" to="/login" as={Link} variant="success">
          Đăng nhập
        </Button>
        <span className="ms-1 me-1"></span>
        <Button
          className="btn-mt"
          variant="outline-success"
          onClick={() => setShowSignupPostModal(true)}
        >
          Đăng ký
        </Button>
      </Nav>
    );

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-card" sticky="top">
        <Container>
          <Navbar.Brand className="me-4 fw-bold fs-4">
            <Link style={{ textDecoration: 'none', color: '#212529' }} to="/">
              Fast<span className="text-success">Job</span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/" as={Link} className="me-2 fw-bold text-center">
                <img
                  src={bagIcon}
                  alt="bagIcon"
                  width="20"
                  height="20"
                  className="no-select nav-icon"
                />
                Việc làm
              </Nav.Link>
              {isAuthenticated && user.role === 'candidate' && (
                <Nav.Link
                  to="/profile"
                  as={Link}
                  className="me-2 fw-bold text-center"
                >
                  <img
                    src={editIcon}
                    alt="editIcon"
                    width="20"
                    height="20"
                    className="no-select nav-icon"
                  />
                  Hồ sơ & CV
                </Nav.Link>
              )}

              {isAuthenticated && user.role === 'recruiter' && (
                <Nav.Link
                  to={`/create-recruitment/${convertSlugUrl(user.fullName)}`}
                  as={Link}
                  className="me-2 fw-bold text-center"
                >
                  <img
                    src={editIcon}
                    alt="editIcon"
                    width="20"
                    height="20"
                    className="no-select nav-icon"
                  />
                  Đăng tin tuyển dụng
                </Nav.Link>
              )}

              <Nav.Link
                to="/search"
                as={Link}
                className="me-2 fw-bold text-center"
              >
                <img
                  src={searchIcon}
                  alt="searchIcon"
                  width="20"
                  height="20"
                  className="no-select search-icon"
                />
                Tìm kiếm
              </Nav.Link>
            </Nav>

            {body}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMenu;
