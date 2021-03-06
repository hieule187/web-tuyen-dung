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
import searchIcon from '../../../assets/search.svg';
import CvAPI from '../../../API/CvAPI';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import convertSlugUrl from '../../../utils/convertSlugUrl';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const MyCv = () => {
  const [loading, setLoading] = useState(false);
  const [existCv, setExistCv] = useState(true);
  const [cvs, setCvs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [cvSelect, setCvSelect] = useState({});
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [key, setKey] = useState('');
  const [searched, setSearched] = useState(false);
  const [pageCountSearch, setPageCountSearch] = useState(0);
  const [totalQuantitySearch, setTotalQuantitySearch] = useState(0);

  useEffect(() => {
    const getMyCv = async () => {
      setLoading(true);
      const cvData = await CvAPI.getMyCv();
      if (cvData.success) {
        setCvs(cvData.cv);
        setPageCount(cvData.totalPages);
        setLoading(false);
      } else {
        setExistCv(false);
        setLoading(false);
      }
    };
    getMyCv();
  }, []);

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const dataInPage = await CvAPI.getMyCvPage(currentPage);
    setCvs(dataInPage.cv);
  };

  const reloadDataInPage = async () => {
    const cvData = await CvAPI.getMyCv();
    if (cvData.success) {
      setCvs(cvData.cv);
      setPageCount(cvData.totalPages);
    } else {
      setExistCv(false);
    }
  };

  const findCv = (cvId) => {
    const cvSelected = cvs.find((cv) => cv._id === cvId);
    setCvSelect(cvSelected);
  };

  const openModalDelete = (cvId) => {
    findCv(cvId);
    setShowModalDelete(true);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const handleDeleteCv = async () => {
    await CvAPI.deleteCvById(cvSelect._id);
    reloadDataInPage();
    closeModalDelete();
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const cvSearchData = await CvAPI.getSearchMyCv(key);
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
    const dataInPageSearch = await CvAPI.getSearchMyCvPage(key, currentPage);
    setSearched(true);
    setCvs(dataInPageSearch.cv);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Tin tuy???n d???ng ???? g???i h??? s?? - FastJob</title>
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
          <title>Tin tuy???n d???ng ???? g???i h??? s?? - FastJob</title>
        </Helmet>
        <div className="my-cv-wrapper">
          <Container className="mt-4">
            <h1 className="my-cv-header">Tin tuy???n d???ng ???? g???i h??? s??</h1>
          </Container>

          {existCv ? (
            <Container className="mt-4 pb-5">
              <Row>
                <Col md={12} lg={6}>
                  <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="T??m ki???m theo ti??u ?????, t??n c??ng ty tin tuy???n d???ng"
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
                  T??m th???y{' '}
                  <span className="fw-bold text-success">
                    {totalQuantitySearch}
                  </span>{' '}
                  tin tuy???n d???ng
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
                                cv.status && !cv.failed
                                  ? 'bg-success fw-normal'
                                  : !cv.status && cv.failed
                                  ? 'bg-danger fw-normal'
                                  : 'bg-secondary fw-normal'
                              }
                            >
                              {cv.status && !cv.failed
                                ? '???? ph?? duy???t'
                                : !cv.status && cv.failed
                                ? 'B??? lo???i'
                                : 'Ch??? ph?? duy???t'}
                            </Badge>
                            <Badge className="bg-secondary fw-normal">
                              {cv.recruitment.location}
                            </Badge>
                          </div>
                          <Card.Title className="title-card-my-cv">
                            <h1 className="title-my-cv text-capitalize mt-3 mb-0">
                              {cv.title}
                            </h1>

                            <p className="company-my-cv">{cv.companyName}</p>
                          </Card.Title>

                          {cv.status && !cv.failed ? (
                            <Alert variant="success">
                              Vui l??ng th?????ng xuy??n ki???m tra h???p th?? c???a b???n ?????
                              nh???n th?? m???i ph???ng v???n t??? nh?? tuy???n d???ng.
                            </Alert>
                          ) : !cv.status && cv.failed ? (
                            <Alert variant="danger">
                              R???t ti???c h??? s?? xin vi???c c???a b???n ch??a ?????t y??u c???u
                              ?????i v???i v??? tr?? ???ng tuy???n.
                            </Alert>
                          ) : (
                            <Alert variant="warning">
                              H??? s?? c???a b???n ???? ???????c g???i ??i th??nh c??ng, vui l??ng
                              ch??? ph???n h???i t??? nh?? tuy???n d???ng.
                            </Alert>
                          )}

                          <div className="d-flex justify-content-between">
                            <div>
                              <Link
                                to={`/recruitment/${convertSlugUrl(
                                  cv.recruitment.title,
                                )}/${cv.recruitmentId}`}
                                target="_blank"
                              >
                                <img
                                  className="no-select show-btn me-4 btn-my-cv"
                                  src={showIcon}
                                  alt="showIcon"
                                />
                              </Link>
                              <img
                                className="no-select delete-btn me-4 btn-my-cv"
                                src={deleteIcon}
                                alt="deleteIcon"
                                onClick={() => openModalDelete(cv._id)}
                              />
                            </div>
                            <div>
                              <Badge className="bg-secondary fw-normal">
                                Ng??y g???i:{' '}
                                {moment(cv ? cv.createdAt : null).format(
                                  'DD/MM/YYYY',
                                )}
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
                  previousLabel={'Tr?????c'}
                  nextLabel={'Ti???p'}
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
                Kh??ng t??m th???y tin tuy???n d???ng n??o ph?? h???p.
              </Alert>
            </Container>
          ) : (
            <Container className="mt-4" style={{ paddingBottom: '500px' }}>
              <Alert variant="warning">B???n ch??a g???i h??? s?? ???ng tuy???n n??o.</Alert>
            </Container>
          )}

          <Modal centered show={showModalDelete} onHide={closeModalDelete}>
            <Modal.Header
              style={{ display: 'block', backgroundColor: '#f8f9fa' }}
            >
              <Modal.Title>
                <h4 className="text-center">L??u ??!</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="text-center">
                Sau khi x??a s??? kh??ng th??? kh??i ph???c, b???n c?? ch???c ch???n mu???n x??a?
              </h6>
            </Modal.Body>
            <Modal.Footer>
              <Container>
                <Row>
                  <Col className="text-center">
                    <Button variant="light" onClick={handleDeleteCv}>
                      X??a
                    </Button>
                  </Col>
                  <Col className="text-center">
                    <Button variant="success" onClick={closeModalDelete}>
                      H???y b???
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

export default MyCv;
