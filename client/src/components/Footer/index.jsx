import React from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { imgUrl } from '../../contexts/constants';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div style={{ backgroundColor: '#f8f9fa' }}>
      <Container className="footer">
        <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4">
          <Col className="col-footer">
            <div>
              <h3 className="fw-bold">
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: '#212529' }}
                >
                  Fast<span className="text-success">Job</span>
                </Link>
                <Link
                  to={{ pathname: 'http://online.gov.vn/' }}
                  target="_blank"
                >
                  <img
                    src={`${imgUrl}/uploads/bo-cong-thuong.png`}
                    alt="dang-ky-bo-cong-thuong"
                    className="icon-bct no-select"
                  />
                </Link>
              </h3>
              <p className="mb-2">Điện thoại: 0123456789</p>
              <p className="mb-2">Email: hieule187@gmail.com</p>
              <p className="mb-2">Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội</p>
            </div>
          </Col>

          <Col className="col-footer">
            <div className="mt-3">
              <h5 className="fw-bold">Hỗ Trợ</h5>
              <p className="mt-3 mb-2">Giới thiệu</p>
              <p className="mb-2">Cơ hội việc làm</p>
              <p className="mb-2">Đối tác</p>
            </div>
          </Col>

          <Col className="col-footer">
            <div className="mt-3">
              <h5 className="fw-bold">Đại Học Thủy Lợi</h5>
              <p className="mt-3 mb-2">Điện thoại: (024) 38522201</p>
              <p className="mb-2">Email: phonghcth@tlu.edu.vn</p>
              <p className="mb-2">Địa chỉ: 175 Tây Sơn, Đống Đa, Hà Nội</p>
            </div>
          </Col>

          <Col className="col-footer">
            <div className="mt-3">
              <h5 className="fw-bold">Đồ Án Chuyên Ngành KTPM</h5>
              <p className="mt-3 mb-2">Sinh viên thực hiện: Lê Trần Hiếu</p>
              <p className="mb-2">60PM1: 1851171491</p>
              <p className="mb-2">Giảng viên hướng dẫn: TS.Tạ Quang Chiểu</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <div className="divider-footer"></div>

        <div className="pb-2 mt-3 d-flex justify-content-center fst-italic">
          <p>© 2022 FastJob. Đã đăng ký bản quyền.</p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
