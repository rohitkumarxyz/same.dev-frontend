import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { GOOGLE_CLIENT_ID } from './config/config.ts';
console.log("Google Client ID:", GOOGLE_CLIENT_ID),


createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ zIndex: 9999 }}
      />
    </GoogleOAuthProvider>
  </RecoilRoot>
);
