import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Skills.css";

function Skills() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch("https://skillbridge-backend-production-947b.up.railway.app/skills");

      if (!response.ok) {
        throw new Error("Failed to fetch skills");
      }

      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error loading skills:", error);
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async () => {
    if (!newSkill.trim()) {
      alert("Please enter a skill");
      return;
    }

    try {
      const response = await fetch("https://skillbridge-backend-production-947b.up.railway.app/skills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSkill.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add skill");
      }

      setNewSkill("");
      fetchSkills();
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Failed to add skill");
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    try {
      const response = await fetch(`https://skillbridge-backend-production-947b.up.railway.app/skills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete skill");
      }

      fetchSkills();
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill");
    }
  };

  return (
    <div className="skills-page">

      {/* Header */}
      <section className="skills-hero">

        <div>
          <p className="skills-label">SKILL MANAGEMENT</p>

          <h1>Build Your Skill Profile 🛠️</h1>

          <p>
            Add your technical skills and showcase what you can bring
            to a collaboration.
          </p>
        </div>

        <div className="skills-hero-icon">
          💡
        </div>

      </section>

      {/* Add Skill */}
      <section className="add-skill-card">

        <div className="add-skill-title">
          <div className="skill-icon">➕</div>

          <div>
            <h2>Add a New Skill</h2>
            <p>
              Tell other students what technologies you know.
            </p>
          </div>
        </div>

        <div className="skill-input-area">

          <input
            type="text"
            placeholder="Example: Java, Python, React..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addSkill();
              }
            }}
          />

          <button onClick={addSkill}>
            Add Skill
          </button>

        </div>

      </section>

      {/* Skills */}
      <section className="my-skills-section">

        <div className="skills-section-header">

          <div>
            <h2>Available Skills</h2>
            <p>
              Skills currently available in SkillBridge
            </p>
          </div>

          <div className="skills-count">
            {skills.length} Skills
          </div>

        </div>

        {loading ? (
          <div className="skills-loading">
            <div className="loading-circle"></div>
            <p>Loading skills...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="no-skills">
            <div>🛠️</div>
            <h3>No skills available</h3>
            <p>Add your first skill above.</p>
          </div>
        ) : (
          <div className="skills-grid">

            {skills.map((skill) => (
              <div className="skill-card" key={skill.id}>

                <div className="skill-card-icon">
                  {skill.name?.charAt(0).toUpperCase() || "S"}
                </div>

                <div className="skill-card-content">
                  <h3>{skill.name}</h3>
                  <p>Technical Skill</p>
                </div>

                <button
                  className="delete-skill"
                  onClick={() => deleteSkill(skill.id)}
                  title="Delete skill"
                >
                  🗑️
                </button>

              </div>
            ))}

          </div>
        )}

      </section>

      {/* SkillBridge Tip */}
      <section className="skills-tip">

        <div className="tip-icon">
          💡
        </div>

        <div>
          <h3>SkillBridge Tip</h3>

          <p>
            Add skills that you are comfortable using. This helps
            other students find you for suitable projects and
            collaboration opportunities.
          </p>
        </div>

      </section>

      {/* Bottom Buttons */}
      <div className="skills-actions">

        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <button
          className="find-button"
          onClick={() => navigate("/search-students")}
        >
          🔎 Find Students
        </button>

      </div>

    </div>
  );
}

export default Skills;