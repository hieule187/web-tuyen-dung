import React from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import userMale from '../../../assets/user-male.jpg';
import calendarIcon from '../../../assets/calendar.svg';
import genderIcon from '../../../assets/person-fill.svg';
import phoneIcon from '../../../assets/phone.svg';
import emailIcon from '../../../assets/email.svg';
import infoIcon from '../../../assets/info.svg';
import skillIcon from '../../../assets/skill.svg';
import targetIcon from '../../../assets/target.svg';
import experienceIcon from '../../../assets/experience.svg';
import degreeIcon from '../../../assets/degree.svg';
import editIcon from '../../../assets/pencil-square.svg';

const MyProfile = () => {
  return (
    <div className="profile-wrapper">
      <Container className="mt-3">
        <h1 className="profile-header">Hồ sơ xin việc</h1>
        <p className="profile-description">
          Xây dựng một hồ sơ nổi bật để nhận được các cơ hội sự nghiệp lý tưởng.
        </p>
      </Container>

      <Container className="mt-3">
        <div
          className="d-flex profile-content rounded-3"
          style={{ backgroundColor: '#f8f9fa' }}
        >
          <div
            className="col-6 content-width"
            style={{ backgroundColor: '#00b14f0d' }}
          >
            <img
              src={editIcon}
              alt="editIcon"
              width="40"
              height="40"
              className="edit-btn"
            />
            <Container className="text-center">
              <h1 className="profile-name">Lê Trần Hiếu</h1>
              <img
                src={userMale}
                alt="userMale"
                width="150"
                height="150"
                className="mt-2 rounded-circle border border-success"
              />

              <div className="divider-profile"></div>
            </Container>

            <Container>
              <h1 className="profile-title">
                <img
                  src={infoIcon}
                  alt="infoIcon"
                  width="24"
                  height="24"
                  className="mb-1 me-2"
                />
                Thông tin liên hệ
              </h1>
              <p className="profile-info">
                <img
                  src={calendarIcon}
                  alt="calendarIcon"
                  width="16"
                  height="16"
                  className="mb-1 me-2"
                />
                Ngày sinh: 18/07/2000
              </p>
              <p className="profile-info">
                <img
                  src={genderIcon}
                  alt="genderIcon"
                  width="18"
                  height="18"
                  className="mb-1 me-2"
                />
                Giới tính: Nam
              </p>
              <p className="profile-info">
                <img
                  src={phoneIcon}
                  alt="phoneIcon"
                  width="16"
                  height="16"
                  className="mb-1 me-2"
                />
                Số điện thoại: 0123456789
              </p>
              <p className="profile-info">
                <img
                  src={emailIcon}
                  alt="emailIcon"
                  width="16"
                  height="16"
                  className="mb-1 me-2"
                />
                Email: hieule187@gmail.com
              </p>

              <div className="divider-profile"></div>

              <h1 className="profile-title">
                <img
                  src={skillIcon}
                  alt="skillIcon"
                  width="24"
                  height="24"
                  className="mb-1 me-2"
                />
                Các kỹ năng
              </h1>
              <p className="profile-info">Tin học văn phòng</p>
              <p className="profile-info">
                - Sử dụng thành thạo các công cụ Word, Excel, Power Point
              </p>
              <p className="profile-info">Tiếng Anh</p>
              <p className="profile-info">
                - Khả năng giao tiếp Tiếng Anh trôi chảy
              </p>

              <div className="divider-end"></div>
            </Container>
          </div>

          <div className="col-6 content-width col-right">
            <Container>
              <h1 className="profile-target">
                <img
                  src={targetIcon}
                  alt="targetIcon"
                  width="24"
                  height="24"
                  className="mb-1 me-2"
                />
                Mục tiêu nghề nghiệp
              </h1>
              <p className="profile-info">
                Áp dụng những kinh nghiệm về kỹ năng bán hàng và sự hiểu biết về
                thị trường để trở thành một nhân viên bán hàng chuyên nghiệp,
                mang đến nhiều giá trị cho khách hàng. Từ đó giúp Công ty tăng
                số lượng khách hàng và mở rộng tập khách hàng.
              </p>

              <div className="divider-profile"></div>

              <h1 className="profile-title">
                <img
                  src={experienceIcon}
                  alt="experienceIcon"
                  width="24"
                  height="24"
                  className="mb-1 me-2"
                />
                Kinh nghiệm làm việc
              </h1>
              <p className="profile-info">Nhân viên bán hàng</p>
              <p className="profile-info">
                - Hỗ trợ viết bài quảng cáo sản phẩm qua kênh facebook, các
                forum,...
              </p>
              <p className="profile-info">
                - Giới thiệu, tư vấn sản phẩm, giải đáp các vấn đề thắc mắc của
                khách hàng qua điện thoại và email.
              </p>
              <p className="profile-info">Nhân viên bán hàng</p>
              <p className="profile-info">
                - Bán hàng trực tiếp tại cửa hàng cho người nước ngoài và người
                Việt.
              </p>
              <p className="profile-info">
                - Quảng bá sản phẩm thông qua các ấn phẩm truyền thông: banner,
                poster, tờ rơi...
              </p>
              <p className="profile-info">
                - Lập báo cáo sản lượng bán ra hàng ngày.
              </p>

              <div className="divider-profile"></div>

              <h1 className="profile-title">
                <img
                  src={degreeIcon}
                  alt="degreeIcon"
                  width="24"
                  height="24"
                  className="mb-1 me-2"
                />
                Học vấn
              </h1>
              <p className="profile-info">Đại học Thủy Lợi</p>
              <p className="profile-info">- Quản trị Doanh nghiệp</p>
              <p className="profile-info">
                - Tốt nghiệp loại Giỏi, điểm trung bình 8.0
              </p>

              <div className="divider-end"></div>
            </Container>
          </div>
        </div>
      </Container>

      <div style={{ height: '500px' }}></div>
    </div>
  );
};

export default MyProfile;
