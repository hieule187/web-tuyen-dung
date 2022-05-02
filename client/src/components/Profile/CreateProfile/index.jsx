import React from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import infoIcon from '../../../assets/info.svg';
import skillIcon from '../../../assets/skill.svg';
import targetIcon from '../../../assets/target.svg';
import experienceIcon from '../../../assets/experience.svg';
import degreeIcon from '../../../assets/degree.svg';

const CreateProfile = () => {
  return (
    <div className="create-profile-wrapper">
      <Container className="mt-3">
        <h1 className="create-profile-header">Tạo mới hồ sơ xin việc</h1>
        <p className="create-profile-description">
          Xây dựng một hồ sơ nổi bật để nhận được các cơ hội sự nghiệp lý tưởng.
        </p>
      </Container>

      <Container className="mt-3">
        <Form className="">
          <h1 className="create-profile-title">
            <img
              src={infoIcon}
              alt="infoIcon"
              width="24"
              height="24"
              className="mb-1 me-2"
            />
            Thông tin liên hệ:
          </h1>
          <div className="d-flex justify-content-center">
            <Row className="create-profile-content">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Text id="fullName" muted>
                    Họ và tên
                  </Form.Text>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ và tên"
                    name="fullName"
                    required
                    aria-describedby="fullName"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Text id="email" muted>
                    Email
                  </Form.Text>
                  <Form.Control
                    type="email"
                    placeholder="Nhập địa chỉ email"
                    name="email"
                    required
                    aria-describedby="email"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Text id="title-help" muted>
                        Required
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        required
                        aria-describedby="title-help"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Text id="title-help" muted>
                        Required
                      </Form.Text>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        required
                        aria-describedby="title-help"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Text id="phoneNumber" muted>
                    Số điện thoại
                  </Form.Text>
                  <Form.Control
                    type="tel"
                    maxLength={10}
                    placeholder="Nhập tối đa 10 chữ số"
                    name="phoneNumber"
                    required
                    aria-describedby="phoneNumber"
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </Form>
      </Container>

      <div style={{ height: '500px' }}></div>
    </div>
  );
};

export default CreateProfile;
