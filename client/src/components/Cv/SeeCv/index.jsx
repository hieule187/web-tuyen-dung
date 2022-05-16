import React, { useEffect, useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import showIcon from '../../../assets/show.svg';
import browseIcon from '../../../assets/browse.svg';
import missIcon from '../../../assets/miss.svg';
import searchIcon from '../../../assets/search.svg';
import userIcon from '../../../assets/person-circle.svg';
import phoneIcon from '../../../assets/telephone.svg';
import emailIcon from '../../../assets/email.svg';
import CvAPI from '../../../API/CvAPI';
import RecruitmentAPI from '../../../API/RecruitmentAPI';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import convertSlugUrl from '../../../utils/convertSlugUrl';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const SeeCv = () => {
  const param = useParams();

  const [loading, setLoading] = useState(false);
  const [existCv, setExistCv] = useState(true);
  const [cvs, setCvs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [recruitment, setRecruitment] = useState({});
  const [key, setKey] = useState('');
  const [searched, setSearched] = useState(false);
  const [pageCountSearch, setPageCountSearch] = useState(0);
  const [totalQuantitySearch, setTotalQuantitySearch] = useState(0);

  useEffect(() => {
    const getCvByRecruitmentId = async () => {
      setLoading(true);
      const cvData = await CvAPI.getCvByRecruitmentId(param.id);
      if (cvData.success) {
        setCvs(cvData.cv);
        setPageCount(cvData.totalPages);
        setLoading(false);
      } else {
        setExistCv(false);
        setLoading(false);
      }
    };
    getCvByRecruitmentId();
  }, [param]);

  useEffect(() => {
    const getRecruitmentById = async () => {
      const dataRecruitment = await RecruitmentAPI.getRecruitmentById(param.id);
      setRecruitment(dataRecruitment.recruitment);
    };

    getRecruitmentById();
  }, [param]);

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const dataInPage = await CvAPI.getCvByRecruitmentIdPage(
      param.id,
      currentPage,
    );
    setCvs(dataInPage.cv);
  };

  const reloadDataInPage = async () => {
    const cvData = await CvAPI.getCvByRecruitmentId(param.id);
    if (cvData.success) {
      setCvs(cvData.cv);
      setPageCount(cvData.totalPages);
    } else {
      setExistCv(false);
    }
  };

  const handleBrowseCv = async (cvId) => {
    const browseCv = await CvAPI.browseCvById(cvId);
    if (browseCv.success) {
      reloadDataInPage();
      toast.success(browseCv.message);
    } else {
      toast.error(browseCv.message);
    }
  };

  const handleMissCv = async (cvId) => {
    const missCv = await CvAPI.missCvById(cvId);
    if (missCv.success) {
      reloadDataInPage();
      toast.success(missCv.message);
    } else {
      toast.error(missCv.message);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const cvSearchData = await CvAPI.getSearchCvByRecruitmentId(param.id, key);
    if (cvSearchData.success) {
      setSearched(true);
      setCvs(cvSearchData.cv);
      setPageCountSearch(cvSearchData.totalPages);
      setTotalQuantitySearch(cvSearchData.totalQuantity);
    } else {
      setSearched(true);
      setExistCv(false);
    }
  };

  const handlePageSearchClick = async (data) => {
    let currentPage = data.selected;
    const dataInPageSearch = await CvAPI.getSearchCvByRecruitmentIdPage(
      param.id,
      key,
      currentPage,
    );
    setSearched(true);
    setCvs(dataInPageSearch.cv);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Xem CV ứng tuyển - FastJob</title>
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
          <title>Xem CV ứng tuyển - FastJob</title>
        </Helmet>
        <div className="seeCv-wrapper">
          <Container className="mt-4">
            <h1 className="seeCv-header text-capitalize">
              {recruitment.title}
            </h1>
            <p className="seeCv-description text-capitalize">
              {recruitment.companyName}
            </p>
          </Container>

          {existCv ? (
            <Container className="mt-4 pb-5">
              <Row>
                <Col md={12} lg={6}>
                  <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm theo họ tên, số điện thoại, email ứng viên"
                      className="me-2"
                      name="key"
                      required
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                    <Button variant="success" type="submit">
                      <img
                        src={searchIcon}
                        alt="searchIcon"
                        width="20"
                        height="20"
                        className="no-select"
                      />
                    </Button>
                  </Form>
                </Col>
              </Row>

              {searched && (
                <p className="mt-4 mb-0">
                  Tìm thấy{' '}
                  <span className="fw-bold text-success">
                    {totalQuantitySearch}
                  </span>{' '}
                  CV ứng tuyển
                </p>
              )}

              <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
                {cvs.map((cv) => {
                  return (
                    <Col key={cv._id} className="mt-4">
                      <Card className="card-border">
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between">
                            <Badge
                              className={
                                cv.status
                                  ? 'bg-success fw-normal'
                                  : 'bg-secondary fw-normal'
                              }
                            >
                              {cv.status ? 'Đã phê duyệt' : 'Chưa phê duyệt'}
                            </Badge>
                            <Badge className="bg-secondary fw-normal">
                              {moment(cv ? cv.createdAt : null).format(
                                'HH:mm-DD/MM/YYYY',
                              )}
                            </Badge>
                          </div>
                          <Card.Title className="title-card-seeCv">
                            <h1 className="title-seeCv mt-3 mb-0">
                              <img
                                src={userIcon}
                                alt="userIcon"
                                width="20"
                                height="20"
                                className="mb-1 me-2 no-select"
                              />
                              {cv.profile.fullName}
                            </h1>
                          </Card.Title>
                          <Card.Text className="mb-1">
                            <span>
                              <img
                                src={phoneIcon}
                                alt="phoneIcon"
                                className="mb-1 me-2 no-select"
                              />
                              {cv.profile.phoneNumber}
                            </span>
                          </Card.Text>
                          <Card.Text className="mb-3">
                            <span>
                              <img
                                src={emailIcon}
                                alt="emailIcon"
                                className="email-seeCv me-2 no-select"
                              />
                              {cv.profile.email}
                            </span>
                          </Card.Text>

                          <div className="d-flex justify-content-between">
                            <Button
                              to={`/see-profile/${convertSlugUrl(
                                cv.profile.fullName,
                              )}/${cv._id}`}
                              as={Link}
                              target="_blank"
                              variant="light"
                            >
                              <img
                                className="no-select showCv-btn"
                                src={showIcon}
                                alt="showIcon"
                              />
                            </Button>
                            <div>
                              {!cv.status && (
                                <Button
                                  variant="light"
                                  onClick={() => handleBrowseCv(cv._id)}
                                >
                                  <img
                                    className="no-select browseCv-btn"
                                    src={browseIcon}
                                    alt="browseIcon"
                                  />
                                  Duyệt
                                </Button>
                              )}
                              {!cv.status && !cv.failed && (
                                <Button
                                  className="ms-2"
                                  variant="light"
                                  onClick={() => handleMissCv(cv._id)}
                                >
                                  <img
                                    className="no-select deleteCv-btn"
                                    src={missIcon}
                                    alt="missIcon"
                                  />
                                  Loại
                                </Button>
                              )}
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              <div className="mt-5">
                <ReactPaginate
                  previousLabel={'Trước'}
                  nextLabel={'Tiếp'}
                  breakLabel={'...'}
                  pageCount={searched ? pageCountSearch : pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={
                    searched ? handlePageSearchClick : handlePageClick
                  }
                  containerClassName={'pagination justify-content-center mb-0'}
                  pageClassName={'page-item'}
                  pageLinkClassName={'page-link no-select'}
                  previousClassName={'page-item'}
                  previousLinkClassName={'page-link no-select'}
                  nextClassName={'page-item'}
                  nextLinkClassName={'page-link no-select'}
                  breakClassName={'page-item'}
                  breakLinkClassName={'page-link no-select'}
                  activeClassName={'active'}
                />
              </div>
            </Container>
          ) : searched ? (
            <Container className="mt-4" style={{ paddingBottom: '500px' }}>
              <Alert variant="warning">Không tìm thấy CV nào phù hợp.</Alert>
            </Container>
          ) : (
            <Container className="mt-4" style={{ paddingBottom: '500px' }}>
              <Alert variant="warning">
                Tin tuyển dụng hiện chưa có cv ứng tuyển.
              </Alert>
            </Container>
          )}
        </div>
      </>
    );
  }
};

export default SeeCv;
