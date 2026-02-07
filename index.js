import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { PrivyProvider } from '@privy-io/react-auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <PrivyProvider
    appId="cmlc6stxk01d1l20diih62n8c"
    config={{
      loginMethods: ['email', 'google'],
      embeddedWallets: { createOnLogin: 'users-without-wallets' },
    }}
  >
    <App />
  </PrivyProvider>
);
