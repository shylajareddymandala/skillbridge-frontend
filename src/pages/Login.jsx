import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const url =
        `https://skillbridge-backend-production-947b.up.railway.app/users/login?email=${encodeURIComponent(email.trim())}&password=${encodeURIComponent(password)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const user = await response.json();

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-brand-section">

        <div className="login-brand">

          <div className="login-logo">
            S
          </div>

          <div>
            <h1>SkillBridge</h1>
            <span>Connect • Collaborate • Grow</span>
          </div>

        </div>

        <div className="login-brand-content">

          <span className="login-label">
            WELCOME BACK
          </span>

          <h2>
            Continue your
            <br />
            <span>skill journey.</span>
          </h2>

          <p>
            Connect with talented students, share your
            knowledge, and discover new opportunities
            through SkillBridge.
          </p>

          <div className="login-features">

            <div className="login-feature">
              <div>✦</div>
              <span>Build your professional profile</span>
            </div>

            <div className="login-feature">
              <div>♧</div>
              <span>Connect with skilled students</span>
            </div>

            <div className="login-feature">
              <div>🚀</div>
              <span>Collaborate on exciting projects</span>
            </div>

          </div>

        </div>

        <div className="login-brand-footer">
          © 2026 SkillBridge
        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="login-form-section">

        <div className="login-form-container">

          <div className="login-mobile-logo">
            <div className="login-logo">
              S
            </div>

            <div>
              <h1>SkillBridge</h1>
              <span>Connect • Collaborate • Grow</span>
            </div>
          </div>

          <div className="login-heading">

            <h2>Welcome back! 👋</h2>

            <p>
              Sign in to continue to your SkillBridge account.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="login-input-group">

              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            <div className="login-input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {error && (
              <div className="login-error">
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In →"}
            </button>

          </form>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <div className="login-register">

            <span>
              Don't have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

          </div>

          <button
            className="login-home"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;