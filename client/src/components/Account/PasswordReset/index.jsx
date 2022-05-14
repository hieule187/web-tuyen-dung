import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AlertMessage from '../AlertMessage';
import { apiUrl } from '../../../contexts/constants';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const PasswordReset = () => {
  // Local state
  const [passwordResetForm, setPasswordResetForm] = useState({
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);

  const [loading, setLoading] = useState(false);

  const [validUrl, setValidUrl] = useState(false);

  const [success, setSuccess] = useState(false);

  const param = useParams();

  const url = `${apiUrl}/account/password-reset/${param.id}/${param.verifyToken}`;

  const { password, confirmPassword } = passwordResetForm;

  const onChangePasswordResetForm = (event) =>
    setPasswordResetForm({
      ...passwordResetForm,
      [event.target.name]: event.target.value,
    });

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setLoading(false);
        if (response.data.success) {
          setValidUrl(true);
        }
      } catch (error) {
        setValidUrl(false);
        setLoading(false);
        console.log(error);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: 'danger', message: 'Mật khẩu nhập không khớp.' });
      setTimeout(() => setAlert(null), 5000);
      return; // Dừng ngay không chạy tiếp đoạn dưới nữa
    }

    try {
      const response = await axios.post(url, { password });
      if (response.data.success) {
        setSuccess(true);
        setAlert({ type: 'success', message: response.data.message });
      }
    } catch (error) {
      setAlert({ type: 'danger', message: error.response.data.message });
      setTimeout(() => setAlert(null), 5000);
      console.log(error);
    }
  };

  let body;

  if (loading)
    body = (
      <div className="password-reset-inner mt-2 d-inline text-center">
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
  else if (success)
    body = (
      <div className="password-reset-inner mt-2">
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
  else if (validUrl)
    body = (
      <div className="password-reset-inner mt-2">
        <Form onSubmit={handleSubmit}>
          <AlertMessage info={alert} />

          <InputGroup>
            <Form.Control
              type="password"
              placeholder="Mật khẩu mới"
              name="password"
              required
              value={password}
              onChange={onChangePasswordResetForm}
            />
          </InputGroup>

          <InputGroup className="mt-3">
            <Form.Control
              type="password"
              placeholder="Nhập lại mật khẩu"
              name="confirmPassword"
              required
              value={confirmPassword}
              onChange={onChangePasswordResetForm}
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
  else
    body = (
      <div className="password-reset-inner mt-2 d-inline text-center">
        <h5>404: Lỗi đường dẫn không tồn tại.</h5>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Đặt lại mật khẩu - FastJob</title>
      </Helmet>
      <div className="password-reset-bg">
        <div className="password-reset-form">
          <h2 className="mb-4 fw-bold">
            <Link style={{ textDecoration: 'none', color: '#212529' }} to="/">
              Fast<span className="text-success">Job</span>
            </Link>
          </h2>
          <h3 className="mb-0">Đặt lại mật khẩu</h3>
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

export default PasswordReset;
