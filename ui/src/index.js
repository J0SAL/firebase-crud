import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PageNavbar from "./components/common/PageNavbar";
import { MovieProvider } from "./context/MovieContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <PageNavbar />
          <App />
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorkerRegistration.register();
