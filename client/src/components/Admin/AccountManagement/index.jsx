import React, { useEffect, useState } from 'react';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import lockIcon from '../../../assets/lock.svg';
import unlockIcon from '../../../assets/unlock.svg';
import searchIcon from '../../../assets/search.svg';
import AccountAPI from '../../../API/AccountAPI';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import 'moment/locale/vi';

const AccountManagement = () => {
  const [loading, setLoading] = useState(false);
  const [existAccount, setExistAccount] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [key, setKey] = useState('');
  const [searched, setSearched] = useState(false);
  const [pageCountSearch, setPageCountSearch] = useState(0);
  const [totalQuantitySearch, setTotalQuantitySearch] = useState(0);

  useEffect(() => {
    const getAccountManagement = async () => {
      setLoading(true);
      const accountData = await AccountAPI.getAccountManagement();
      if (accountData.success) {
        setAccounts(accountData.account);
        setPageCount(accountData.totalPages);
        setLoading(false);
      } else {
        setExistAccount(false);
        setLoading(false);
      }
    };
    getAccountManagement();
  }, []);

  const handlePageClick = async (data) => {
    let currentPage = data.selected;
    const dataInPage = await AccountAPI.getAccountManagementPage(currentPage);
    setAccounts(dataInPage.account);
  };

  const reloadDataInPage = async () => {
    const accountData = await AccountAPI.getAccountManagement();
    if (accountData.success) {
      setAccounts(accountData.account);
      setPageCount(accountData.totalPages);
    }
  };

  const handleLockAccount = async (accountId) => {
    const lockAccount = await AccountAPI.lockAccountById(accountId);
    if (lockAccount.success) {
      reloadDataInPage();
      toast.success(lockAccount.message);
    } else {
      toast.error(lockAccount.message);
    }
  };

  const handleUnlockAccount = async (accountId) => {
    const unlockAccount = await AccountAPI.unlockAccountById(accountId);
    if (unlockAccount.success) {
      reloadDataInPage();
      toast.success(unlockAccount.message);
    } else {
      toast.error(unlockAccount.message);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const accountSearchData = await AccountAPI.getSearchAccountManagement(key);
    if (accountSearchData.success) {
      setSearched(true);
      setAccounts(accountSearchData.account);
      setPageCountSearch(accountSearchData.totalPages);
      setTotalQuantitySearch(accountSearchData.totalQuantity);
    } else {
      setSearched(true);
      setExistAccount(false);
    }
  };

  const handlePageSearchClick = async (data) => {
    let currentPage = data.selected;
    const dataInPageSearch = await AccountAPI.getSearchAccountManagementPage(
      key,
      currentPage,
    );
    setSearched(true);
    setAccounts(dataInPageSearch.account);
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Quản lý tài khoản - FastJob</title>
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
          <title>Quản lý tài khoản - FastJob</title>
        </Helmet>
        <div className="account-management-wrapper">
          <Container className="mt-4">
            <h1 className="account-management-header">Quản lý tài khoản</h1>
          </Container>

          {existAccount ? (
            <Container className="mt-4 pb-5">
              <Row>
                <Col md={12} lg={6}>
                  <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                      type="search"
                      placeholder="Tìm kiếm theo tên, email, loại tài khoản"
                      className="me-2"
                      name="key"
                      required
                      value={key}
                      onChange={(e) => setKey(e.target.value)}
                    />
                    <Button variant="success" type="submit">
                      <img
                        src={searchIcon}
                        alt="searchIcon"
                        width="20"
                        height="20"
                        className="no-select"
                      />
                    </Button>
                  </Form>
                </Col>
              </Row>

              {searched && (
                <p className="mt-4 mb-0">
                  Tìm thấy{' '}
                  <span className="fw-bold text-success">
                    {totalQuantitySearch}
                  </span>{' '}
                  tài khoản
                </p>
              )}

              <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
                {accounts.map((account) => {
                  return (
                    <Col key={account._id} className="mt-4">
                      <Card className="card-border">
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between">
                            <Badge
                              className={
                                account.role === 'candidate'
                                  ? 'bg-warning fw-normal'
                                  : 'bg-info fw-normal'
                              }
                            >
                              {account.role === 'candidate'
                                ? 'Ứng viên'
                                : 'Nhà tuyển dụng'}
                            </Badge>
                            <Badge className="bg-secondary fw-normal">
                              Ngày tạo:{' '}
                              {moment(
                                account ? account.createdAt : null,
                              ).format('DD/MM/YYYY')}
                            </Badge>
                          </div>
                          <Card.Title className="title-card-account-management">
                            <h1 className="title-account-management text-capitalize mt-3 mb-0">
                              {account.fullName}
                            </h1>

                            <p className="company-account-management">
                              {account.email}
                            </p>
                          </Card.Title>

                          <div className="d-flex justify-content-between">
                            <div>
                              {!account.status ? (
                                <Button
                                  variant="light"
                                  onClick={() =>
                                    handleUnlockAccount(account._id)
                                  }
                                >
                                  <img
                                    className="no-select unlockAcc-btn"
                                    src={lockIcon}
                                    alt="lockIcon"
                                  />
                                  Mở khóa
                                </Button>
                              ) : (
                                <Button
                                  variant="light"
                                  onClick={() => handleLockAccount(account._id)}
                                >
                                  <img
                                    className="no-select lockAcc-btn"
                                    src={unlockIcon}
                                    alt="unlockIcon"
                                  />
                                  Khóa
                                </Button>
                              )}
                            </div>
                            <div>
                              <Badge
                                className={
                                  account.status
                                    ? 'bg-success fw-normal badge-status'
                                    : 'bg-danger fw-normal badge-status'
                                }
                              >
                                {account.status ? 'Đã mở khóa' : 'Đã khóa'}
                              </Badge>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>

              <div className="mt-5">
                <ReactPaginate
                  previousLabel={'Trước'}
                  nextLabel={'Tiếp'}
                  breakLabel={'...'}
                  pageCount={searched ? pageCountSearch : pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={
                    searched ? handlePageSearchClick : handlePageClick
                  }
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
          ) : searched ? (
            <Container className="mt-4" style={{ paddingBottom: '500px' }}>
              <Alert variant="warning">
                Không tìm thấy tài khoản nào phù hợp.
              </Alert>
            </Container>
          ) : (
            <Container className="mt-4" style={{ paddingBottom: '500px' }}>
              <Alert variant="warning">Hiện chưa có tài khoản nào.</Alert>
            </Container>
          )}
        </div>
      </>
    );
  }
};

export default AccountManagement;
