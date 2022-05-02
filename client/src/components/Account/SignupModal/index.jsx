import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { AccountContext } from '../../../contexts/AccountContext';

const SignupModal = () => {
  // Context
  const { showSignupPostModal, setShowSignupPostModal } = useContext(
    AccountContext,
  );

  const closeDialog = () => {
    setShowSignupPostModal(false);
  };

  return (
    <Modal show={showSignupPostModal} onHide={closeDialog}>
      <Modal.Header style={{ display: 'block', backgroundColor: '#f8f9fa' }}>
        <Modal.Title>
          <h4 className="text-center">Chào bạn!</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6 className="text-center">
          Để tối ưu tốt nhất cho trải nghiệm của bạn với{' '}
          <span className="fw-bold">
            Fast
            <span className="text-success">Job</span>
          </span>
          , vui lòng lựa chọn nhóm phù hợp nhất với bạn.
        </h6>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col className="text-center">
              <Button
                to="/signup-candidate"
                as={Link}
                variant="success"
                onClick={closeDialog}
              >
                Tôi là ứng viên tìm việc
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                to="/signup-recruiter"
                as={Link}
                variant="success"
                onClick={closeDialog}
              >
                Tôi là nhà tuyển dụng
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default SignupModal;
