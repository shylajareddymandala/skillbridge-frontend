import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "STUDENT",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.department ||
      !formData.password
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      setSuccess("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* LEFT SIDE */}
      <div className="register-brand-section">

        <div className="register-brand">

          <div className="register-logo">
            S
          </div>

          <div>
            <h1>SkillBridge</h1>
            <p>Connect • Learn • Collaborate</p>
          </div>

        </div>

        <div className="register-intro">

          <span className="register-badge">
            JOIN THE COMMUNITY
          </span>

          <h2>
            Build your profile.
            <br />
            Find your bridge.
          </h2>

          <p>
            Create your SkillBridge account and connect with students who
            share your interests, skills, and ambitions.
          </p>

        </div>

        <div className="register-features">

          <div className="register-feature">
            <div className="register-feature-icon">👤</div>

            <div>
              <strong>Create Your Profile</strong>
              <span>
                Showcase your department, role, and technical skills.
              </span>
            </div>
          </div>

          <div className="register-feature">
            <div className="register-feature-icon">🔍</div>

            <div>
              <strong>Discover Students</strong>
              <span>
                Find students with skills that complement yours.
              </span>
            </div>
          </div>

          <div className="register-feature">
            <div className="register-feature-icon">🚀</div>

            <div>
              <strong>Start Collaborating</strong>
              <span>
                Turn your ideas into meaningful projects together.
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="register-form-section">

        <div className="register-card">

          <div className="register-card-header">

            <div className="mobile-register-logo">
              S
            </div>

            <h2>Create your account</h2>

            <p>
              Join SkillBridge and start connecting with students.
            </p>

          </div>

          <form onSubmit={handleRegister}>

            {/* NAME */}
            <div className="register-form-group">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="register-input-wrapper">
                <span>👤</span>

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* EMAIL */}
            <div className="register-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="register-input-wrapper">
                <span>✉</span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

            </div>

            {/* DEPARTMENT + ROLE */}
            <div className="register-two-column">

              <div className="register-form-group">

                <label htmlFor="department">
                  Department
                </label>

                <div className="register-input-wrapper">
                  <span>🏫</span>

                  <input
                    id="department"
                    name="department"
                    type="text"
                    placeholder="e.g. CSE"
                    value={formData.department}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="register-form-group">

                <label htmlFor="role">
                  Role
                </label>

                <div className="register-input-wrapper">
                  <span>🎓</span>

                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY">Faculty</option>
                  </select>
                </div>

              </div>

            </div>

            {/* PASSWORD */}
            <div className="register-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="register-input-wrapper">
                <span>🔒</span>

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

            </div>

            {error && (
              <div className="register-error">
                ⚠ {error}
              </div>
            )}

            {success && (
              <div className="register-success">
                ✓ {success}
              </div>
            )}

            <button
              type="submit"
              className="register-submit-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account →"}
            </button>

          </form>

          <div className="register-divider">
            <span>Already have an account?</span>
          </div>

          <button
            className="back-login-button"
            onClick={() => navigate("/login")}
          >
            Sign In Instead
          </button>

          <div className="register-footer">
            <span>SkillBridge</span>
            <span>•</span>
            <span>Learn. Connect. Grow.</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;