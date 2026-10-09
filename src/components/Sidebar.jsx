import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">S</div>

        <div>
          <h2>SkillBridge</h2>
          <span>Connect • Collaborate • Grow</span>
        </div>
      </div>

      {/* User */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="sidebar-user-info">
          <strong>{user?.name || "User"}</strong>
          <span>{user?.role || "STUDENT"}</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="sidebar-heading">MAIN MENU</p>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">◉</span>
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/skills"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">✦</span>
          <span>My Skills</span>
        </NavLink>

        <NavLink
          to="/search-students"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">⌕</span>
          <span>Find Students</span>
        </NavLink>

        <NavLink
          to="/requests"
          className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
          }
        >
          <span className="sidebar-icon">♧</span>
          <span>Collaboration</span>
        </NavLink>

        <p className="sidebar-heading sidebar-heading-bottom">
          ACCOUNT
        </p>

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <div className="help-icon">?</div>

          <div>
            <strong>Need Help?</strong>
            <span>Explore SkillBridge</span>
          </div>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;