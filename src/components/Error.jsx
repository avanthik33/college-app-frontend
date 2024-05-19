import React from "react";
import "./Error.css"; // Import the CSS file

const Error = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <img
          src="https://i.imgur.com/U3vTGjX.png"
          alt="Error"
          className="error-image"
        />
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <p className="error-message">
          We encountered an error while processing your request. Please try
          again later.
        </p>
        <button
          className="error-button"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
