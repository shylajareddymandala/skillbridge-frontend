import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* NAVBAR */}
      <header className="home-navbar">

        <div className="home-brand">
          <div className="home-logo">S</div>

          <div>
            <strong>SkillBridge</strong>
            <span>Connect • Learn • Collaborate</span>
          </div>
        </div>

        <div className="home-nav-actions">
          <button
            className="home-login-link"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>

          <button
            className="home-register-btn"
            onClick={() => navigate("/register")}
          >
            Get Started
          </button>
        </div>

      </header>

      {/* HERO */}
      <main>

        <section className="home-hero">

          <div className="hero-content">

            <span className="hero-badge">
              🚀 STUDENT COLLABORATION PLATFORM
            </span>

            <h1>
              Turn your skills into
              <span> opportunities.</span>
            </h1>

            <p>
              SkillBridge helps students discover each other's skills,
              connect with talented peers, and collaborate on meaningful
              projects.
            </p>

            <div className="hero-buttons">

              <button
                className="hero-primary-btn"
                onClick={() => navigate("/register")}
              >
                Create Your Profile →
              </button>

              <button
                className="hero-secondary-btn"
                onClick={() => navigate("/login")}
              >
                Already a member?
              </button>

            </div>

            <div className="hero-trust">

              <div className="trust-item">
                <strong>Connect</strong>
                <span>with students</span>
              </div>

              <div className="trust-line"></div>

              <div className="trust-item">
                <strong>Showcase</strong>
                <span>your skills</span>
              </div>

              <div className="trust-line"></div>

              <div className="trust-item">
                <strong>Collaborate</strong>
                <span>on projects</span>
              </div>

            </div>

          </div>

          {/* HERO VISUAL */}
          <div className="hero-visual">

            <div className="visual-glow"></div>

            <div className="floating-card card-top">
              <div className="floating-icon purple">✦</div>
              <div>
                <strong>Skills</strong>
                <span>Java • Python • React</span>
              </div>
            </div>

            <div className="profile-preview">

              <div className="preview-top">
                <span>Student Profile</span>
                <span className="online-dot">●</span>
              </div>

              <div className="preview-user">

                <div className="preview-avatar">
                  S
                </div>

                <div>
                  <strong>Skill Builder</strong>
                  <span>Computer Science</span>
                </div>

              </div>

              <div className="preview-divider"></div>

              <span className="preview-label">
                SKILLS
              </span>

              <div className="skill-pills">
                <span>Java</span>
                <span>Python</span>
                <span>React</span>
                <span>SQL</span>
              </div>

              <button className="preview-connect">
                View Profile
              </button>

            </div>

            <div className="floating-card card-bottom">

              <div className="connection-icon">
                🤝
              </div>

              <div>
                <strong>New Connection</strong>
                <span>Ready to collaborate</span>
              </div>

            </div>

          </div>

        </section>

        {/* FEATURES */}
        <section className="home-features">

          <div className="features-heading">

            <span>WHY SKILLBRIDGE?</span>

            <h2>
              Everything you need to
              <br />
              <strong>connect and collaborate.</strong>
            </h2>

            <p>
              Build your student network around the skills and projects
              that matter to you.
            </p>

          </div>

          <div className="feature-grid">

            <div className="home-feature-card">

              <div className="home-feature-icon purple-bg">
                👤
              </div>

              <h3>Build Your Profile</h3>

              <p>
                Create a professional student profile and showcase your
                technical skills, department, and interests.
              </p>

              <span className="feature-number">01</span>

            </div>

            <div className="home-feature-card">

              <div className="home-feature-icon blue-bg">
                🔍
              </div>

              <h3>Find Students</h3>

              <p>
                Search for students by name, department, or skills and
                discover people you can work with.
              </p>

              <span className="feature-number">02</span>

            </div>

            <div className="home-feature-card">

              <div className="home-feature-icon green-bg">
                🤝
              </div>

              <h3>Collaborate</h3>

              <p>
                Send collaboration requests and connect with students
                who complement your skills.
              </p>

              <span className="feature-number">03</span>

            </div>

          </div>

        </section>

        {/* CTA */}
        <section className="home-cta">

          <div>

            <span>READY TO GET STARTED?</span>

            <h2>
              Your next great collaboration
              <br />
              could start here.
            </h2>

          </div>

          <button
            onClick={() => navigate("/register")}
          >
            Join SkillBridge →
          </button>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="home-footer">

        <div className="footer-brand">
          <div className="footer-logo">S</div>

          <div>
            <strong>SkillBridge</strong>
            <span>Connect • Learn • Collaborate</span>
          </div>
        </div>

        <p>
          © 2026 SkillBridge. Built for student collaboration.
        </p>

      </footer>

    </div>
  );
}

export default Home;