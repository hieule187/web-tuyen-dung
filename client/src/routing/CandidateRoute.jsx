import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AccountContext } from '../contexts/AccountContext';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../components/NavbarMenu';

const CandidateRoute = ({ component: Component, ...rest }) => {
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

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.role === 'candidate' ? (
          <>
            <NavbarMenu></NavbarMenu>
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default CandidateRoute;
