import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    department: storedUser?.department || "",
    role: storedUser?.role || "STUDENT",
  });

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <div className="empty-icon">👤</div>

          <h2>No User Logged In</h2>

          <p>Please log in to view your profile.</p>

          <button onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const userName = user.name || "Student";
  const firstLetter = userName.charAt(0).toUpperCase();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // Start editing
  const handleEdit = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      department: user.department || "",
      role: user.role || "STUDENT",
    });

    setIsEditing(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      department: user.department || "",
      role: user.role || "STUDENT",
    });

    setIsEditing(false);
  };

  // Save profile
  const handleSave = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.department.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `http://localhost:8080/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            department: formData.department.trim(),
            role: formData.role,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();

      // Update React state
      setUser(updatedUser);

      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setIsEditing(false);

      alert("Profile updated successfully! ✅");

    } catch (error) {
      console.error("Error updating profile:", error);

      alert(
        "Failed to update profile. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="profile-page">

      {/* PROFILE HEADER */}
      <section className="profile-header">

        <div className="profile-avatar">
          {firstLetter}
        </div>

        <div className="profile-heading">

          <p className="profile-label">
            MY PROFILE
          </p>

          <h1>{userName}</h1>

          <p>
            {user.department || "Student"} •{" "}
            {user.role || "STUDENT"}
          </p>

        </div>

        <div className="profile-status">

          <span className="status-dot"></span>

          Active

        </div>

      </section>


      {/* PROFILE COMPLETION */}
      <section className="completion-card">

        <div className="completion-info">

          <div>

            <h2>
              Profile Completion
            </h2>

            <p>
              Keep your profile updated to connect with more students.
            </p>

          </div>

          <strong>85%</strong>

        </div>

        <div className="completion-bar">

          <div className="completion-fill"></div>

        </div>

      </section>


      {/* INFORMATION CARDS */}
      <section className="profile-grid">


        {/* PERSONAL INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-title">

            <div className="title-icon">
              👤
            </div>

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Your basic account information
              </p>

            </div>

          </div>


          {!isEditing ? (

            /* VIEW MODE */
            <div className="info-list">

              <div className="info-row">

                <span>
                  Name
                </span>

                <strong>
                  {user.name || "Not provided"}
                </strong>

              </div>


              <div className="info-row">

                <span>
                  Email
                </span>

                <strong>
                  {user.email || "Not provided"}
                </strong>

              </div>


              <div className="info-row">

                <span>
                  Department
                </span>

                <strong>
                  {user.department || "Not provided"}
                </strong>

              </div>


              <div className="info-row">

                <span>
                  Role
                </span>

                <strong>
                  {user.role || "STUDENT"}
                </strong>

              </div>

            </div>

          ) : (

            /* EDIT MODE */
            <div className="profile-edit-form">

              <div className="profile-input-group">

                <label>
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                />

              </div>


              <div className="profile-input-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

              </div>


              <div className="profile-input-group">

                <label>
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter your department"
                />

              </div>


              <div className="profile-input-group">

                <label>
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >

                  <option value="STUDENT">
                    STUDENT
                  </option>

                  <option value="ADMIN">
                    ADMIN
                  </option>

                </select>

              </div>


              <div className="profile-edit-actions">

                <button
                  className="save-profile-button"
                  onClick={handleSave}
                  disabled={saving}
                >

                  {saving
                    ? "Saving..."
                    : "✓ Save Changes"}

                </button>


                <button
                  className="cancel-profile-button"
                  onClick={handleCancel}
                  disabled={saving}
                >

                  Cancel

                </button>

              </div>

            </div>

          )}

        </div>


        {/* SKILLBRIDGE INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-title">

            <div className="title-icon blue-icon">
              🚀
            </div>

            <div>

              <h2>
                SkillBridge
              </h2>

              <p>
                Your collaboration space
              </p>

            </div>

          </div>


          <div className="profile-features">

            <div className="feature-item">

              <span>
                🛠️
              </span>

              <div>

                <strong>
                  Manage Skills
                </strong>

                <p>
                  Add skills to your profile
                </p>

              </div>

            </div>


            <div className="feature-item">

              <span>
                🔎
              </span>

              <div>

                <strong>
                  Find Students
                </strong>

                <p>
                  Discover students with similar interests
                </p>

              </div>

            </div>


            <div className="feature-item">

              <span>
                🤝
              </span>

              <div>

                <strong>
                  Collaborate
                </strong>

                <p>
                  Connect and work together
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ACTIONS */}
      <section className="profile-actions">


        {!isEditing && (

          <button
            className="primary-profile-button"
            onClick={handleEdit}
          >
            ✏️ Edit Profile
          </button>

        )}


        <button
          className="secondary-profile-button"
          onClick={() => navigate("/skills")}
        >
          🛠️ Manage My Skills
        </button>


        <button
          className="secondary-profile-button"
          onClick={() => navigate("/search-students")}
        >
          🔎 Find Students
        </button>


        <button
          className="secondary-profile-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

      </section>

    </div>
  );
}

export default Profile;