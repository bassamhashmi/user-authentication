import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserTokenProvider } from "./context/userTokenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UserTokenProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserTokenProvider>
    </AuthProvider>
  </React.StrictMode>
);
