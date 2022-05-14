import React, { useEffect, useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import infoIcon from '../../../assets/info.svg';
import skillIcon from '../../../assets/skill.svg';
import targetIcon from '../../../assets/target.svg';
import experienceIcon from '../../../assets/experience.svg';
import degreeIcon from '../../../assets/mortarboard-fill.svg';
import ProfileAPI from '../../../API/ProfileAPI';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Helmet } from 'react-helmet';
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi);

const UpdateProfile = () => {
  const history = useHistory();

  const [info, setInfo] = useState({
    fullName: '',
    gender: 'Nam',
    phoneNumber: '',
    email: '',
  });

  const [birthday, setBirthday] = useState(new Date());
  const [skill, setSkill] = useState(EditorState.createEmpty());
  const [target, setTarget] = useState(EditorState.createEmpty());
  const [experience, setExperience] = useState(EditorState.createEmpty());
  const [degree, setDegree] = useState(EditorState.createEmpty());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    ProfileAPI.getProfile().then((profileData) => {
      if (profileData || profileData.success) {
        const { profile } = profileData;
        if (profile) {
          setInfo({
            fullName: profile.fullName,
            gender: profile.gender,
            phoneNumber: profile.phoneNumber,
            email: profile.email,
          });
          setBirthday(new Date(profile.birthday));
          setDegree(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(profile.degree),
              ),
            ),
          );
          setExperience(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(profile.experience),
              ),
            ),
          );
          setTarget(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(profile.target),
              ),
            ),
          );
          setSkill(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(convertFromHTML(profile.skill)),
            ),
          );
        }
      }
    });
  }, []);

  const onChangeInfo = (event) =>
    setInfo({ ...info, [event.target.name]: event.target.value });

  const onChangeBirthday = (date) => {
    setBirthday(date);
  };

  const onChangeSkill = (value) => {
    setSkill(value);
  };

  const onEditorTarget = (value) => {
    setTarget(value);
  };

  const onEditorExperience = (value) => {
    setExperience(value);
  };

  const onEditorDegree = (value) => {
    setDegree(value);
  };

  const _skill = draftToHtml(convertToRaw(skill.getCurrentContent()));
  const _target = draftToHtml(convertToRaw(target.getCurrentContent()));
  const _experience = draftToHtml(convertToRaw(experience.getCurrentContent()));
  const _degree = draftToHtml(convertToRaw(degree.getCurrentContent()));

  const profileForm = {
    fullName: info.fullName,
    birthday: birthday,
    gender: info.gender,
    phoneNumber: info.phoneNumber,
    email: info.email,
    skill: _skill,
    target: _target,
    experience: _experience,
    degree: _degree,
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const profileData = await ProfileAPI.updateProfile(profileForm);
    if (profileData.success) {
      toast.success(profileData.message);
      setTimeout(() => {
        history.push('/profile');
      }, 1000);
    } else {
      toast.error(profileData.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Cập nhật hồ sơ xin việc - FastJob</title>
      </Helmet>
      <div className="update-profile-wrapper">
        <Container className="mt-4">
          <h1 className="update-profile-header">Cập nhật hồ sơ xin việc</h1>
          <p className="update-profile-description">
            Xây dựng một hồ sơ nổi bật để nhận được các cơ hội sự nghiệp lý
            tưởng.
          </p>
        </Container>

        <Container className="mt-4 mb-5">
          <Form onSubmit={onSubmit}>
            <h1 className="update-profile-title mt-4">
              <img
                src={infoIcon}
                alt="infoIcon"
                width="24"
                height="24"
                className="mb-1 me-2 no-select"
              />
              Thông tin liên hệ:
            </h1>
            <div className="d-flex justify-content-center">
              <Row className="update-profile-content">
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Text id="fullName" muted>
                      Họ và tên
                    </Form.Text>
                    <Form.Control
                      className="mt-1"
                      type="text"
                      placeholder="Nhập họ và tên"
                      name="fullName"
                      required
                      aria-describedby="fullName"
                      value={info.fullName}
                      onChange={onChangeInfo}
                    />
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Text id="email" muted>
                      Email
                    </Form.Text>
                    <Form.Control
                      className="mt-1"
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      name="email"
                      required
                      aria-describedby="email"
                      value={info.email}
                      onChange={onChangeInfo}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mt-2">
                        <Form.Text id="birthday" muted>
                          Ngày sinh
                        </Form.Text>
                        <DatePicker
                          name="birthday"
                          className="form-control mt-1"
                          selected={birthday}
                          value={birthday}
                          onChange={onChangeBirthday}
                          dateFormat="dd/MM/yyyy"
                          disabledKeyboardNavigation
                          placeholderText="Ngày sinh"
                          locale="vi"
                          showYearDropdown
                          scrollableMonthYearDropdown
                          id="birthday"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                      <Form.Group className="mt-2">
                        <Form.Text id="gender" muted>
                          Giới tính
                        </Form.Text>
                        <Form.Select
                          name="gender"
                          className="mt-1"
                          id="gender"
                          value={info.gender}
                          onChange={onChangeInfo}
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mt-2">
                    <Form.Text id="phoneNumber" muted>
                      Số điện thoại
                    </Form.Text>
                    <Form.Control
                      className="mt-1"
                      type="tel"
                      maxLength={10}
                      placeholder="Nhập tối đa 10 chữ số"
                      name="phoneNumber"
                      required
                      aria-describedby="phoneNumber"
                      value={info.phoneNumber}
                      onChange={onChangeInfo}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>

            <h1 className="update-profile-title mt-4">
              <img
                src={skillIcon}
                alt="skillIcon"
                width="24"
                height="24"
                className="mb-1 me-2 no-select"
              />
              Các kỹ năng:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nhập các kỹ năng ..."
                editorState={skill}
                onEditorStateChange={onChangeSkill}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontFamily',
                    'list',
                    'colorPicker',
                    'history',
                  ],
                  inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: [
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      'superscript',
                      'subscript',
                    ],
                  },
                  blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                }}
              />
            </Form.Group>

            <h1 className="update-profile-title mt-4">
              <img
                src={targetIcon}
                alt="targetIcon"
                width="24"
                height="24"
                className="mb-1 me-2 no-select"
              />
              Mục tiêu nghề nghiệp:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nhập mục tiêu nghề nghiệp ..."
                editorState={target}
                onEditorStateChange={onEditorTarget}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontFamily',
                    'list',
                    'colorPicker',
                    'history',
                  ],
                  inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: [
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      'superscript',
                      'subscript',
                    ],
                  },
                  blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                }}
              />
            </Form.Group>

            <h1 className="update-profile-title mt-4">
              <img
                src={experienceIcon}
                alt="experienceIcon"
                width="24"
                height="24"
                className="mb-1 me-2 no-select"
              />
              Kinh nghiệm làm việc:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nhập các kinh nghiệm đã có được, dự án đã tham gia ..."
                editorState={experience}
                onEditorStateChange={onEditorExperience}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontFamily',
                    'list',
                    'colorPicker',
                    'history',
                  ],
                  inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: [
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      'superscript',
                      'subscript',
                    ],
                  },
                  blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                }}
              />
            </Form.Group>

            <h1 className="update-profile-title mt-4">
              <img
                src={degreeIcon}
                alt="degreeIcon"
                width="24"
                height="24"
                className="mb-1 me-2 no-select"
              />
              Học vấn:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nhập các thông tin về trình độ học vấn ..."
                editorState={degree}
                onEditorStateChange={onEditorDegree}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                  options: [
                    'inline',
                    'blockType',
                    'fontFamily',
                    'list',
                    'colorPicker',
                    'history',
                  ],
                  inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: [
                      'bold',
                      'italic',
                      'underline',
                      'strikethrough',
                      'superscript',
                      'subscript',
                    ],
                  },
                  blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H3', 'H4', 'H5', 'H6'],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
                }}
              />
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button
                size="lg"
                className="m-4 text-center"
                variant="success"
                type="submit"
              >
                Cập nhật hồ sơ
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default UpdateProfile;
