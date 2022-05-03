import React from 'react';
import MainRoute from './routing/MainRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountContextProvider from './contexts/AccountContext';

function App() {
  return (
    <AccountContextProvider>
      <MainRoute />
      <ToastContainer position="bottom-right" />
    </AccountContextProvider>
  );
}

export default App;
