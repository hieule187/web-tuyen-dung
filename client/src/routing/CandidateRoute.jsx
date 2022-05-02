import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AccountContext } from '../contexts/AccountContext';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../components/NavbarMenu';

const CandidateRoute = () => {
  // Context
  const {
    accountState: { authLoading, isAuthenticated, user },
  } = useContext(AccountContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="success" />
      </div>
    );

  return isAuthenticated && user.role === 'candidate' ? (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default CandidateRoute;
