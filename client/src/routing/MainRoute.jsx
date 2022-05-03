import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
import UpdateProfile from '../components/Profile/UpdateProfile';

const MainRoute = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup-candidate" component={SignupCandidate} />
      <Route exact path="/signup-recruiter" component={SignupRecruiter} />
      <Route exact path="/login" component={Login} />
      <Route path="/account/:id/verify/:verifyToken" component={EmailVerify} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        path="/account/password-reset/:id/:verifyToken"
        component={PasswordReset}
      />
      <CandidateRoute path="/profile" component={MyProfile} />
      <CandidateRoute
        path="/create-profile/:fullName"
        component={CreateProfile}
      />
      <CandidateRoute
        path="/update-profile/:fullName"
        component={UpdateProfile}
      />
    </Switch>
  );
};

export default MainRoute;
