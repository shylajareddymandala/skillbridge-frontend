import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const userName = user?.name || "Student";

  return (
    <div className="dashboard-layout">

      <Sidebar />

      <main className="dashboard-main">

        {/* TOP BAR */}

        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-small-title">
              STUDENT DASHBOARD
            </p>

            <h1>
              Welcome back, {userName.split(" ")[0]} 👋
            </h1>

            <p className="dashboard-subtitle">
              Here's what's happening with your SkillBridge profile.
            </p>
          </div>

          <div className="dashboard-top-actions">
            <button
              className="dashboard-notification"
              onClick={() => navigate("/requests")}
            >
              🔔
              <span></span>
            </button>

            <div
              className="dashboard-profile-mini"
              onClick={() => navigate("/profile")}
            >
              <div className="dashboard-mini-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{userName}</strong>
                <small>{user?.role || "STUDENT"}</small>
              </div>
            </div>
          </div>
        </header>

        {/* HERO */}

        <section className="dashboard-hero">

          <div className="dashboard-hero-content">

            <span className="dashboard-hero-label">
              ✨ YOUR SKILL JOURNEY
            </span>

            <h2>
              Build your skills.
              <br />
              Connect with people.
            </h2>

            <p>
              Discover talented students, share knowledge,
              and collaborate on exciting opportunities.
            </p>

            <div className="dashboard-hero-buttons">

              <button
                onClick={() => navigate("/search-students")}
                className="dashboard-primary-btn"
              >
                Find Students →
              </button>

              <button
                onClick={() => navigate("/profile")}
                className="dashboard-secondary-btn"
              >
                View Profile
              </button>

            </div>

          </div>

          <div className="dashboard-hero-decoration">
            <div className="hero-circle hero-circle-one"></div>
            <div className="hero-circle hero-circle-two"></div>

            <div className="hero-floating-card">
              <span>🚀</span>

              <div>
                <strong>Keep growing!</strong>
                <small>You're doing great</small>
              </div>
            </div>
          </div>

        </section>

        {/* STATISTICS */}

        <section className="dashboard-section">

          <div className="dashboard-section-title">
            <div>
              <h2>Overview</h2>
              <p>Your SkillBridge activity at a glance.</p>
            </div>
          </div>

          <div className="dashboard-stats">

            <div
              className="dashboard-stat-card"
              onClick={() => navigate("/profile")}
            >
              <div className="stat-icon purple">
                👤
              </div>

              <div>
                <span>Profile</span>
                <strong>85%</strong>
                <small>Complete</small>
              </div>

              <div className="stat-arrow">→</div>
            </div>

            <div
              className="dashboard-stat-card"
              onClick={() => navigate("/skills")}
            >
              <div className="stat-icon blue">
                ✦
              </div>

              <div>
                <span>My Skills</span>
                <strong>3+</strong>
                <small>Skills added</small>
              </div>

              <div className="stat-arrow">→</div>
            </div>

            <div
              className="dashboard-stat-card"
              onClick={() => navigate("/search-students")}
            >
              <div className="stat-icon green">
                ♧
              </div>

              <div>
                <span>Connections</span>
                <strong>8</strong>
                <small>Students</small>
              </div>

              <div className="stat-arrow">→</div>
            </div>

            <div
              className="dashboard-stat-card"
              onClick={() => navigate("/requests")}
            >
              <div className="stat-icon orange">
                ✉
              </div>

              <div>
                <span>Requests</span>
                <strong>2</strong>
                <small>Pending</small>
              </div>

              <div className="stat-arrow">→</div>
            </div>

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="dashboard-section">

          <div className="dashboard-section-title">
            <div>
              <h2>Quick Actions</h2>
              <p>Jump directly to what you need.</p>
            </div>
          </div>

          <div className="dashboard-actions">

            <button
              onClick={() => navigate("/profile")}
              className="dashboard-action-card"
            >
              <div className="action-card-icon">
                👤
              </div>

              <div>
                <strong>My Profile</strong>
                <span>Manage your information</span>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() => navigate("/skills")}
              className="dashboard-action-card"
            >
              <div className="action-card-icon">
                ✦
              </div>

              <div>
                <strong>Manage Skills</strong>
                <span>Add or remove your skills</span>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() => navigate("/search-students")}
              className="dashboard-action-card"
            >
              <div className="action-card-icon">
                🔎
              </div>

              <div>
                <strong>Find Students</strong>
                <span>Discover people to collaborate</span>
              </div>

              <b>→</b>
            </button>

            <button
              onClick={() => navigate("/requests")}
              className="dashboard-action-card"
            >
              <div className="action-card-icon">
                🤝
              </div>

              <div>
                <strong>Collaboration</strong>
                <span>View connection requests</span>
              </div>

              <b>→</b>
            </button>

          </div>

        </section>

        {/* BOTTOM CTA */}

        <section className="dashboard-bottom-banner">

          <div>
            <span>💡 TIP FOR YOU</span>

            <h2>
              Complete your profile to connect with more students.
            </h2>

            <p>
              Add your skills and department so others can discover
              you more easily.
            </p>
          </div>

          <button onClick={() => navigate("/profile")}>
            Complete Profile →
          </button>

        </section>

        <footer className="dashboard-footer">
          © 2026 SkillBridge · Connect • Collaborate • Grow
        </footer>

      </main>

    </div>
  );
}

export default Dashboard;