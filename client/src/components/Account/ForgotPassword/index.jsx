import React, { useContext, useState } from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, Redirect } from 'react-router-dom';
import { AccountContext } from '../../../contexts/AccountContext';
import Spinner from 'react-bootstrap/Spinner';
import AlertMessage from '../AlertMessage';
import { apiUrl } from '../../../contexts/constants';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const ForgotPassword = () => {
  // Context
  const {
    accountState: { authLoading, isAuthenticated },
  } = useContext(AccountContext);

  // Local state

  const [email, setEmail] = useState('');

  const [alert, setAlert] = useState(null);

  const [loadingSendEmail, setLoadingSendEmail] = useState(false);

  const [emailed, setEmailed] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `${apiUrl}/account/password-reset`;
    try {
      setLoadingSendEmail(true);
      const response = await axios.post(url, { email });
      setLoadingSendEmail(false);
      if (response.data.success) {
        setEmailed(true);
        setAlert({ type: 'success', message: response.data.message });
      }
    } catch (error) {
      setLoadingSendEmail(false);
      setAlert({ type: 'danger', message: error.response.data.message });
      setTimeout(() => setAlert(null), 5000);
      console.log(error);
    }
  };

  let body;

  if (authLoading)
    body = (
      <div className="forgot-password-inner mt-2 d-inline text-center">
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
  else if (loadingSendEmail)
    body = (
      <div className="forgot-password-inner mt-2 d-inline text-center">
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
  else if (emailed)
    body = (
      <div className="forgot-password-inner mt-2">
        <Form>
          <AlertMessage info={alert} />

          <div className="divider mt-3"></div>

          <Link to="/login">
            <Button className="mt-3" variant="outline-success">
              Đăng nhập
            </Button>
          </Link>
        </Form>
      </div>
    );
  else
    body = (
      <div className="forgot-password-inner mt-2">
        <Form onSubmit={handleSubmit}>
          <AlertMessage info={alert} />

          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Địa chỉ email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </InputGroup>

          <p className="rule mt-3 text-start text-muted">
            Bằng việc thực hiện đổi mật khẩu, bạn đã đồng ý với{' '}
            <span className="text-success">Điều khoản dịch vụ </span>
            và <span className="text-success">Chính sách bảo mật</span> của
            chúng tôi.
          </p>

          <Button style={{ width: '100%' }} variant="success" type="submit">
            Đổi mật khẩu
          </Button>

          <div className="divider mt-3"></div>

          <Link to="/login">
            <Button className="mt-3" variant="outline-success">
              Đăng nhập
            </Button>
          </Link>
        </Form>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Quên mật khẩu - FastJob</title>
      </Helmet>
      <div className="forgot-password-bg">
        <div className="forgot-password-form">
          <h2 className="mb-4 fw-bold">
            <Link style={{ textDecoration: 'none', color: '#212529' }} to="/">
              Fast<span className="text-success">Job</span>
            </Link>
          </h2>
          <h3 className="mb-0">Quên mật khẩu</h3>
          <p className="mx-2 text-center">
            Vui lòng nhập địa chỉ email của bạn để thực hiện đổi mật khẩu.
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

export default ForgotPassword;
