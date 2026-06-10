import React from "react";
import ReactDOM from "react-dom/client";
import SDGDetailPage from "./pages/SDGDetail";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SDGDetailPage sdgId={13} />
  </React.StrictMode>,
);
