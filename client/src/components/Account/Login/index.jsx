import React, { useContext, useState } from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, Redirect } from 'react-router-dom';
import { AccountContext } from '../../../contexts/AccountContext';
import Spinner from 'react-bootstrap/Spinner';
import AlertMessage from '../AlertMessage';
import { Helmet } from 'react-helmet';

const Login = () => {
  // Context
  const {
    accountState: { authLoading, isAuthenticated },
    loginUser,
  } = useContext(AccountContext);

  // Local state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const { email, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let body;

  if (authLoading)
    body = (
      <div className="login-inner mt-2 d-inline text-center">
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
        <Spinner animation="grow" size="sm" variant="success" className="" />
      </div>
    );
  else if (isAuthenticated) return <Redirect to="/" />;
  else
    body = (
      <div className="login-inner mt-2">
        <Form onSubmit={login}>
          <AlertMessage info={alert} />

          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Địa chỉ email"
              name="email"
              required
              value={email}
              onChange={onChangeLoginForm}
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              name="password"
              required
              value={password}
              onChange={onChangeLoginForm}
            />
          </InputGroup>

          <Button
            className="mt-3"
            style={{ width: '100%' }}
            variant="success"
            type="submit"
          >
            Đăng nhập
          </Button>

          <p className="mt-3">
            <Link className="forgot-pas" to="/forgot-password">
              Quên mật khẩu?
            </Link>
          </p>

          <div className="divider"></div>

          <Link to="/signup-candidate">
            <Button className="mt-3" variant="outline-success">
              Tạo tài khoản mới
            </Button>
          </Link>
        </Form>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Đăng nhập tài khoản - FastJob</title>
      </Helmet>
      <div className="login-bg">
        <div className="login-form">
          <h2 className="mb-4 fw-bold">
            <Link style={{ textDecoration: 'none', color: '#212529' }} to="/">
              Fast<span className="text-success">Job</span>
            </Link>
          </h2>
          <h3 className="mb-0">Chào mừng bạn trở lại</h3>
          <p className="mx-2 text-center">
            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý
            tưởng.
          </p>
          {body}
          <p className="mt-4">
            <Link
              style={{ textDecoration: 'none', color: '#2fb380' }}
              to="/signup-recruiter"
            >
              Tạo tài khoản
            </Link>{' '}
            dành cho nhà tuyển dụng.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
