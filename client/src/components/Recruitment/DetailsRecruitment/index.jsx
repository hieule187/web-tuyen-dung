import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import NavbarMenu from '../../NavbarMenu';
import Footer from '../../Footer';
import SignupModal from '../../Account/SignupModal';
import Container from 'react-bootstrap/Container';
import { imgUrl } from '../../../contexts/constants';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import salaryIcon from '../../../assets/salary.svg';
import workingFormIcon from '../../../assets/bag.svg';
import genderIcon from '../../../assets/gender.svg';
import quantityIcon from '../../../assets/quantity.svg';
import levelIcon from '../../../assets/experience.svg';
import experienceIcon from '../../../assets/degree.svg';
import sendIcon from '../../../assets/send.svg';
import RecruitmentAPI from '../../../API/RecruitmentAPI';
import ProfileAPI from '../../../API/ProfileAPI';
import { Link, useParams } from 'react-router-dom';
import { AccountContext } from '../../../contexts/AccountContext';
import { toast } from 'react-toastify';
import convertSlugUrl from '../../../utils/convertSlugUrl';
import CvAPI from '../../../API/CvAPI';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const DetailsRecruitment = () => {
  const param = useParams();

  const {
    accountState: { isAuthenticated, user },
  } = useContext(AccountContext);

  const [loading, setLoading] = useState(false);
  const [recruitment, setRecruitment] = useState({});
  const [profile, setProfile] = useState({});
  const [existProfile, setExitsProfile] = useState(false);

  const [showModalSendCv, setShowModalSendCv] = useState(false);
  const [showModalExistCv, setShowModalExistCv] = useState(false);

  useEffect(() => {
    const getRecruitmentById = async () => {
      setLoading(true);
      const dataRecruitment = await RecruitmentAPI.getRecruitmentById(param.id);
      setRecruitment(dataRecruitment.recruitment);
      setLoading(false);
    };

    getRecruitmentById();
  }, [param]);

  useEffect(() => {
    if (user.role === 'candidate') {
      const getProfile = async () => {
        const dataProfile = await ProfileAPI.getProfile();
        setExitsProfile(dataProfile.existProfile);
        setProfile(dataProfile.profile);
      };

      getProfile();
    }
  }, [user.role]);

  const formatDate = moment(recruitment ? recruitment.deadline : null).format(
    'DD/MM/YYYY',
  );

  const openModal = () => {
    if (!isAuthenticated) {
      window.open('/login', '_blank');
    } else if (existProfile) {
      setShowModalSendCv(true);
    } else {
      setShowModalExistCv(true);
    }
  };

  const closeModalSendCv = () => {
    setShowModalSendCv(false);
  };

  const closeModalExistCv = () => {
    setShowModalExistCv(false);
    window.open(`/create-profile/${convertSlugUrl(user.fullName)}`, '_blank');
  };

  const sendCv = async () => {
    setShowModalSendCv(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (existProfile) {
      const formCv = {
        profileId: profile._id,
        recruitmentId: recruitment._id,
        receiver: recruitment.writer,
      };

      const cvData = await CvAPI.createCv(formCv);
      if (cvData.success) {
        toast.success(cvData.message);
      } else {
        toast.error(cvData.message);
      }
    }
  };

  if (loading) {
    return (
      <>
        <NavbarMenu />
        <Helmet>
          <title>
            {`Tuyển ${recruitment.title} làm việc tại ${recruitment.companyName} -
            FastJob`}
          </title>
        </Helmet>
        <div className="spinner-container">
          <Spinner animation="border" variant="success" />
        </div>
        <div style={{ paddingBottom: '2000px' }}></div>
      </>
    );
  } else {
    return (
      <>
        <Helmet>
          <title>
            {`Tuyển ${recruitment.title} làm việc tại ${recruitment.companyName} -
            FastJob`}
          </title>
        </Helmet>
        <div className="details-recruitment-wrapper">
          <SignupModal />

          <NavbarMenu />

          {(recruitment && recruitment.status) ||
          (recruitment && user.role === 'admin') ? (
            <Container>
              <p className="mt-3 text-capitalize">{recruitment.title}</p>

              <div className="header-details-recruitment">
                <Row>
                  <Col md={12} lg={10} className="d-flex">
                    <div className="img-wrapper d-flex justify-content-center">
                      <img
                        src={`${imgUrl}/${recruitment.img}`}
                        alt="img"
                        className="img-wrapper rounded-circle border border-gray no-select"
                      />
                    </div>
                    <div className="header-details-recruitment-wrapper">
                      <h1 className="title-name-details-recruitment text-capitalize">
                        {recruitment.title}
                      </h1>
                      <h5 className="company-details-recruitment text-capitalize">
                        {recruitment.companyName}
                      </h5>
                      <p>Hạn nộp hồ sơ: {formatDate}</p>
                    </div>
                  </Col>

                  <Col md={12} lg={2}>
                    {(user.role === 'candidate' || !isAuthenticated) && (
                      <Button
                        className="btn-recruitment"
                        variant="success"
                        onClick={openModal}
                      >
                        <img
                          src={sendIcon}
                          alt="sendIcon"
                          width="14"
                          height="14"
                          className="me-2 mb-1 no-select"
                        />
                        Ứng Tuyển Ngay
                      </Button>
                    )}
                  </Col>
                </Row>
              </div>

              <h1 className="title-details-recruitment">
                Thông tin tuyển dụng
              </h1>

              <div className="content-details-recruitment">
                <Row>
                  <Col md={12} lg={8} className="info-details-recruitment">
                    <Row>
                      <p className="fw-bold text-decoration-underline">
                        Thông tin chung
                      </p>
                    </Row>

                    <Row className="row-cols-2 row-cols-md-2">
                      <Col className="d-flex">
                        <img
                          src={salaryIcon}
                          alt="salaryIcon"
                          className="iconImg-info no-select"
                        />
                        <div className="info-recruitment">
                          <p className="fw-bold mb-0 text-success">Mức lương</p>
                          <p className="salary">{recruitment.salary}</p>
                        </div>
                      </Col>

                      <Col className="d-flex">
                        <img
                          src={quantityIcon}
                          alt="quantityIcon"
                          className="iconImg-info no-select"
                        />
                        <div className="info-recruitment">
                          <p className="fw-bold mb-0 text-success">
                            Số lượng tuyển
                          </p>
                          <p>{recruitment.quantity}</p>
                        </div>
                      </Col>

                      <Col className="d-flex">
                        <img
                          src={workingFormIcon}
                          alt="workingFormIcon"
                          className="iconImg-info no-select"
                        />
                        <div className="info-recruitment">
                          <p className="fw-bold mb-0 text-success">
                            Hình thức làm việc
                          </p>
                          <p>{recruitment.workingForm}</p>
                        </div>
                      </Col>

                      <Col className="d-flex">
                        <img
                          src={levelIcon}
                          alt="levelIcon"
                          className="iconImg-info no-select"
                        />
                        <div className="info-recruitment">
                          <p className="fw-bold mb-0 text-success">Cấp bậc</p>
                          <p>{recruitment.level}</p>
                        </div>
                      </Col>

                      <Col className="d-flex">
                        <img
                          src={genderIcon}
                          alt="genderIcon"
                          className="iconImg-info no-select"
                        />
                        <div className="info-recruitment">
                          <p className="fw-bold mb-0 text-success">Giới tính</p>
                          <p>{recruitment.gender}</p>
                        </div>
                      </Col>

                      <Col className="d-flex">
                        <img
                          src={experienceIcon}
                          alt="experienceIcon"
                          className="iconImg-info no-select"
                        />
                        <div className="info-recruitment">
                          <p className="fw-bold mb-0 text-success">
                            Kinh nghiệm
                          </p>
                          <p>{recruitment.experience}</p>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <p className="fw-bold text-decoration-underline">
                        Địa điểm làm việc
                      </p>
                      <p className="text-capitalize">{recruitment.address}</p>
                    </Row>
                  </Col>

                  <Col md={12} lg={4} className="report-recruitment-wrapper">
                    <div className="report-recruitment">
                      <p className="fw-bold text-decoration-underline">
                        Báo cáo tin tuyển dụng
                      </p>
                      <p>
                        Nếu bạn thấy rằng tin tuyển dụng này không đúng, hãy
                        phản ánh với chúng tôi
                      </p>
                      <Button
                        className="btn-report"
                        variant="light"
                        onClick={() => {
                          toast.success('Cảm ơn bạn đã gửi phản hồi.');
                        }}
                      >
                        Báo cáo tin tuyển dụng
                      </Button>
                    </div>

                    <p className="fw-bold mt-3 mb-2">Ngành nghề</p>
                    <Badge className="bg-secondary fw-normal">
                      {recruitment.career}
                    </Badge>

                    <p className="fw-bold mt-3 mb-2">Khu vực</p>
                    <Badge className="bg-secondary fw-normal">
                      {recruitment.location}
                    </Badge>
                  </Col>
                </Row>
              </div>

              <h1 className="title-details-recruitment">
                Chi tiết tin tuyển dụng
              </h1>

              <div className="description-details-recruitment">
                <div
                  dangerouslySetInnerHTML={{ __html: recruitment.description }}
                />
              </div>

              {user.role === 'candidate' || !isAuthenticated ? (
                <div>
                  <h1 className="title-details-recruitment">
                    Cách thức ứng tuyển
                  </h1>
                  <p className="mb-2">
                    Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{' '}
                    <span className="text-success">Ứng tuyển ngay</span> dưới
                    đây.
                  </p>
                  <Button
                    size="lg"
                    className="btn-recruitment"
                    variant="success"
                    onClick={openModal}
                  >
                    <img
                      src={sendIcon}
                      alt="sendIcon"
                      width="20"
                      height="20"
                      className="me-2 mb-1 no-select"
                    />
                    Ứng Tuyển Ngay
                  </Button>
                  <p className="mt-2 mb-4">Hạn nộp hồ sơ: {formatDate}</p>
                </div>
              ) : (
                <div className="pb-5"></div>
              )}
            </Container>
          ) : (
            <Container className="alert-recruitment mt-4">
              <Alert className="mt-3" variant="warning">
                Tin tuyển dụng không tồn tại hoặc đã bị xóa.
              </Alert>
            </Container>
          )}

          <Modal centered show={showModalSendCv} onHide={closeModalSendCv}>
            <Modal.Header
              style={{ display: 'block', backgroundColor: '#f8f9fa' }}
            >
              <Modal.Title>
                <h4 className="text-center">Lưu ý!</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="text-center">
                Bạn có chắc chắn muốn gửi hồ sơ? Hoặc có thể kiểm tra lại thông
                tin hồ sơ{' '}
                <Link
                  to="/profile"
                  target="_blank"
                  style={{ color: '#2fb380' }}
                >
                  tại đây
                </Link>{' '}
                trước khi gửi.
              </h6>
            </Modal.Body>
            <Modal.Footer>
              <Container>
                <Row>
                  <Col className="text-center">
                    <Button variant="success" onClick={sendCv}>
                      Gửi hồ sơ
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Footer>
          </Modal>

          <Modal centered show={showModalExistCv} onHide={closeModalExistCv}>
            <Modal.Header
              style={{ display: 'block', backgroundColor: '#f8f9fa' }}
            >
              <Modal.Title>
                <h4 className="text-center">Lưu ý!</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="text-center">
                Bạn chưa tạo hồ sơ ứng tuyển, vui lòng nhấn vào nút bên dưới để
                bắt đầu tạo hồ sơ.
              </h6>
            </Modal.Body>
            <Modal.Footer>
              <Container>
                <Row>
                  <Col className="text-center">
                    <Button variant="success" onClick={closeModalExistCv}>
                      Tạo hồ sơ
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Footer>
          </Modal>

          <Footer />
        </div>
      </>
    );
  }
};

export default DetailsRecruitment;
