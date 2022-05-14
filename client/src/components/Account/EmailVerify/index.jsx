import React, { useState, useEffect } from 'react';
import './styles.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { apiUrl } from '../../../contexts/constants';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const EmailVerify = () => {
  const [loading, setLoading] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  const url = `${apiUrl}/account/${param.id}/verify/${param.verifyToken}`;

  useEffect(() => {
    const verifyEmailUrl = async () => {
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
    verifyEmailUrl();
  }, [param, url]);

  let body;

  if (loading)
    body = (
      <div className="emailVerify-inner mt-2 d-inline text-center">
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
  else if (validUrl)
    body = (
      <div className="emailVerify-inner mt-2">
        <Form>
          <Alert variant="success">
            Tài khoản của bạn đã được xác minh thành công.
          </Alert>

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
      <div className="emailVerify-inner mt-2 d-inline text-center">
        <h5>404: Lỗi đường dẫn không tồn tại.</h5>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Xác minh tài khoản - FastJob</title>
      </Helmet>
      <div className="emailVerify-bg">
        <div className="emailVerify-form">
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

export default EmailVerify;
