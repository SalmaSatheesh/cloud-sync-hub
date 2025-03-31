import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFolder, FaFileUpload, FaHdd, FaShareAlt, FaClock, FaStar, FaTrash, FaPlus } from "react-icons/fa";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">CloudSyncHub</h2>
        <ul>
          <li><Link to="/my-drive"><FaHdd /> My Drive</Link></li>
          <li><Link to="/shared"><FaShareAlt /> Shared with me</Link></li>
          <li><Link to="/recent"><FaClock /> Recent</Link></li>
          <li><Link to="/starred"><FaStar /> Starred</Link></li>
          <li><Link to="/trash"><FaTrash /> Trash</Link></li>
        </ul>
      </div>

      {/* Floating "New" Button */}
      <button className="new-button" onClick={() => setShowMenu(!showMenu)}>
        <FaPlus /> New
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="dropdown-menu">
          <div className="menu-item">
            <FaFolder /> New Folder
          </div>
          <div className="menu-item">
            <label htmlFor="file-upload">
              <FaFileUpload /> Upload File
            </label>
            <input type="file" id="file-upload" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
