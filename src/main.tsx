import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById("root")!).render(
  <RecoilRoot>

    <GoogleOAuthProvider clientId={"67043714389-mt91jk8ptf1b2e466lb5lmo137oh316s.apps.googleusercontent.com"}>
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
