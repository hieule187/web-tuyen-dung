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
import salaryIcon from '../../../assets/salary.svg';
import workingFormIcon from '../../../assets/bag.svg';
import genderIcon from '../../../assets/gender.svg';
import quantityIcon from '../../../assets/quantity.svg';
import levelIcon from '../../../assets/experience.svg';
import experienceIcon from '../../../assets/degree.svg';
import sendIcon from '../../../assets/send.svg';
import RecruitmentAPI from '../../../API/RecruitmentAPI';
import { useParams } from 'react-router-dom';
import { AccountContext } from '../../../contexts/AccountContext';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/vi';

const DetailsRecruitment = () => {
  const param = useParams();

  const {
    accountState: { isAuthenticated, user },
  } = useContext(AccountContext);

  const [recruitment, setRecruitment] = useState({});

  useEffect(() => {
    const getRecruitmentById = async () => {
      const dataRecruitment = await RecruitmentAPI.getRecruitmentById(param.id);
      setRecruitment(dataRecruitment.recruitment);
    };

    getRecruitmentById();
  }, [param]);

  const formatDate = moment(recruitment ? recruitment.deadline : null).format(
    'DD/MM/YYYY',
  );

  return (
    <div className="details-recruitment-wrapper">
      <SignupModal />

      <NavbarMenu />

      {recruitment ? (
        <Container>
          <p className="mt-3 text-capitalize">{recruitment.title}</p>

          <div className="header-details-recruitment">
            <Row>
              <Col md={12} lg={10} className="d-flex">
                <div className="img-wrapper d-flex justify-content-center">
                  <img
                    src={`${imgUrl}/${recruitment.img}`}
                    alt="img"
                    className="rounded-circle border border-gray no-select"
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
                  <Button className="btn-recruitment" variant="success">
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

          <h1 className="title-details-recruitment">Thông tin tuyển dụng</h1>

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
                      <p>{recruitment.quantity} người</p>
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
                      <p className="fw-bold mb-0 text-success">Kinh nghiệm</p>
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
                    Nếu bạn thấy rằng tin tuyển dụng này không đúng, hãy phản
                    ánh với chúng tôi
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

          <h1 className="title-details-recruitment">Chi tiết tin tuyển dụng</h1>

          <div className="description-details-recruitment">
            <div
              dangerouslySetInnerHTML={{ __html: recruitment.description }}
            />
          </div>

          {user.role === 'candidate' || !isAuthenticated ? (
            <div>
              <h1 className="title-details-recruitment">Cách thức ứng tuyển</h1>
              <p>
                Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{' '}
                <span className="text-success">Ứng tuyển ngay</span> dưới đây.
              </p>
              <Button size="lg" className="btn-recruitment" variant="success">
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
        <Container className="alert-recruitment">
          <Alert className="mt-3" variant="danger">
            Tin tuyển dụng không tồn tại hoặc đã bị xóa.
          </Alert>
        </Container>
      )}

      <Footer />
    </div>
  );
};

export default DetailsRecruitment;
