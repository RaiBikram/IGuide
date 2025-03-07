import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import { AuthContextProvider } from "./contextAPi/AuthContext";
// import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthContextProvider>
     <App />
     <ToastContainer autoClose={1000} />
          {/* <Toaster /> */}
     </AuthContextProvider>
  
  </StrictMode>
);
