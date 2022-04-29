import React from 'react';
import MainRoute from './routing/MainRoute';
import AccountContextProvider from './contexts/AccountContext';

function App() {
  return (
    <AccountContextProvider>
      <MainRoute />
    </AccountContextProvider>
  );
}

export default App;
