import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import userMale from '../../../assets/user-male.jpg';
import userFemale from '../../../assets/user-female.jpg';
import calendarIcon from '../../../assets/calendar.svg';
import genderIcon from '../../../assets/person-fill.svg';
import phoneIcon from '../../../assets/phone.svg';
import emailIcon from '../../../assets/email.svg';
import infoIcon from '../../../assets/info.svg';
import skillIcon from '../../../assets/skill.svg';
import targetIcon from '../../../assets/target.svg';
import experienceIcon from '../../../assets/experience.svg';
import degreeIcon from '../../../assets/mortarboard-fill.svg';
import editIcon from '../../../assets/pencil-square.svg';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ProfileAPI from '../../../API/ProfileAPI';
import { AccountContext } from '../../../contexts/AccountContext';
import convertSlugUrl from '../../../utils/convertSlugUrl';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const MyProfile = () => {
  const {
    accountState: { user },
  } = useContext(AccountContext);

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [existProfile, setExitsProfile] = useState(false);

  const getProfile = async () => {
    setLoading(true);
    const profileData = await ProfileAPI.getProfile();
    if (profileData.success) {
      setExitsProfile(profileData.existProfile);
      setProfile(profileData.profile);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const formatDate = moment(profile ? profile.birthday : null).format(
    'DD/MM/YYYY',
  );

  if (loading) {
    return (
      <>
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
          <title>Hồ sơ xin việc - FastJob</title>
        </Helmet>
        <div className="profile-wrapper">
          <Container className="mt-4">
            <h1 className="profile-header">Hồ sơ xin việc</h1>
            <p className="profile-description">
              Xây dựng một hồ sơ nổi bật để nhận được các cơ hội sự nghiệp lý
              tưởng.
            </p>
          </Container>

          {existProfile ? (
            <Container className="mt-4 pb-5">
              <div
                className="d-flex profile-content rounded-3"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div
                  className="col-6 content-width"
                  style={{ backgroundColor: '#00b14f0d' }}
                >
                  <Link to={`/update-profile/${convertSlugUrl(user.fullName)}`}>
                    <img
                      src={editIcon}
                      alt="editIcon"
                      width="40"
                      height="40"
                      className="edit-btn no-select"
                    />
                  </Link>
                  <Container className="text-center">
                    <h1 className="profile-name">{profile.fullName}</h1>
                    <img
                      src={profile.gender === 'Nam' ? userMale : userFemale}
                      alt="userImg"
                      width="150"
                      height="150"
                      className="mt-2 rounded-circle border border-success no-select"
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
                        className="mb-1 me-2 no-select"
                      />
                      Thông tin liên hệ
                    </h1>
                    <p className="profile-info">
                      <img
                        src={calendarIcon}
                        alt="calendarIcon"
                        width="16"
                        height="16"
                        className="mb-1 me-2 no-select"
                      />
                      Ngày sinh: {formatDate}
                    </p>
                    <p className="profile-info">
                      <img
                        src={genderIcon}
                        alt="genderIcon"
                        width="18"
                        height="18"
                        className="mb-1 me-2 no-select"
                      />
                      Giới tính: {profile.gender}
                    </p>
                    <p className="profile-info">
                      <img
                        src={phoneIcon}
                        alt="phoneIcon"
                        width="16"
                        height="16"
                        className="mb-1 me-2 no-select"
                      />
                      Số điện thoại: {profile.phoneNumber}
                    </p>
                    <p className="profile-info">
                      <img
                        src={emailIcon}
                        alt="emailIcon"
                        width="16"
                        height="16"
                        className="mb-1 me-2 no-select"
                      />
                      Email: {profile.email}
                    </p>

                    <div className="divider-profile"></div>

                    <h1 className="profile-title">
                      <img
                        src={skillIcon}
                        alt="skillIcon"
                        width="24"
                        height="24"
                        className="mb-1 me-2 no-select"
                      />
                      Các kỹ năng
                    </h1>
                    <div
                      className="profile-info"
                      dangerouslySetInnerHTML={{ __html: profile.skill }}
                    />

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
                        className="mb-1 me-2 no-select"
                      />
                      Mục tiêu nghề nghiệp
                    </h1>
                    <div
                      className="profile-info"
                      dangerouslySetInnerHTML={{ __html: profile.target }}
                    />

                    <div className="divider-profile"></div>

                    <h1 className="profile-title">
                      <img
                        src={experienceIcon}
                        alt="experienceIcon"
                        width="24"
                        height="24"
                        className="mb-1 me-2 no-select"
                      />
                      Kinh nghiệm làm việc
                    </h1>
                    <div
                      className="profile-info"
                      dangerouslySetInnerHTML={{ __html: profile.experience }}
                    />

                    <div className="divider-profile"></div>

                    <h1 className="profile-title">
                      <img
                        src={degreeIcon}
                        alt="degreeIcon"
                        width="24"
                        height="24"
                        className="mb-1 me-2 no-select"
                      />
                      Học vấn
                    </h1>
                    <div
                      className="profile-info"
                      dangerouslySetInnerHTML={{ __html: profile.degree }}
                    />

                    <div className="divider-end"></div>
                  </Container>
                </div>
              </div>
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
                    Hãy nhấn vào nút bên dưới để bắt đầu tạo cho mình một hồ sơ
                    thật nổi bật !
                  </Card.Text>
                  <Button
                    to={`/create-profile/${convertSlugUrl(user.fullName)}`}
                    as={Link}
                    size="lg"
                    variant="success"
                  >
                    Tạo hồ sơ
                  </Button>
                </Card.Body>
              </Card>
            </Container>
          )}
        </div>
      </>
    );
  }
};

export default MyProfile;
