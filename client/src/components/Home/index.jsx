import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import { AccountContext } from '../../contexts/AccountContext';
import NavbarMenu from '../NavbarMenu';
import Footer from '../Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import SignupModal from '../Account/SignupModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { imgUrl } from '../../contexts/constants';
import InfoRecruitment from '../Recruitment/InfoRecruitment';
import ReactPaginate from 'react-paginate';
import RecruitmentAPI from '../../API/RecruitmentAPI';
import bagIcon from '../../assets/bag.svg';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => {
  // Context
  const {
    accountState: { authLoading },
    setQuickSearch,
  } = useContext(AccountContext);

  const [loading, setLoading] = useState(false);
  const [recruitments, setRecruitments] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [existRecruitment, setExistRecruitment] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getRecruitment = async () => {
      const recruitmentData = await RecruitmentAPI.getRecruitment();
      if (recruitmentData.success) {
        setRecruitments(recruitmentData.recruitment);
        setPageCount(recruitmentData.totalPages);
        setLoading(false);
      } else {
        setExistRecruitment(false);
        setLoading(false);
      }
    };
    getRecruitment();
  }, []);

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const dataInPage = await RecruitmentAPI.getRecruitmentPage(currentPage);
    setRecruitments(dataInPage.recruitment);
  };

  const settings = {
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    dots: true,
  };

  const settingsJobs = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    dots: true,
    centerMode: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const banner = ['banner-1.png', 'banner-2.png', 'banner-3.png'];

  const jobsOutstanding = [
    'Kinh doanh / Bán hàng',
    'Kế toán / Kiểm toán',
    'Ngân hàng / Tài chính',
    'Bất động sản',
    'Công nghệ thông tin',
    'Marketing / Truyền thông',
  ];

  const linkJobsOutstanding = (value) => {
    setQuickSearch(value);
  };

  const aboutUs = [
    {
      title: '30.000+',
      description: 'Ứng viên đang bật tìm việc trung bình/thời điểm',
    },
    { title: '90.000+', description: 'Doanh nghiệp sử dụng dịch vụ' },
    { title: '120.000+', description: 'Nhà tuyển dụng sử dụng thường xuyên' },
    { title: '200.000+', description: 'Ứng viên mới mỗi tháng' },
    { title: '3.000.000+', description: 'Lượt ứng viên truy cập hàng tháng' },
    { title: '4.000.000+', description: 'Ứng viên tiềm năng' },
    { title: '60%', description: 'Ứng viên có trên 2 năm kinh nghiệm' },
  ];

  const topCompany = [
    { img: 'cmc.png', link: 'https://cmcglobal.com.vn/' },
    { img: 'itp.png', link: 'https://itp29.com/' },
    { img: 'vh.png', link: 'https://vuihoc.vn/' },
    { img: 'tc.png', link: 'https://trans-cosmos.com.vn/' },
    { img: 'dkra.png', link: 'http://dkravega.vn/' },
    { img: 'cl.png', link: 'https://www.chailease.com.vn/' },
    { img: 'mls.png', link: 'https://milensea.com.vn/' },
    { img: 'mcrd.png', link: 'https://mcredit.com.vn/' },
    { img: 'ifi.png', link: 'https://www.ifisolution.com/' },
    { img: 'sc.png', link: 'https://www.smartosc.com/' },
    { img: 'gg.png', link: 'https://g-group.vn/' },
  ];

  if (authLoading || loading) {
    return (
      <>
        <NavbarMenu />
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
          <title>FastJob - Tạo CV & Tìm việc miễn phí</title>
        </Helmet>
        <div className="home-wrapper">
          <SignupModal />

          <NavbarMenu />

          <div className="div-slider-color">
            <Container className="">
              <h1 className="home-header">
                Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc
              </h1>
              <p className="home-description">
                Tiếp cận 30,000+ tin tuyển dụng việc làm mới mỗi ngày từ hàng
                nghìn doanh nghiệp uy tín tại Việt Nam
              </p>

              <Slider {...settings} className="pointer mt-4">
                {banner.map((imgName, index) => {
                  return (
                    <div key={index}>
                      <img
                        className="w-100 rounded-3"
                        src={`${imgUrl}/uploads/${imgName}`}
                        alt={imgName}
                      />
                    </div>
                  );
                })}
              </Slider>
            </Container>
          </div>

          <div className="div-jobs-color">
            <Container className="">
              <h1 className="jobs-header">Tin tuyển dụng, việc làm tốt nhất</h1>

              {existRecruitment ? (
                <div className="jobs-wrapper mt-4 p-2 rounded-3">
                  <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 mx-auto no-select">
                    {recruitments.map((recruitment) => (
                      <Col key={recruitment._id} className="my-2">
                        <InfoRecruitment recruitment={recruitment} />
                      </Col>
                    ))}
                  </Row>
                </div>
              ) : (
                <div className="jobs-wrapper mt-4 p-2 rounded-3">
                  <Row className="row-cols-1 mx-auto no-select">
                    <Alert variant="warning mb-0">
                      Hiện chưa có tin tuyển dụng nào được đăng tuyển.
                    </Alert>
                  </Row>
                </div>
              )}

              <div className="mt-3">
                <ReactPaginate
                  previousLabel={'Trước'}
                  nextLabel={'Tiếp'}
                  breakLabel={'...'}
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
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
          </div>

          <div className="div-jobs-outstanding-color">
            <Container className="no-select">
              <h1 className="jobs-outstanding">Top ngành nghề nổi bật</h1>

              <Slider {...settingsJobs} className="mt-3">
                {jobsOutstanding.map((job, index) => {
                  return (
                    <div key={index} className="pe-4 mt-2 mb-2">
                      <Card className="card-jobs-outstanding">
                        <Card.Body className="d-flex">
                          <img
                            src={bagIcon}
                            alt="bagIcon"
                            width="40"
                            height="40"
                            className="bagIcon no-select"
                          />
                          <Card.Title className="title-card">
                            <Link
                              to="/search"
                              style={{
                                textDecoration: 'none',
                                color: '#212529',
                              }}
                              onClick={() => linkJobsOutstanding(job)}
                            >
                              <p className="title-job-outstanding fw-bold">
                                {job}
                              </p>
                            </Link>
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </Slider>
            </Container>
          </div>

          <div className="div-about-us-color">
            <Container className="">
              <div className="header-about-us">
                <h1 className="title-about-us">Về chúng tôi</h1>

                <p className="description-about-us mt-3">
                  FastJob là công ty công nghệ nhân sự (HR Tech) hàng đầu Việt
                  Nam. Với năng lực lõi là công nghệ, đặc biệt là trí tuệ nhân
                  tạo (AI), sứ mệnh của FastJob đặt ra cho mình là thay đổi thị
                  trường tuyển dụng - nhân sự ngày một hiệu quả hơn. Bằng công
                  nghệ, chúng tôi tạo ra nền tảng cho phép người lao động tạo
                  CV, phát triển được các kỹ năng cá nhân, xây dựng hình ảnh
                  chuyên nghiệp trong mắt nhà tuyển dụng và tiếp cận với các cơ
                  hội việc làm phù hợp.
                </p>
              </div>

              <div className="p-3 mt-4 details-about-us">
                <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4 mx-3">
                  {aboutUs.map((about, index) => {
                    return (
                      <Col key={index}>
                        <div className="mt-2 mb-2">
                          <h3 style={{ color: '#3d6089' }}>{about.title}</h3>
                          <p>{about.description}</p>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Container>
          </div>

          <div className="div-jobs-top-company-color">
            <Container className="">
              <h1 className="title-top-company">
                Các công ty tuyển dụng hàng đầu
              </h1>

              <Row className="row-cols-2 row-cols-md-3 row-cols-lg-6 mt-4">
                {topCompany.map((company, index) => {
                  return (
                    <Link
                      key={index}
                      to={{ pathname: company.link }}
                      target="_blank"
                    >
                      <Col>
                        <div className="img-top-company rounded-3">
                          <img
                            src={`${imgUrl}/uploads/${company.img}`}
                            alt={company.img}
                            className="img-company no-select"
                          />
                        </div>
                      </Col>
                    </Link>
                  );
                })}
              </Row>
            </Container>
          </div>

          <Footer />
        </div>
      </>
    );
  }
};

export default Home;
