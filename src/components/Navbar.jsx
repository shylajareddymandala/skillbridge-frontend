import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav className="skill-navbar">

      {/* Logo */}
      <Link to="/dashboard" className="navbar-brand" onClick={closeMenus}>
        <div className="brand-icon">
          S
        </div>

        <div className="brand-text">
          <span className="brand-name">SkillBridge</span>
          <span className="brand-tagline">Connect • Learn • Collaborate</span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>

        <Link
          to="/dashboard"
          className={isActive("/dashboard") ? "nav-link active" : "nav-link"}
          onClick={closeMenus}
        >
          <span>⌂</span>
          Dashboard
        </Link>

        <Link
          to="/profile"
          className={isActive("/profile") ? "nav-link active" : "nav-link"}
          onClick={closeMenus}
        >
          <span>👤</span>
          Profile
        </Link>

        <Link
          to="/skills"
          className={isActive("/skills") ? "nav-link active" : "nav-link"}
          onClick={closeMenus}
        >
          <span>✦</span>
          Skills
        </Link>

        <Link
          to="/search-students"
          className={
            isActive("/search-students")
              ? "nav-link active"
              : "nav-link"
          }
          onClick={closeMenus}
        >
          <span>⌕</span>
          Find Students
        </Link>

        <Link
          to="/requests"
          className={isActive("/requests") ? "nav-link active" : "nav-link"}
          onClick={closeMenus}
        >
          <span>🤝</span>
          Requests
        </Link>

      </div>

      {/* Right Side */}
      <div className="navbar-right">

        {/* Notification */}
        <button
          className="notification-button"
          title="Notifications"
          onClick={() => navigate("/requests")}
        >
          🔔
          <span className="notification-dot"></span>
        </button>

        {/* User Profile */}
        <div className="profile-wrapper">

          <button
            className="navbar-user"
            onClick={() => setProfileOpen(!profileOpen)}
          >

            <div className="user-avatar">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "U"}
            </div>

            <div className="navbar-user-info">
              <strong>
                {user?.name || "Student"}
              </strong>

              <span>
                {user?.role || "STUDENT"}
              </span>
            </div>

            <span className="dropdown-arrow">
              {profileOpen ? "▲" : "▼"}
            </span>

          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div className="profile-dropdown">

              <div className="dropdown-header">

                <div className="dropdown-avatar">
                  {user?.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <div>
                  <strong>
                    {user?.name || "Student"}
                  </strong>

                  <span>
                    {user?.email || "student@skillbridge.com"}
                  </span>
                </div>

              </div>

              <div className="dropdown-divider"></div>

              <button
                onClick={() => {
                  navigate("/profile");
                  closeMenus();
                }}
              >
                👤
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  navigate("/skills");
                  closeMenus();
                }}
              >
                ✦
                <span>My Skills</span>
              </button>

              <button
                onClick={() => {
                  navigate("/requests");
                  closeMenus();
                }}
              >
                🤝
                <span>Collaboration Requests</span>
              </button>

              <div className="dropdown-divider"></div>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                ↪
                <span>Logout</span>
              </button>

            </div>
          )}

        </div>

        {/* Mobile Menu */}
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;