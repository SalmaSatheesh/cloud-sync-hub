import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to CloudSyncHub 🚀</h1>
      <p>Your secure cloud storage solution.</p>

      <div className="button-group">
        <button onClick={() => navigate("/dashboard")} className="dashboard-btn">
          Go to Dashboard
        </button>
        <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
