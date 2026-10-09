import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchStudents.css";

function SearchStudents() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("https://skillbridge-backend-production-947b.up.railway.app/users");

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendRequest = async (studentId) => {
    if (!currentUser?.id) {
      alert("Please login again.");
      navigate("/login");
      return;
    }

    if (studentId === currentUser.id) {
      alert("You cannot send a collaboration request to yourself.");
      return;
    }

    try {
      const response = await fetch(
        `https://skillbridge-backend-production-947b.up.railway.app/requests/send?senderId=${currentUser.id}&receiverId=${studentId}&message=Hello! I would like to collaborate with you on SkillBridge.`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send request");
      }

      alert("Collaboration request sent successfully! 🤝");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send collaboration request.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      (student.name || "").toLowerCase().includes(searchText) ||
      (student.email || "").toLowerCase().includes(searchText) ||
      (student.department || "").toLowerCase().includes(searchText);

    const matchesDepartment =
      departmentFilter === "ALL" ||
      student.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const departments = [
    ...new Set(
      students
        .map((student) => student.department)
        .filter(Boolean)
    ),
  ];

  return (
    <div className="search-page">

      {/* Back to Dashboard */}
      <button
        className="back-dashboard-button"
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </button>

      {/* Hero */}
      <section className="search-hero">

        <div>
          <p className="search-label">DISCOVER & CONNECT</p>

          <h1>Find Your Collaborators 🔎</h1>

          <p>
            Discover students with different skills and interests,
            then connect and build something amazing together.
          </p>
        </div>

        <div className="search-hero-icon">
          🤝
        </div>

      </section>

      {/* Search Controls */}
      <section className="search-controls">

        <div className="search-input-wrapper">
          <span>🔎</span>

          <input
            type="text"
            placeholder="Search by name, email or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="ALL">All Departments</option>

          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>

      </section>

      {/* Results Header */}
      <div className="results-header">

        <div>
          <h2>Students</h2>

          <p>
            {filteredStudents.length} student
            {filteredStudents.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <button
          className="requests-button"
          onClick={() => navigate("/requests")}
        >
          📩 My Requests
        </button>

      </div>

      {/* Students */}
      {loading ? (
        <div className="students-loading">
          <div className="search-loader"></div>
          <p>Finding students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="no-students">

          <div className="no-students-icon">
            🔍
          </div>

          <h2>No students found</h2>

          <p>
            Try changing your search or department filter.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setDepartmentFilter("ALL");
            }}
          >
            Clear Filters
          </button>

        </div>
      ) : (
        <div className="students-result-grid">

          {filteredStudents.map((student) => {

            const isCurrentUser =
              currentUser?.id === student.id;

            const initial =
              student.name?.charAt(0).toUpperCase() || "S";

            const studentSkills =
              Array.isArray(student.skills)
                ? student.skills
                : [];

            return (
              <div
                className="search-student-card"
                key={student.id}
              >

                <div className="student-card-header">

                  <div className="large-avatar">
                    {initial}
                  </div>

                  <div className="student-basic">

                    <h3>
                      {student.name || "Student"}
                    </h3>

                    <span className="student-role">
                      {student.role || "STUDENT"}
                    </span>

                  </div>

                </div>

                <div className="student-info">

                  <div>
                    <span>🎓</span>
                    <p>
                      {student.department ||
                        "Department not specified"}
                    </p>
                  </div>

                  <div>
                    <span>✉️</span>
                    <p>
                      {student.email ||
                        "Email not available"}
                    </p>
                  </div>

                </div>

                <div className="card-skills">

                  <h4>Skills</h4>

                  {studentSkills.length > 0 ? (
                    <div className="student-skill-tags">

                      {studentSkills
                        .slice(0, 5)
                        .map((skill, index) => (
                          <span key={index}>
                            {typeof skill === "string"
                              ? skill
                              : skill.name}
                          </span>
                        ))}

                    </div>
                  ) : (
                    <p className="no-skill-text">
                      No skills added yet
                    </p>
                  )}

                </div>

                <div className="student-card-footer">

                  {isCurrentUser ? (
                    <button
                      className="your-profile-button"
                      onClick={() => navigate("/profile")}
                    >
                      👤 Your Profile
                    </button>
                  ) : (
                    <button
                      className="connect-student-button"
                      onClick={() =>
                        sendRequest(student.id)
                      }
                    >
                      🤝 Connect
                    </button>
                  )}

                </div>

              </div>
            );
          })}

        </div>
      )}

      {/* Bottom Tip */}
      <section className="search-tip">

        <div className="search-tip-icon">
          💡
        </div>

        <div>
          <h3>Find the right teammate</h3>

          <p>
            Look for students with skills that complement yours.
            Combining different skills can help create stronger
            project teams.
          </p>
        </div>

      </section>

    </div>
  );
}

export default SearchStudents;