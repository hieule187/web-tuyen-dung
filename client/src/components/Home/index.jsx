import React from 'react';
import './styles.css';
import NavbarMenu from '../NavbarMenu';
import Container from 'react-bootstrap/Container';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

const Home = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: true,
        },
      },
    ],
  };

  const settingsJobs = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    dots: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="home-wrapper">
      <NavbarMenu />

      <Container className="mt-3">
        <h1 className="home-header">
          Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc
        </h1>
        <p className="home-description">
          Tiếp cận 30,000+ tin tuyển dụng việc làm mới mỗi ngày từ hàng nghìn
          doanh nghiệp uy tín tại Việt Nam
        </p>
      </Container>

      <Container className="mt-3">
        <Slider {...settings}>
          <div>
            <img
              className="w-100 rounded-3"
              src="https://static.topcv.vn/img/bannerT1.jpg"
              alt="First slide"
            />
          </div>
          <div>
            <img
              className="w-100 rounded-3"
              src="https://static.topcv.vn/img/Banner%20cho%20TopCV-01.png"
              alt="First slide"
            />
          </div>
          <div>
            <img
              className="w-100 rounded-3"
              src="https://static.topcv.vn/img/banner%20t4%20(1)%20(1).png"
              alt="First slide"
            />
          </div>
        </Slider>
      </Container>

      <Container className="mt-3 jobs-wrapper">
        <div className="jobs-title">
          <h1 className="jobs-header">TIN TUYỂN DỤNG, VIỆC LÀM TỐT NHẤT</h1>
        </div>
        <div className="jobs-slider mt-3 p-2 rounded-3">
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3 mx-auto">
            <Col className="my-2">
              <Card className="shadow-card">
                <Card.Body>
                  <Card.Title className="margin-left">
                    <Row>
                      <Col className="avatar-city">
                        <img
                          src="https://cdn.topcv.vn/44/company_logos/dc55c053482ce14996cb6fc34fbfdb72-6255445896df2.jpg"
                          alt="img"
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      </Col>
                      <Col className="ms-3">
                        <p className="title-job fw-bold">
                          Nhân Viên Kinh Doanh Quốc Tế (Lương Cứng Từ 7- 20
                          Triệu + Hoa Hồng + Phụ Cấp)
                        </p>
                        <p className="title-city">
                          HVCG SoftwareCÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ NÔNG
                          NGHIỆP NUVISRAEL
                        </p>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className="d-flex mt-3 margin-left">
                    <Badge className="bg-secondary fw-normal">
                      15-20 triệu
                    </Badge>
                    <Badge className="bg-secondary fw-normal ms-2">
                      Bà Rịa – Vũng Tàu
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col className="my-2">
              <Card className="shadow-card">
                <Card.Body>
                  <Card.Title className="margin-left">
                    <Row>
                      <Col className="avatar-city">
                        <img
                          src="https://cdn.topcv.vn/44/company_logos/dc55c053482ce14996cb6fc34fbfdb72-6255445896df2.jpg"
                          alt="img"
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      </Col>
                      <Col className="ms-3">
                        <p className="title-job fw-bold">
                          Nhân Viên Trực Page/ Sales Hàng Tiêu Dùng (8-15 Triệu)
                        </p>
                        <p className="title-city">
                          Công ty TNHH sản phẩm thiên nhiên và hữu cơ Ona Global
                        </p>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className="d-flex mt-3 margin-left">
                    <Badge className="bg-secondary fw-normal">
                      15-20 triệu
                    </Badge>
                    <Badge className="bg-secondary fw-normal ms-2">
                      Bà Rịa – Vũng Tàu
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="my-2">
              <Card className="shadow-card">
                <Card.Body>
                  <Card.Title className="margin-left">
                    <Row>
                      <Col className="avatar-city">
                        <img
                          src="https://cdn.topcv.vn/44/company_logos/dc55c053482ce14996cb6fc34fbfdb72-6255445896df2.jpg"
                          alt="img"
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      </Col>
                      <Col className="ms-3">
                        <p className="title-job fw-bold">
                          Nhân Viên Kiểm Tra Và Điều Phối Đơn Hàng Online (Làm
                          Việc Tại Nhà)
                        </p>
                        <p className="title-city">
                          Công ty Cổ phần Truyền thông Nam Việt
                        </p>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className="d-flex mt-3 margin-left">
                    <Badge className="bg-secondary fw-normal">
                      15-20 triệu
                    </Badge>
                    <Badge className="bg-secondary fw-normal ms-2">
                      Bà Rịa – Vũng Tàu
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="my-2">
              <Card className="shadow-card">
                <Card.Body>
                  <Card.Title className="margin-left">
                    <Row>
                      <Col className="avatar-city">
                        <img
                          src="https://cdn.topcv.vn/44/company_logos/dc55c053482ce14996cb6fc34fbfdb72-6255445896df2.jpg"
                          alt="img"
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      </Col>
                      <Col className="ms-3">
                        <p className="title-job fw-bold">
                          Lập Trình Viên - Developer
                        </p>
                        <p className="title-city">HVCG Software</p>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className="d-flex mt-3 margin-left">
                    <Badge className="bg-secondary fw-normal">
                      15-20 triệu
                    </Badge>
                    <Badge className="bg-secondary fw-normal ms-2">
                      Bà Rịa – Vũng Tàu
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="my-2">
              <Card className="shadow-card">
                <Card.Body>
                  <Card.Title className="margin-left">
                    <Row>
                      <Col className="avatar-city">
                        <img
                          src="https://cdn.topcv.vn/44/company_logos/dc55c053482ce14996cb6fc34fbfdb72-6255445896df2.jpg"
                          alt="img"
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      </Col>
                      <Col className="ms-3">
                        <p className="title-job fw-bold">
                          Lập Trình Viên - Developer
                        </p>
                        <p className="title-city">HVCG Software</p>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className="d-flex mt-3 margin-left">
                    <Badge className="bg-secondary fw-normal">
                      15-20 triệu
                    </Badge>
                    <Badge className="bg-secondary fw-normal ms-2">
                      Bà Rịa – Vũng Tàu
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col className="my-2">
              <Card className="shadow-card">
                <Card.Body>
                  <Card.Title className="margin-left">
                    <Row>
                      <Col className="avatar-city">
                        <img
                          src="https://cdn.topcv.vn/44/company_logos/dc55c053482ce14996cb6fc34fbfdb72-6255445896df2.jpg"
                          alt="img"
                          width="50"
                          height="50"
                          className="rounded"
                        />
                      </Col>
                      <Col className="ms-3">
                        <p className="title-job fw-bold">
                          Lập Trình Viên - Developer
                        </p>
                        <p className="title-city">HVCG Software</p>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Text className="d-flex mt-3 margin-left">
                    <Badge className="bg-secondary fw-normal">
                      15-20 triệu
                    </Badge>
                    <Badge className="bg-secondary fw-normal ms-2">
                      Bà Rịa – Vũng Tàu
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Home;
