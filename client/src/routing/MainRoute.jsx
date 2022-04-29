import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SignupCandidate from '../components/Account/SignupCandidate';
import SignupRecruiter from '../components/Account/SignupRecruiter';
import Login from '../components/Account/Login';
import EmailVerify from '../components/Account/EmailVerify';
import ForgotPassword from '../components/Account/ForgotPassword';
import PasswordReset from '../components/Account/PasswordReset';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/signup-candidate" exact element={<SignupCandidate />} />
      <Route path="/signup-recruiter" exact element={<SignupRecruiter />} />
      <Route path="/login" exact element={<Login />} />
      <Route
        path="/account/:id/verify/:verifyToken"
        element={<EmailVerify />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="account/password-reset/:id/:verifyToken"
        element={<PasswordReset />}
      />
    </Routes>
  );
};

export default MainRoute;
