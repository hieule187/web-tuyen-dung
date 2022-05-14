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

const SignupCandidate = () => {
  // Context
  const {
    accountState: { authLoading, isAuthenticated },
    signupCandidate,
  } = useContext(AccountContext);

  // Local state
  const [signupForm, setSignupForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);

  const [loadingSendEmail, setLoadingSendEmail] = useState(false);

  const [emailed, setEmailed] = useState(false);

  const { fullName, email, password, confirmPassword } = signupForm;

  const onChangeSignupForm = (event) =>
    setSignupForm({ ...signupForm, [event.target.name]: event.target.value });

  const signup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Mật khẩu nhập không khớp.' });
      setTimeout(() => setAlert(null), 5000);
      return; // Dừng ngay không chạy tiếp đoạn dưới nữa
    }

    try {
      setLoadingSendEmail(true);
      const signupData = await signupCandidate(signupForm);
      setLoadingSendEmail(false);
      if (!signupData.success) {
        setAlert({ type: 'danger', message: signupData.message });
        setTimeout(() => setAlert(null), 5000);
      } else {
        setEmailed(true);
        setAlert({ type: 'success', message: signupData.message });
      }
    } catch (error) {
      setLoadingSendEmail(false);
      console.log(error);
    }
  };

  let body;

  if (authLoading)
    body = (
      <div className="signup-candidate-inner mt-2 d-inline text-center">
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
      <div className="signup-candidate-inner mt-2 d-inline text-center">
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
      <div className="signup-candidate-inner mt-2">
        <Form>
          <AlertMessage info={alert} />

          <div className="divider mt-3"></div>

          <Link to="/login">
            <Button className="mt-3" variant="success">
              Đăng nhập
            </Button>
          </Link>
        </Form>
      </div>
    );
  else
    body = (
      <div className="signup-candidate-inner mt-2">
        <Form onSubmit={signup}>
          <AlertMessage info={alert} />

          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Họ và tên"
              name="fullName"
              required
              value={fullName}
              onChange={onChangeSignupForm}
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <Form.Control
              type="text"
              placeholder="Địa chỉ email"
              name="email"
              required
              value={email}
              onChange={onChangeSignupForm}
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              name="password"
              required
              value={password}
              onChange={onChangeSignupForm}
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <Form.Control
              type="password"
              placeholder="Nhập lại mật khẩu"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={onChangeSignupForm}
            />
          </InputGroup>

          <p className="rule mt-3 text-start text-muted">
            Bằng việc đăng ký tài khoản, bạn đã đồng ý với{' '}
            <span className="text-success">Điều khoản dịch vụ </span>
            và <span className="text-success">Chính sách bảo mật</span> của
            chúng tôi.
          </p>

          <Button
            style={{ width: '100%' }}
            variant="outline-success"
            type="submit"
          >
            Đăng ký
          </Button>

          <div className="divider mt-3"></div>

          <Link to="/login">
            <Button className="mt-3" variant="success">
              Đăng nhập
            </Button>
          </Link>
        </Form>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Đăng ký tài khoản ứng viên - FastJob</title>
      </Helmet>
      <div className="signup-candidate-bg">
        <div className="signup-candidate-form">
          <h2 className="mb-4 fw-bold">
            <Link style={{ textDecoration: 'none', color: '#212529' }} to="/">
              Fast<span className="text-success">Job</span>
            </Link>
          </h2>
          <h3 className="mb-0">Đăng ký tài khoản ứng viên</h3>
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

export default SignupCandidate;
