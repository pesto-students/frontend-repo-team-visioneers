// Loading.js
import React from "react";
import { PacmanLoader } from "react-spinners";
import "./Loading.css"; // Import the CSS for additional styling

function Loading() {
  return (
    <div className="loading-container">
      <PacmanLoader color="#007bff" size={50} />
    </div>
  );
}

export default Loading;

