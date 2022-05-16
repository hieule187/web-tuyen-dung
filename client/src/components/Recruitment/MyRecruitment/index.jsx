import React, { useContext, useEffect, useState } from 'react';
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
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import lockIcon from '../../../assets/lock.svg';
import unlockIcon from '../../../assets/unlock.svg';
import searchIcon from '../../../assets/search.svg';
import RecruitmentAPI from '../../../API/RecruitmentAPI';
import { AccountContext } from '../../../contexts/AccountContext';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import convertSlugUrl from '../../../utils/convertSlugUrl';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const MyRecruitment = () => {
  const {
    accountState: { user },
  } = useContext(AccountContext);

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
    const getMyRecruitment = async () => {
      setLoading(true);
      const recruitmentData = await RecruitmentAPI.getMyRecruitment();
      if (recruitmentData.success) {
        setRecruitments(recruitmentData.recruitment);
        setPageCount(recruitmentData.totalPages);
        setLoading(false);
      } else {
        setExistRecruitment(false);
        setLoading(false);
      }
    };
    getMyRecruitment();
  }, []);

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const dataInPage = await RecruitmentAPI.getMyRecruitmentPage(currentPage);
    setRecruitments(dataInPage.recruitment);
  };

  const reloadDataInPage = async () => {
    const recruitmentData = await RecruitmentAPI.getMyRecruitment();
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

  const handleLockRecruitment = async (recruitmentId) => {
    const lockRecruitment = await RecruitmentAPI.lockRecruitmentById(
      recruitmentId,
    );
    if (lockRecruitment.success) {
      reloadDataInPage();
      toast.success(lockRecruitment.message);
    } else {
      toast.error(lockRecruitment.message);
    }
  };

  const handleUnlockRecruitment = async (recruitmentId) => {
    const unlockRecruitment = await RecruitmentAPI.unlockRecruitmentById(
      recruitmentId,
    );
    if (unlockRecruitment.success) {
      reloadDataInPage();
      toast.success(unlockRecruitment.message);
    } else {
      toast.error(unlockRecruitment.message);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const recruitmentSearchData = await RecruitmentAPI.getSearchMyRecruitment(
      key,
    );
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
    const dataInPageSearch = await RecruitmentAPI.getSearchMyRecruitmentPage(
      key,
      currentPage,
    );
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
        <div className="my-recruitment-wrapper">
          <Container className="mt-4">
            <h1 className="my-recruitment-header">Quản lý tin tuyển dụng</h1>
          </Container>

          {existRecruitment ? (
            <Container className="mt-4 pb-5">
              <Row>
                <Col md={12} lg={6}>
                  <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm theo tiêu đề tin tuyển dụng"
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
                                recruitment.status && recruitment.display
                                  ? 'bg-success fw-normal'
                                  : recruitment.status && !recruitment.display
                                  ? 'bg-danger fw-normal'
                                  : 'bg-secondary fw-normal'
                              }
                            >
                              {recruitment.status && recruitment.display
                                ? 'Đang hiển thị'
                                : recruitment.status && !recruitment.display
                                ? 'Khóa hiển thị'
                                : 'Chưa phê duyệt'}
                            </Badge>
                            <Badge className="bg-secondary fw-normal">
                              {moment(
                                recruitment ? recruitment.updatedAt : null,
                              ).format('HH:mm-DD/MM/YYYY')}
                            </Badge>
                          </div>
                          <Card.Title className="title-card-my-recruitment">
                            <h1 className="title-my-recruitment text-capitalize mt-3 mb-0">
                              {recruitment.title}
                            </h1>
                          </Card.Title>
                          <Card.Text className="mt-3">
                            <Link
                              to={`/see-cv/${convertSlugUrl(
                                recruitment.title,
                              )}/${recruitment._id}`}
                              style={{
                                textDecoration: 'none',
                                color: '#212529',
                              }}
                            >
                              <span className="open-cv">
                                Xem{' '}
                                <span className="fw-bold text-success">CV</span>{' '}
                                ứng tuyển
                              </span>
                            </Link>
                          </Card.Text>

                          <div className="d-flex justify-content-between">
                            <div>
                              <Link
                                to={`/recruitment/${convertSlugUrl(
                                  recruitment.title,
                                )}/${recruitment._id}`}
                                target="_blank"
                              >
                                <img
                                  className="no-select show-btn me-4 btn-my-recruitment"
                                  src={showIcon}
                                  alt="showIcon"
                                />
                              </Link>
                              <Link
                                to={`/update-recruitment/${convertSlugUrl(
                                  recruitment.title,
                                )}/${recruitment._id}`}
                              >
                                <img
                                  className="no-select me-4 btn-my-recruitment"
                                  src={editIcon}
                                  alt="editIcon"
                                />
                              </Link>
                              <img
                                className="no-select delete-btn me-4 btn-my-recruitment"
                                src={deleteIcon}
                                alt="deleteIcon"
                                onClick={() => openModalDelete(recruitment._id)}
                              />
                              {recruitment.status && !recruitment.display ? (
                                <img
                                  className="no-select btn-my-recruitment"
                                  src={lockIcon}
                                  alt="lockIcon"
                                  onClick={() =>
                                    handleUnlockRecruitment(recruitment._id)
                                  }
                                />
                              ) : recruitment.status && recruitment.display ? (
                                <img
                                  className="no-select btn-my-recruitment"
                                  src={unlockIcon}
                                  alt="unlockIcon"
                                  onClick={() =>
                                    handleLockRecruitment(recruitment._id)
                                  }
                                />
                              ) : null}
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
            <Container className="mt-4" style={{ paddingBottom: '350px' }}>
              <Card className="text-center rounded-3">
                <Card.Header as="h1" className="profile-header">
                  Xin chào <span className="text-success">{user.fullName}</span>
                </Card.Header>
                <Card.Body>
                  <Card.Title>
                    Chào mừng bạn đến với{' '}
                    <span className="fw-bold">
                      Fast<span className="text-success">Job</span>
                    </span>
                  </Card.Title>
                  <Card.Text>
                    Bạn chưa đăng tin tuyển dụng nào, hãy nhấn vào nút bên dưới
                    để bắt đầu đăng tin tuyển dụng !
                  </Card.Text>
                  <Button
                    to={`/create-recruitment/${convertSlugUrl(user.fullName)}`}
                    as={Link}
                    size="lg"
                    variant="success"
                  >
                    Đăng tin tuyển dụng
                  </Button>
                </Card.Body>
              </Card>
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

export default MyRecruitment;
