import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
<<<<<<< HEAD

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
=======
import { StoreProvider } from "./StoreContext";
import { AuthProvider } from "./AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </AuthProvider>
  </React.StrictMode>
);
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
