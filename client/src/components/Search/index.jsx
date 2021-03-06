import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import careerData from '../../data/careerData';
import locationData from '../../data/locationData';
import searchIcon from '../../assets/search.svg';
import NavbarMenu from '../NavbarMenu';
import Footer from '../Footer';
import { imgUrl } from '../../contexts/constants';
import ReactPaginate from 'react-paginate';
import RecruitmentAPI from '../../API/RecruitmentAPI';
import convertSlugUrl from '../../utils/convertSlugUrl';
import { AccountContext } from '../../contexts/AccountContext';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const Search = () => {
  // Context
  const { quickSearch } = useContext(AccountContext);

  const [searchForm, setSearchForm] = useState({
    key: '',
    career: '',
    location: '',
    salary: '',
    workingForm: '',
    level: '',
    experience: '',
  });

  const { key, career, location, salary, workingForm, level, experience } =
    searchForm;

  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [recruitments, setRecruitments] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [existRecruitment, setExistRecruitment] = useState(true);

  const onChangeSearchForm = (event) => {
    setSearchForm({
      ...searchForm,
      [event.target.name]: event.target.value,
    });
    setRecruitments([]);
    setSearched(false);
    setExistRecruitment(true);
  };

  useEffect(() => {
    if (quickSearch !== '') {
      setSearchForm({
        ...searchForm,
        career: quickSearch,
      });

      const getSearchRecruitment = async () => {
        setLoading(true);
        const recruitmentSearchData = await RecruitmentAPI.getSearchRecruitment(
          key,
          quickSearch,
          location,
          salary,
          workingForm,
          level,
          experience,
        );
        if (recruitmentSearchData.success) {
          setSearched(true);
          setRecruitments(recruitmentSearchData.recruitment);
          setPageCount(recruitmentSearchData.totalPages);
          setLoading(false);
        } else {
          setSearched(true);
          setExistRecruitment(false);
          setLoading(false);
        }
      };
      getSearchRecruitment();
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    const recruitmentSearchData = await RecruitmentAPI.getSearchRecruitment(
      key,
      career,
      location,
      salary,
      workingForm,
      level,
      experience,
    );
    if (recruitmentSearchData.success) {
      setSearched(true);
      setRecruitments(recruitmentSearchData.recruitment);
      setPageCount(recruitmentSearchData.totalPages);
      setLoading(false);
    } else {
      setSearched(true);
      setExistRecruitment(false);
      setLoading(false);
    }
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const dataInPageSearch = await RecruitmentAPI.getSearchRecruitmentPage(
      key,
      career,
      location,
      salary,
      workingForm,
      level,
      experience,
      currentPage,
    );
    setSearched(true);
    setRecruitments(dataInPageSearch.recruitment);
  };

  return (
    <>
      <Helmet>
        <title>T??m ki???m vi???c l??m - FastJob</title>
      </Helmet>
      <div className="search-wrapper">
        <NavbarMenu />

        <Container className="mt-4">
          <h1 className="search-header">T??m ki???m tin tuy???n d???ng</h1>
        </Container>

        <Container className="mt-2">
          <Form onSubmit={handleSearch}>
            <Row>
              <Col xs={12} md={6} xl={3}>
                <Form.Control
                  type="search"
                  placeholder="T??n c??ng vi???c ..."
                  name="key"
                  className="me-2 mt-3"
                  value={key}
                  onChange={onChangeSearchForm}
                />
              </Col>

              <Col xs={12} md={6} xl={3}>
                <Form.Select
                  name="career"
                  className="me-2 mt-3"
                  value={career}
                  onChange={onChangeSearchForm}
                >
                  <option value="">Ng??nh ngh???</option>
                  {careerData.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <Form.Select
                  name="location"
                  className="me-2 mt-3"
                  value={location}
                  onChange={onChangeSearchForm}
                >
                  <option value="">?????a ??i???m</option>
                  {locationData.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <Form.Select
                  name="salary"
                  className="me-2 mt-3"
                  value={salary}
                  onChange={onChangeSearchForm}
                >
                  <option value="">M???c l????ng</option>
                  <option value="Th???a thu???n">Th???a thu???n</option>
                  <option value="1 - 3 tri???u">1 - 3 tri???u</option>
                  <option value="3 - 5 tri???u">3 - 5 tri???u</option>
                  <option value="5 - 7 tri???u">5 - 7 tri???u</option>
                  <option value="7 - 10 tri???u">7 - 10 tri???u</option>
                  <option value="10 - 12 tri???u">10 - 12 tri???u</option>
                  <option value="12 - 15 tri???u">12 - 15 tri???u</option>
                  <option value="15 - 20 tri???u">15 - 20 tri???u</option>
                  <option value="20 - 25 tri???u">20 - 25 tri???u</option>
                  <option value="25 - 30 tri???u">25 - 30 tri???u</option>
                  <option value="30 - 35 tri???u">30 - 35 tri???u</option>
                  <option value="35 - 40 tri???u">35 - 40 tri???u</option>
                  <option value="40 - 50 tri???u">40 - 50 tri???u</option>
                  <option value="50 - 60 tri???u">50 - 60 tri???u</option>
                  <option value="60 - 70 tri???u">60 - 70 tri???u</option>
                  <option value="70 - 80 tri???u">70 - 80 tri???u</option>
                  <option value="Tr??n 80 tri???u">Tr??n 80 tri???u</option>
                </Form.Select>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6} xl={3}>
                <Form.Select
                  name="workingForm"
                  className="me-2 mt-3"
                  value={workingForm}
                  onChange={onChangeSearchForm}
                >
                  <option value="">H??nh th???c l??m vi???c</option>
                  <option value="To??n th???i gian">To??n th???i gian</option>
                  <option value="B??n th???i gian">B??n th???i gian</option>
                  <option value="Th???c t???p">Th???c t???p</option>
                  <option value="Remote - L??m vi???c t??? xa">
                    Remote - L??m vi???c t??? xa
                  </option>
                </Form.Select>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <Form.Select
                  name="level"
                  className="me-2 mt-3"
                  value={level}
                  onChange={onChangeSearchForm}
                >
                  <option value="">C???p b???c</option>
                  <option value="Th???c t???p sinh">Th???c t???p sinh</option>
                  <option value="Nh??n vi??n">Nh??n vi??n</option>
                  <option value="Tr?????ng nh??m">Tr?????ng nh??m</option>
                  <option value="Ph?? ph??ng">Ph?? ph??ng</option>
                  <option value="Tr?????ng ph??ng">Tr?????ng ph??ng</option>
                  <option value="Ph?? gi??m ?????c">Ph?? gi??m ?????c</option>
                  <option value="Gi??m ?????c">Gi??m ?????c</option>
                  <option value="T???ng gi??m ?????c">T???ng gi??m ?????c</option>
                </Form.Select>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <Form.Select
                  name="experience"
                  className="me-2 mt-3"
                  value={experience}
                  onChange={onChangeSearchForm}
                >
                  <option value="">Kinh nghi???m</option>
                  <option value="Kh??ng y??u c???u">Kh??ng y??u c???u</option>
                  <option value="D?????i 1 n??m">D?????i 1 n??m</option>
                  <option value="1 n??m">1 n??m</option>
                  <option value="2 n??m">2 n??m</option>
                  <option value="3 n??m">3 n??m</option>
                  <option value="4 n??m">4 n??m</option>
                  <option value="5 n??m">5 n??m</option>
                  <option value="T??n 5 n??m">Tr??n 5 n??m</option>
                </Form.Select>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <Button
                  className="searchAll-btn mt-3"
                  variant="success"
                  type="submit"
                >
                  <img
                    src={searchIcon}
                    alt="searchIcon"
                    width="20"
                    height="20"
                    className="no-select"
                  />
                  T??m ki???m
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>

        {existRecruitment ? (
          loading ? (
            <>
              <div className="spinner-container">
                <Spinner animation="border" variant="success" />
              </div>
              <div style={{ paddingBottom: '350px' }}></div>
            </>
          ) : (
            <Container className="mt-4">
              <Row className="row-cols-1">
                {recruitments.map((recruitment) => {
                  return (
                    <Col key={recruitment._id} className="mt-3">
                      <Card className="shadow-card">
                        <div className="m-3">
                          <div className="d-flex">
                            <Card.Img
                              variant="left"
                              src={`${imgUrl}/${recruitment.img}`}
                              className="rounded no-select imgCompany-search"
                            />
                            <Card.Title className="search-card ms-3">
                              <Link
                                to={`/recruitment/${convertSlugUrl(
                                  recruitment.title,
                                )}/${recruitment._id}`}
                                target="_blank"
                                style={{
                                  textDecoration: 'none',
                                  color: '#212529',
                                }}
                              >
                                <p className="search-job fw-bold">
                                  {recruitment.title}
                                </p>
                              </Link>
                              <p className="search-company">
                                {' '}
                                {recruitment.companyName}
                              </p>
                              <div className="badge-search">
                                <div>
                                  <Badge className="bg-secondary fw-normal text-capitalize">
                                    {recruitment.salary}
                                  </Badge>
                                </div>
                                <div>
                                  <Badge className="bg-secondary fw-normal badge-location">
                                    {recruitment.location}
                                  </Badge>
                                </div>
                                <div>
                                  <Badge className="bg-secondary fw-normal badge-deadline">
                                    H???n:{' '}
                                    {moment(
                                      recruitment ? recruitment.deadline : null,
                                    ).format('DD/MM/YYYY')}
                                  </Badge>
                                </div>
                              </div>
                            </Card.Title>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              {searched && (
                <div className="mt-5">
                  <ReactPaginate
                    previousLabel={'Tr?????c'}
                    nextLabel={'Ti???p'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={
                      'pagination justify-content-center mb-0'
                    }
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
              )}
            </Container>
          )
        ) : (
          <Container className="mt-4">
            <Alert variant="warning">
              Kh??ng t??m th???y tin tuy???n d???ng n??o ph?? h???p.
            </Alert>
          </Container>
        )}

        <div style={{ paddingBottom: '120px' }}></div>

        <Footer />
      </div>
    </>
  );
};

export default Search;
