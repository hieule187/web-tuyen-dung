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
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import showIcon from '../../../assets/show.svg';
import deleteIcon from '../../../assets/delete.svg';
import lockIcon from '../../../assets/lock.svg';
import unlockIcon from '../../../assets/unlock.svg';
import searchIcon from '../../../assets/search.svg';
import RecruitmentAPI from '../../../API/RecruitmentAPI';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import convertSlugUrl from '../../../utils/convertSlugUrl';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const RecruitmentManagement = () => {
  const [loading, setLoading] = useState(false);
  const [existRecruitment, setExistRecruitment] = useState(true);
  const [recruitments, setRecruitments] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [recruitmentSelect, setRecruitmentSelect] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [key, setKey] = useState('');
  const [searched, setSearched] = useState(false);
  const [pageCountSearch, setPageCountSearch] = useState(0);
  const [totalQuantitySearch, setTotalQuantitySearch] = useState(0);

  useEffect(() => {
    const getRecruitmentManagement = async () => {
      setLoading(true);
      const recruitmentData = await RecruitmentAPI.getRecruitmentManagement();
      if (recruitmentData.success) {
        setRecruitments(recruitmentData.recruitment);
        setPageCount(recruitmentData.totalPages);
        setLoading(false);
      } else {
        setExistRecruitment(false);
        setLoading(false);
      }
    };
    getRecruitmentManagement();
  }, []);

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const dataInPage = await RecruitmentAPI.getRecruitmentManagementPage(
      currentPage,
    );
    setRecruitments(dataInPage.recruitment);
  };

  const reloadDataInPage = async () => {
    const recruitmentData = await RecruitmentAPI.getRecruitmentManagement();
    if (recruitmentData.success) {
      setRecruitments(recruitmentData.recruitment);
      setPageCount(recruitmentData.totalPages);
    } else {
      setExistRecruitment(false);
    }
  };

  const findRecruitment = (recruitmentId) => {
    const recruitmentSelected = recruitments.find(
      (recruitment) => recruitment._id === recruitmentId,
    );
    setRecruitmentSelect(recruitmentSelected);
  };

  const openModalDelete = (recruitmentId) => {
    findRecruitment(recruitmentId);
    setShowModalDelete(true);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleDeleteRecruitment = async () => {
    await RecruitmentAPI.deleteRecruitmentById(recruitmentSelect._id);
    reloadDataInPage();
    closeModalDelete();
  };

  const handleMissRecruitment = async (recruitmentId) => {
    const missRecruitment = await RecruitmentAPI.missRecruitmentById(
      recruitmentId,
    );
    if (missRecruitment.success) {
      reloadDataInPage();
      toast.success(missRecruitment.message);
    } else {
      toast.error(missRecruitment.message);
    }
  };

  const handleBrowseRecruitment = async (recruitmentId) => {
    const browseRecruitment = await RecruitmentAPI.browseRecruitmentById(
      recruitmentId,
    );
    if (browseRecruitment.success) {
      reloadDataInPage();
      toast.success(browseRecruitment.message);
    } else {
      toast.error(browseRecruitment.message);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const recruitmentSearchData =
      await RecruitmentAPI.getSearchRecruitmentManagement(key);
    if (recruitmentSearchData.success) {
      setSearched(true);
      setRecruitments(recruitmentSearchData.recruitment);
      setPageCountSearch(recruitmentSearchData.totalPages);
      setTotalQuantitySearch(recruitmentSearchData.totalQuantity);
    } else {
      setSearched(true);
      setExistRecruitment(false);
    }
  };

  const handlePageSearchClick = async (data) => {
    let currentPage = data.selected;
    const dataInPageSearch =
      await RecruitmentAPI.getSearchRecruitmentManagementPage(key, currentPage);
    setSearched(true);
    setRecruitments(dataInPageSearch.recruitment);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Quản lý tin tuyển dụng - FastJob</title>
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
          <title>Quản lý tin tuyển dụng - FastJob</title>
        </Helmet>
        <div className="recruitment-management-wrapper">
          <Container className="mt-4">
            <h1 className="recruitment-management-header">
              Quản lý tin tuyển dụng
            </h1>
          </Container>

          {existRecruitment ? (
            <Container className="mt-4 pb-5">
              <Row>
                <Col md={12} lg={6}>
                  <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm theo tiêu đề, tên công ty, ngành nghề, khu vực tin tuyển dụng"
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
                  tin tuyển dụng
                </p>
              )}

              <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
                {recruitments.map((recruitment) => {
                  return (
                    <Col key={recruitment._id} className="mt-4">
                      <Card className="card-border">
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between">
                            <Badge
                              className={
                                recruitment.status
                                  ? 'bg-success fw-normal'
                                  : 'bg-secondary fw-normal'
                              }
                            >
                              {recruitment.status
                                ? 'Đã phê duyệt'
                                : 'Chưa phê duyệt'}
                            </Badge>
                            <Badge className="bg-secondary fw-normal">
                              {moment(
                                recruitment ? recruitment.updatedAt : null,
                              ).format('HH:mm-DD/MM/YYYY')}
                            </Badge>
                          </div>
                          <Card.Title className="title-card-recruitment-management">
                            <h1 className="title-recruitment-management text-capitalize mt-3 mb-0">
                              {recruitment.title}
                            </h1>

                            <p className="company-recruitment-management">
                              {recruitment.companyName}
                            </p>
                          </Card.Title>

                          <div className="d-flex justify-content-between">
                            <div>
                              <Link
                                to={`/recruitment/${convertSlugUrl(
                                  recruitment.title,
                                )}/${recruitment._id}`}
                                target="_blank"
                              >
                                <img
                                  className="no-select show-btn me-4 btn-recruitment-management"
                                  src={showIcon}
                                  alt="showIcon"
                                />
                              </Link>
                              <img
                                className="no-select delete-btn me-4 btn-recruitment-management"
                                src={deleteIcon}
                                alt="deleteIcon"
                                onClick={() => openModalDelete(recruitment._id)}
                              />
                              {!recruitment.status ? (
                                <img
                                  className="no-select btn-recruitment-management"
                                  src={lockIcon}
                                  alt="lockIcon"
                                  onClick={() =>
                                    handleBrowseRecruitment(recruitment._id)
                                  }
                                />
                              ) : (
                                <img
                                  className="no-select btn-recruitment-management"
                                  src={unlockIcon}
                                  alt="unlockIcon"
                                  onClick={() =>
                                    handleMissRecruitment(recruitment._id)
                                  }
                                />
                              )}
                            </div>
                            <div>
                              <Badge className="bg-secondary fw-normal">
                                Hạn:{' '}
                                {moment(
                                  recruitment ? recruitment.deadline : null,
                                ).format('DD/MM/YYYY')}
                              </Badge>
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
              <Alert variant="warning">
                Không tìm thấy tin tuyển dụng nào phù hợp.
              </Alert>
            </Container>
          ) : (
            <Container className="mt-4" style={{ paddingBottom: '500px' }}>
              <Alert variant="warning">
                Hiện chưa có tin tuyển dụng nào đăng tuyển.
              </Alert>
            </Container>
          )}

          <Modal centered show={showModalDelete} onHide={closeModalDelete}>
            <Modal.Header
              style={{ display: 'block', backgroundColor: '#f8f9fa' }}
            >
              <Modal.Title>
                <h4 className="text-center">Lưu ý!</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="text-center">
                Sau khi xóa sẽ không thể khôi phục, bạn có chắc chắn muốn xóa
                tin tuyển dụng này?
              </h6>
            </Modal.Body>
            <Modal.Footer>
              <Container>
                <Row>
                  <Col className="text-center">
                    <Button variant="light" onClick={handleDeleteRecruitment}>
                      Xóa tin
                    </Button>
                  </Col>
                  <Col className="text-center">
                    <Button variant="success" onClick={closeModalDelete}>
                      Hủy bỏ
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
};

export default RecruitmentManagement;
