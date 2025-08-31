import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-cf1qz12yv3zq81lp.us.auth0.com"
const clientId = "wrkNIBMtZ4OlgNYvhLlpRSecHNe15C19";
const audience = "https://ecommerce-api";

if (!domain || !clientId || !audience) {
  throw new Error("Missing Auth0 environment variables");
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience, // so our access token is for the API
        scope: "openid profile email phone address", // to show name/email/phone/country
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
