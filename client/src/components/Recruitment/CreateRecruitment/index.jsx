import React, { useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import infoIcon from '../../../assets/info.svg';
import RecruitmentAPI from '../../../API/RecruitmentAPI';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import careerData from '../../../data/careerData';
import locationData from '../../../data/locationData';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import vi from 'date-fns/locale/vi';
registerLocale('vi', vi);

const CreateRecruitment = () => {
  const history = useHistory();

  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModalFail, setShowModalFail] = useState(false);

  const [infoRecruitment, setInfoRecruitment] = useState({
    title: '',
    companyName: '',
    img: '',
    salary: '',
    workingForm: 'Toàn thời gian',
    quantity: '',
    level: 'Nhân viên',
    experience: 'Không yêu cầu',
    gender: 'Không yêu cầu',
    location: 'Hà Nội',
    career: 'Kinh doanh / Bán hàng',
    address: '',
  });

  const [deadline, setDeadline] = useState(new Date());
  const [description, setDescription] = useState(EditorState.createEmpty());

  const onChangeInfoRecruitment = (event) =>
    setInfoRecruitment({
      ...infoRecruitment,
      [event.target.name]: event.target.value,
    });

  const onChangeDeadline = (date) => {
    setDeadline(date);
  };

  const onChangeImgLogo = (event) => {
    setInfoRecruitment({
      ...infoRecruitment,
      img: event.target.files[0],
    });
  };

  const onEditorDescription = (value) => {
    setDescription(value);
  };

  const _description = draftToHtml(
    convertToRaw(description.getCurrentContent()),
  );

  const formData = new FormData();
  formData.append('title', infoRecruitment.title);
  formData.append('companyName', infoRecruitment.companyName);
  formData.append('img', infoRecruitment.img);
  formData.append('salary', infoRecruitment.salary);
  formData.append('workingForm', infoRecruitment.workingForm);
  formData.append('quantity', infoRecruitment.quantity);
  formData.append('level', infoRecruitment.level);
  formData.append('experience', infoRecruitment.experience);
  formData.append('gender', infoRecruitment.gender);
  formData.append('location', infoRecruitment.location);
  formData.append('career', infoRecruitment.career);
  formData.append('address', infoRecruitment.address);
  formData.append('deadline', deadline);
  formData.append('description', _description);

  const onSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const recruitmentData = await RecruitmentAPI.createRecruitment(formData);
    if (recruitmentData.success) {
      setShowModalSuccess(true);
    } else if (!recruitmentData.browse) {
      setShowModalFail(true);
    } else {
      toast.error(recruitmentData.message);
    }
  };

  const closeModalSuccess = () => {
    setShowModalSuccess(false);
    history.push('/');
  };

  const closeModalFail = () => {
    setShowModalFail(false);
    history.push('/');
  };

  return (
    <div className="create-recruitment-wrapper">
      <Container className="mt-4">
        <h1 className="create-recruitment-header">Đăng tin tuyển dụng</h1>
        <p className="create-recruitment-description">
          Xây dựng một tin tuyển dụng nổi bật để nhận được những ứng viên tiềm
          năng.
        </p>
      </Container>

      <Container className="mt-3 mb-5">
        <Form onSubmit={onSubmit}>
          <h1 className="create-recruitment-title mt-4">
            <img
              src={infoIcon}
              alt="infoIcon"
              width="24"
              height="24"
              className="mb-1 me-2"
            />
            Thông tin tuyển dụng:
          </h1>
          <div className="d-flex justify-content-center">
            <Row className="create-recruitment-content">
              <Col xs={12} md={12}>
                <Form.Group className="mt-2">
                  <Form.Text id="title" muted>
                    Tiêu đề
                  </Form.Text>
                  <Form.Control
                    className="mt-1"
                    type="text"
                    placeholder="Nhập tiêu đề tin tuyển dụng"
                    name="title"
                    required
                    aria-describedby="title"
                    value={infoRecruitment.title}
                    onChange={onChangeInfoRecruitment}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mt-2">
                  <Form.Text id="companyName" muted>
                    Tên công ty
                  </Form.Text>
                  <Form.Control
                    className="mt-1"
                    type="text"
                    placeholder="Nhập tên công ty"
                    name="companyName"
                    required
                    aria-describedby="companyName"
                    value={infoRecruitment.companyName}
                    onChange={onChangeInfoRecruitment}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Text id="imgLogo" muted>
                    Ảnh logo công ty
                  </Form.Text>
                  <Form.Control
                    className="mt-1"
                    type="file"
                    name="img"
                    aria-describedby="imgLogo"
                    onChange={onChangeImgLogo}
                  />
                </Form.Group>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mt-2">
                      <Form.Text id="salary" muted>
                        Mức lương
                      </Form.Text>
                      <Form.Control
                        className="mt-1"
                        type="text"
                        placeholder="Nhập mức lương"
                        name="salary"
                        required
                        aria-describedby="salary"
                        value={infoRecruitment.salary}
                        onChange={onChangeInfoRecruitment}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mt-2">
                      <Form.Text id="workingForm" muted>
                        Hình thức làm việc
                      </Form.Text>
                      <Form.Select
                        name="workingForm"
                        className="mt-1"
                        id="workingForm"
                        value={infoRecruitment.workingForm}
                        onChange={onChangeInfoRecruitment}
                      >
                        <option value="Toàn thời gian">Toàn thời gian</option>
                        <option value="Bán thời gian">Bán thời gian</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mt-2">
                      <Form.Text id="level" muted>
                        Cấp bậc
                      </Form.Text>
                      <Form.Select
                        name="level"
                        className="mt-1"
                        id="level"
                        value={infoRecruitment.level}
                        onChange={onChangeInfoRecruitment}
                      >
                        <option value="Nhân viên">Nhân viên</option>
                        <option value="Trưởng nhóm">Trưởng nhóm</option>
                        <option value="Phó phòng">Phó phòng</option>
                        <option value="Trưởng phòng">Trưởng phòng</option>
                        <option value="Phó giám đốc">Phó giám đốc</option>
                        <option value="Giám đốc">Giám đốc</option>
                        <option value="Tổng giám đốc">Tổng giám đốc</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mt-2">
                      <Form.Text id="experience" muted>
                        Kinh nghiệm
                      </Form.Text>
                      <Form.Select
                        name="experience"
                        className="mt-1"
                        id="experience"
                        value={infoRecruitment.experience}
                        onChange={onChangeInfoRecruitment}
                      >
                        <option value="Không yêu cầu">Không yêu cầu</option>
                        <option value="1 năm">1 năm</option>
                        <option value="2 năm">2 năm</option>
                        <option value="3 năm">3 năm</option>
                        <option value="4 năm">4 năm</option>
                        <option value="5 năm">5 năm</option>
                        <option value="Tên 5 năm">Trên 5 năm</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mt-2">
                  <Form.Text id="address" muted>
                    Địa điểm làm việc
                  </Form.Text>
                  <Form.Control
                    className="mt-1"
                    type="text"
                    placeholder="Nhập địa điểm làm việc"
                    name="address"
                    required
                    aria-describedby="address"
                    value={infoRecruitment.address}
                    onChange={onChangeInfoRecruitment}
                  />
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Text id="deadline" muted>
                    Hạn nộp hồ sơ
                  </Form.Text>
                  <DatePicker
                    name="deadline"
                    className="form-control mt-1"
                    selected={deadline}
                    value={deadline}
                    onChange={onChangeDeadline}
                    dateFormat="dd/MM/yyyy"
                    disabledKeyboardNavigation
                    placeholderText="Hạn nộp hồ sơ"
                    locale="vi"
                    showYearDropdown
                    scrollableMonthYearDropdown
                    id="deadline"
                  />
                </Form.Group>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mt-2">
                      <Form.Text id="quantity" muted>
                        Số lượng tuyển
                      </Form.Text>
                      <Form.Control
                        className="mt-1"
                        type="text"
                        placeholder="Nhập số lượng tuyển"
                        name="quantity"
                        required
                        aria-describedby="quantity"
                        value={infoRecruitment.quantity}
                        onChange={onChangeInfoRecruitment}
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
                        value={infoRecruitment.gender}
                        onChange={onChangeInfoRecruitment}
                      >
                        <option value="Không yêu cầu">Không yêu cầu</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className="mt-2">
                      <Form.Text id="career" muted>
                        Ngành nghề
                      </Form.Text>
                      <Form.Select
                        name="career"
                        className="mt-1"
                        id="career"
                        value={infoRecruitment.career}
                        onChange={onChangeInfoRecruitment}
                      >
                        {careerData.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className="mt-2">
                      <Form.Text id="location" muted>
                        Khu vực
                      </Form.Text>
                      <Form.Select
                        name="location"
                        className="mt-1"
                        id="location"
                        value={infoRecruitment.location}
                        onChange={onChangeInfoRecruitment}
                      >
                        {locationData.map((item, index) => (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <h1 className="create-recruitment-title mt-4">
            <img
              src={infoIcon}
              alt="infoIcon"
              width="24"
              height="24"
              className="mb-1 me-2"
            />
            Chi tiết tin tuyển dụng:
          </h1>
          <Form.Group className="mt-3">
            <Editor
              className="form-control"
              placeholder="Nhập các kỹ năng ..."
              editorState={description}
              onEditorStateChange={onEditorDescription}
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
              Đăng tin tuyển dụng
            </Button>
          </div>
        </Form>
      </Container>

      <Modal show={showModalSuccess} onHide={closeModalSuccess}>
        <Modal.Header style={{ display: 'block', backgroundColor: '#f8f9fa' }}>
          <Modal.Title>
            <h4 className="text-center">Tạo tin tuyển dụng thành công!</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-center">
            Tạo tin tuyển dụng thành công, tin tuyển dụng của bạn sẽ được phê
            duyệt sau ít phút.
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="text-center">
                <Button variant="success" onClick={closeModalSuccess}>
                  Đồng ý
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalFail} onHide={closeModalFail}>
        <Modal.Header style={{ display: 'block', backgroundColor: '#f8f9fa' }}>
          <Modal.Title>
            <h4 className="text-center">Thông báo!</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="text-center">
            Bạn có tin tuyển dụng chưa được phê duyệt, vui lòng chờ quá trình
            phê duyệt hoàn tất.
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Row>
              <Col className="text-center">
                <Button variant="success" onClick={closeModalFail}>
                  Đồng ý
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRecruitment;