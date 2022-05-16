import React, { useState, useEffect } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import infoIcon from '../../../assets/info.svg';
import RecruitmentAPI from '../../../API/RecruitmentAPI';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import careerData from '../../../data/careerData';
import locationData from '../../../data/locationData';
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

const UpdateRecruitment = () => {
  const param = useParams();
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const [infoRecruitment, setInfoRecruitment] = useState({
    title: '',
    companyName: '',
    salary: 'Thỏa thuận',
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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    RecruitmentAPI.getRecruitmentById(param.id).then((recruitmentData) => {
      if (recruitmentData || recruitmentData.success) {
        const { recruitment } = recruitmentData;
        if (recruitment) {
          setInfoRecruitment({
            title: recruitment.title,
            companyName: recruitment.companyName,
            salary: recruitment.salary,
            workingForm: recruitment.workingForm,
            quantity: recruitment.quantity,
            level: recruitment.level,
            experience: recruitment.experience,
            gender: recruitment.gender,
            location: recruitment.location,
            career: recruitment.career,
            address: recruitment.address,
          });
          setDeadline(new Date(recruitment.deadline));
          setDescription(
            EditorState.createWithContent(
              ContentState.createFromBlockArray(
                convertFromHTML(recruitment.description),
              ),
            ),
          );
        }
      }
    });
  }, [param]);

  const onChangeInfoRecruitment = (event) =>
    setInfoRecruitment({
      ...infoRecruitment,
      [event.target.name]: event.target.value,
    });

  const onChangeDeadline = (date) => {
    setDeadline(date);
  };

  const onEditorDescription = (value) => {
    setDescription(value);
  };

  const _description = draftToHtml(
    convertToRaw(description.getCurrentContent()),
  );

  const formUpdateData = {
    title: infoRecruitment.title,
    companyName: infoRecruitment.companyName,
    salary: infoRecruitment.salary,
    workingForm: infoRecruitment.workingForm,
    quantity: infoRecruitment.quantity,
    level: infoRecruitment.level,
    experience: infoRecruitment.experience,
    gender: infoRecruitment.gender,
    location: infoRecruitment.location,
    career: infoRecruitment.career,
    address: infoRecruitment.address,
    deadline: deadline,
    description: _description,
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const recruitmentUpdateData = await RecruitmentAPI.updateRecruitmentById(
      param.id,
      formUpdateData,
    );
    if (recruitmentUpdateData.success) {
      setShowModal(true);
    } else {
      toast.error(recruitmentUpdateData.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    history.push('/my-recruitment');
  };

  return (
    <>
      <Helmet>
        <title>Cập nhật tin tuyển dụng - FastJob</title>
      </Helmet>
      <div className="update-recruitment-wrapper">
        <Container className="mt-4">
          <h1 className="update-recruitment-header">Cập nhật tin tuyển dụng</h1>
          <p className="update-recruitment-description">
            Xây dựng một tin tuyển dụng nổi bật để nhận được những ứng viên tiềm
            năng.
          </p>
        </Container>

        <Container className="mt-3 mb-5">
          <Form onSubmit={onSubmit}>
            <h1 className="update-recruitment-title mt-4">
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
              <Row className="update-recruitment-content">
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
                    />
                  </Form.Group>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mt-2">
                        <Form.Text id="salary" muted>
                          Mức lương
                        </Form.Text>
                        <Form.Select
                          name="salary"
                          className="mt-1"
                          id="salary"
                          value={infoRecruitment.salary}
                          onChange={onChangeInfoRecruitment}
                        >
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
                          <option value="Thực tập">Thực tập</option>
                          <option value="Remote - Làm việc từ xa">
                            Remote - Làm việc từ xa
                          </option>
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
                          <option value="Thực tập sinh">Thực tập sinh</option>
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
                          <option value="Dưới 1 năm">Dưới 1 năm</option>
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
                          placeholder="VD: 10 người"
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

            <h1 className="update-recruitment-title mt-4">
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
                placeholder="Mô tả công việc - Yêu cầu ứng viên - Quyền lợi được hưởng"
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
                Cập nhật tin tuyển dụng
              </Button>
            </div>
          </Form>

          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header
              style={{ display: 'block', backgroundColor: '#f8f9fa' }}
            >
              <Modal.Title>
                <h4 className="text-center">Cập nhật tin thành công!</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h6 className="text-center">
                Cập nhật tin tuyển dụng thành công, tin tuyển dụng của bạn sẽ
                được phê duyệt sau ít phút.
              </h6>
            </Modal.Body>
            <Modal.Footer>
              <Container>
                <Row>
                  <Col className="text-center">
                    <Button variant="success" onClick={closeModal}>
                      Đồng ý
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default UpdateRecruitment;
