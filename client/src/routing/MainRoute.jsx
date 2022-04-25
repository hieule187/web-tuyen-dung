import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import SignupCandidate from '../components/Account/SignupCandidate';
import SignupRecruiter from '../components/Account/SignupRecruiter';
import Login from '../components/Account/Login';

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/signup-candidate" exact element={<SignupCandidate />} />
      <Route path="/signup-recruiter" exact element={<SignupRecruiter />} />
      <Route path="/login" exact element={<Login />} />
    </Routes>
  );
};

export default MainRoute;
