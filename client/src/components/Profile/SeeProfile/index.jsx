import React, { useEffect, useState } from 'react';
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
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import CvAPI from '../../../API/CvAPI';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const SeeProfile = () => {
  const param = useParams();

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [existProfile, setExitsProfile] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      const profileData = await CvAPI.getCvById(param.id);
      if (profileData.success) {
        setProfile(profileData.cv.profile);
        setLoading(false);
      } else {
        setExitsProfile(false);
        setLoading(false);
      }
    };
    getProfile();
  }, [param]);

  const formatDate = moment(profile ? profile.birthday : null).format(
    'DD/MM/YYYY',
  );

  if (loading) {
    return (
      <>
        <Helmet>
          <title>{`Thông tin chi tiết CV ứng viên ${profile.fullName} - FastJob`}</title>
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
          <title>{`Thông tin chi tiết CV ứng viên ${profile.fullName} - FastJob`}</title>
        </Helmet>
        <div className="seeProfile-wrapper">
          <Container className="mt-4">
            <h1 className="seeProfile-header">
              Thông tin chi tiết CV ứng viên
            </h1>
          </Container>

          {existProfile ? (
            <Container className="mt-4 pb-5">
              <div
                className="d-flex seeProfile-content rounded-3"
                style={{ backgroundColor: '#f8f9fa' }}
              >
                <div
                  className="col-6 content-width"
                  style={{ backgroundColor: '#00b14f0d' }}
                >
                  <Container className="text-center">
                    <h1 className="seeProfile-name">{profile.fullName}</h1>
                    <img
                      src={profile.gender === 'Nam' ? userMale : userFemale}
                      alt="userImg"
                      width="150"
                      height="150"
                      className="mt-2 rounded-circle border border-success no-select"
                    />

                    <div className="divider-seeProfile"></div>
                  </Container>

                  <Container>
                    <h1 className="seeProfile-title">
                      <img
                        src={infoIcon}
                        alt="infoIcon"
                        width="24"
                        height="24"
                        className="mb-1 me-2 no-select"
                      />
                      Thông tin liên hệ
                    </h1>
                    <p className="seeProfile-info">
                      <img
                        src={calendarIcon}
                        alt="calendarIcon"
                        width="16"
                        height="16"
                        className="mb-1 me-2 no-select"
                      />
                      Ngày sinh: {formatDate}
                    </p>
                    <p className="seeProfile-info">
                      <img
                        src={genderIcon}
                        alt="genderIcon"
                        width="18"
                        height="18"
                        className="mb-1 me-2 no-select"
                      />
                      Giới tính: {profile.gender}
                    </p>
                    <p className="seeProfile-info">
                      <img
                        src={phoneIcon}
                        alt="phoneIcon"
                        width="16"
                        height="16"
                        className="mb-1 me-2 no-select"
                      />
                      Số điện thoại: {profile.phoneNumber}
                    </p>
                    <p className="seeProfile-info">
                      <img
                        src={emailIcon}
                        alt="emailIcon"
                        width="16"
                        height="16"
                        className="mb-1 me-2 no-select"
                      />
                      Email: {profile.email}
                    </p>

                    <div className="divider-seeProfile"></div>

                    <h1 className="seeProfile-title">
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
                      className="seeProfile-info"
                      dangerouslySetInnerHTML={{ __html: profile.skill }}
                    />

                    <div className="divider-end"></div>
                  </Container>
                </div>

                <div className="col-6 content-width col-right">
                  <Container>
                    <h1 className="seeProfile-target">
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
                      className="seeProfile-info"
                      dangerouslySetInnerHTML={{ __html: profile.target }}
                    />

                    <div className="divider-seeProfile"></div>

                    <h1 className="seeProfile-title">
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
                      className="seeProfile-info"
                      dangerouslySetInnerHTML={{ __html: profile.experience }}
                    />

                    <div className="divider-seeProfile"></div>

                    <h1 className="seeProfile-title">
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
                      className="seeProfile-info"
                      dangerouslySetInnerHTML={{ __html: profile.degree }}
                    />

                    <div className="divider-end"></div>
                  </Container>
                </div>
              </div>
            </Container>
          ) : (
            <Container className="mt-4" style={{ paddingBottom: '550px' }}>
              <Alert variant="warning">CV không tồn tại hoặc đã bị xóa.</Alert>
            </Container>
          )}
        </div>
      </>
    );
  }
};

export default SeeProfile;
