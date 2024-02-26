import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { openaiApi } from "./features/apiSlice.js";
import { ApiProvider } from "@reduxjs/toolkit/query/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={openaiApi}>
      <App />
    </ApiProvider>
  </React.StrictMode>
);
