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
        <title>C???p nh???t h??? s?? xin vi???c - FastJob</title>
      </Helmet>
      <div className="update-profile-wrapper">
        <Container className="mt-4">
          <h1 className="update-profile-header">C???p nh???t h??? s?? xin vi???c</h1>
          <p className="update-profile-description">
            X??y d???ng m???t h??? s?? n???i b???t ????? nh???n ???????c c??c c?? h???i s??? nghi???p l??
            t?????ng.
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
              Th??ng tin li??n h???:
            </h1>
            <div className="d-flex justify-content-center">
              <Row className="update-profile-content">
                <Col xs={12} md={6}>
                  <Form.Group className="mt-2">
                    <Form.Text id="fullName" muted>
                      H??? v?? t??n
                    </Form.Text>
                    <Form.Control
                      className="mt-1"
                      type="text"
                      placeholder="Nh???p h??? v?? t??n"
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
                      placeholder="Nh???p ?????a ch??? email"
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
                          Ng??y sinh
                        </Form.Text>
                        <DatePicker
                          name="birthday"
                          className="form-control mt-1"
                          selected={birthday}
                          value={birthday}
                          onChange={onChangeBirthday}
                          dateFormat="dd/MM/yyyy"
                          disabledKeyboardNavigation
                          placeholderText="Ng??y sinh"
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
                          Gi???i t??nh
                        </Form.Text>
                        <Form.Select
                          name="gender"
                          className="mt-1"
                          id="gender"
                          value={info.gender}
                          onChange={onChangeInfo}
                        >
                          <option value="Nam">Nam</option>
                          <option value="N???">N???</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mt-2">
                    <Form.Text id="phoneNumber" muted>
                      S??? ??i???n tho???i
                    </Form.Text>
                    <Form.Control
                      className="mt-1"
                      type="tel"
                      maxLength={10}
                      placeholder="Nh???p t???i ??a 10 ch??? s???"
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
              C??c k??? n??ng:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nh???p c??c k??? n??ng ..."
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
              M???c ti??u ngh??? nghi???p:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nh???p m???c ti??u ngh??? nghi???p ..."
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
              Kinh nghi???m l??m vi???c:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nh???p c??c kinh nghi???m ???? c?? ???????c, d??? ??n ???? tham gia ..."
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
              H???c v???n:
            </h1>
            <Form.Group className="mt-3">
              <Editor
                className="form-control"
                placeholder="Nh???p c??c th??ng tin v??? tr??nh ????? h???c v???n ..."
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
                C???p nh???t h??? s??
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default UpdateProfile;
