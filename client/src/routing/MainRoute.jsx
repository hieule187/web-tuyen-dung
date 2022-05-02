import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SignupCandidate from '../components/Account/SignupCandidate';
import SignupRecruiter from '../components/Account/SignupRecruiter';
import Login from '../components/Account/Login';
import EmailVerify from '../components/Account/EmailVerify';
import ForgotPassword from '../components/Account/ForgotPassword';
import PasswordReset from '../components/Account/PasswordReset';
import CandidateRoute from './CandidateRoute';
import MyProfile from '../components/Profile/MyProfile';
import CreateProfile from '../components/Profile/CreateProfile';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup-candidate" element={<SignupCandidate />} />
      <Route path="/signup-recruiter" element={<SignupRecruiter />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/account/:id/verify/:verifyToken"
        element={<EmailVerify />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="account/password-reset/:id/:verifyToken"
        element={<PasswordReset />}
      />
      <Route element={<CandidateRoute />}>
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/create-profile" element={<CreateProfile />} />
      </Route>
    </Routes>
  );
};

export default MainRoute;
