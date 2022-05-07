import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AccountContext } from '../contexts/AccountContext';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../components/NavbarMenu';
import Footer from '../components/Footer';

const AdminRoute = ({ component: Component, ...rest }) => {
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
        isAuthenticated && user.role === 'admin' ? (
          <>
            <NavbarMenu />
            <Component {...rest} {...props} />
            <Footer />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default AdminRoute;
