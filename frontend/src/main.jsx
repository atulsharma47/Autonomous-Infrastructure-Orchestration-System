import React from "react";

import ReactDOM
from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import App from "./App";

import "./index.css";

import socket
from "./services/socket";

import {
  SystemProvider,
} from "./context/SystemContext";

import {
  AuthProvider,
} from "./auth/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>

    <BrowserRouter>

      <AuthProvider>

        <SystemProvider>

          <App />

        </SystemProvider>

      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>

);

/* SOCKET CONNECTION */

socket.on(
  "connect",
  () => {

    console.log(
      "Connected to backend:",
      socket.id
    );

  }
);

/* SOCKET MESSAGE */

socket.on(
  "system:message",
  (data) => {

    console.log(
      data.message
    );

  }
);