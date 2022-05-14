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
import DetailsRecruitment from '../components/Recruitment/DetailsRecruitment';
import MyCv from '../components/Cv/MyCv';
import RecruiterRoute from './RecruiterRoute';
import CreateRecruitment from '../components/Recruitment/CreateRecruitment';
import MyRecruitment from '../components/Recruitment/MyRecruitment';
import UpdateRecruitment from '../components/Recruitment/UpdateRecruitment';
import SeeCv from '../components/Cv/SeeCv';
import SeeProfile from '../components/Profile/SeeProfile';
import AdminRoute from './AdminRoute';
import RecruitmentManagement from '../components/Admin/RecruitManagement';
import AccountManagement from '../components/Admin/AccountManagement';
import Search from '../components/Search';

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
      <CandidateRoute path="/my-cv" component={MyCv} />
      <AdminRoute path="/account-management" component={AccountManagement} />
      <Route path="/recruitment/:title/:id" component={DetailsRecruitment} />
      <RecruiterRoute
        path="/create-recruitment/:fullName"
        component={CreateRecruitment}
      />
      <RecruiterRoute path="/my-recruitment" component={MyRecruitment} />
      <RecruiterRoute
        path="/update-recruitment/:title/:id"
        component={UpdateRecruitment}
      />
      <RecruiterRoute path="/see-cv/:title/:id" component={SeeCv} />
      <RecruiterRoute
        path="/see-profile/:fullName/:id"
        component={SeeProfile}
      />
      <AdminRoute
        path="/recruitment-management"
        component={RecruitmentManagement}
      />
      <AdminRoute path="/account-management" component={AccountManagement} />
      <Route exact path="/search" component={Search} />
    </Switch>
  );
};

export default MainRoute;
