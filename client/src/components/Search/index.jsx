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
        <title>Tìm kiếm việc làm - FastJob</title>
      </Helmet>
      <div className="search-wrapper">
        <NavbarMenu />

        <Container className="mt-4">
          <h1 className="search-header">Tìm kiếm tin tuyển dụng</h1>
        </Container>

        <Container className="mt-2">
          <Form onSubmit={handleSearch}>
            <Row>
              <Col xs={12} md={6} xl={3}>
                <Form.Control
                  type="search"
                  placeholder="Tên công việc ..."
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
                  <option value="">Ngành nghề</option>
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
                  <option value="">Địa điểm</option>
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
                  <option value="">Mức lương</option>
                  <option value="Thỏa thuận">Thỏa thuận</option>
                  <option value="1 - 3 triệu">1 - 3 triệu</option>
                  <option value="3 - 5 triệu">3 - 5 triệu</option>
                  <option value="5 - 7 triệu">5 - 7 triệu</option>
                  <option value="7 - 10 triệu">7 - 10 triệu</option>
                  <option value="10 - 12 triệu">10 - 12 triệu</option>
                  <option value="12 - 15 triệu">12 - 15 triệu</option>
                  <option value="15 - 20 triệu">15 - 20 triệu</option>
                  <option value="20 - 25 triệu">20 - 25 triệu</option>
                  <option value="25 - 30 triệu">25 - 30 triệu</option>
                  <option value="30 - 35 triệu">30 - 35 triệu</option>
                  <option value="35 - 40 triệu">35 - 40 triệu</option>
                  <option value="40 - 50 triệu">40 - 50 triệu</option>
                  <option value="50 - 60 triệu">50 - 60 triệu</option>
                  <option value="60 - 70 triệu">60 - 70 triệu</option>
                  <option value="70 - 80 triệu">70 - 80 triệu</option>
                  <option value="Trên 80 triệu">Trên 80 triệu</option>
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
                  <option value="">Hình thức làm việc</option>
                  <option value="Toàn thời gian">Toàn thời gian</option>
                  <option value="Bán thời gian">Bán thời gian</option>
                  <option value="Thực tập">Thực tập</option>
                  <option value="Remote - Làm việc từ xa">
                    Remote - Làm việc từ xa
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
                  <option value="">Cấp bậc</option>
                  <option value="Thực tập sinh">Thực tập sinh</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Trưởng nhóm">Trưởng nhóm</option>
                  <option value="Phó phòng">Phó phòng</option>
                  <option value="Trưởng phòng">Trưởng phòng</option>
                  <option value="Phó giám đốc">Phó giám đốc</option>
                  <option value="Giám đốc">Giám đốc</option>
                  <option value="Tổng giám đốc">Tổng giám đốc</option>
                </Form.Select>
              </Col>

              <Col xs={12} md={6} xl={3}>
                <Form.Select
                  name="experience"
                  className="me-2 mt-3"
                  value={experience}
                  onChange={onChangeSearchForm}
                >
                  <option value="">Kinh nghiệm</option>
                  <option value="Không yêu cầu">Không yêu cầu</option>
                  <option value="Dưới 1 năm">Dưới 1 năm</option>
                  <option value="1 năm">1 năm</option>
                  <option value="2 năm">2 năm</option>
                  <option value="3 năm">3 năm</option>
                  <option value="4 năm">4 năm</option>
                  <option value="5 năm">5 năm</option>
                  <option value="Tên 5 năm">Trên 5 năm</option>
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
                  Tìm kiếm
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
                                    Hạn:{' '}
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
                    previousLabel={'Trước'}
                    nextLabel={'Tiếp'}
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
              Không tìm thấy tin tuyển dụng nào phù hợp.
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
