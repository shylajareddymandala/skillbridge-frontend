import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CollaborationRequests.css";

function CollaborationRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const loadRequests = () => {
    fetch("http://localhost:8080/requests")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch requests");
        }

        return response.json();
      })
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading requests:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Accept / Decline Request
  const updateRequestStatus = async (requestId, status) => {
    try {
      setUpdatingId(requestId);

      const response = await fetch(
        `http://localhost:8080/requests/${requestId}/status?status=${status}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request status");
      }

      const updatedRequest = await response.json();

      setRequests((previousRequests) =>
        previousRequests.map((request) =>
          request.id === requestId ? updatedRequest : request
        )
      );

      alert(
        status === "ACCEPTED"
          ? "Collaboration request accepted!"
          : "Collaboration request declined!"
      );
    } catch (error) {
      console.error("Error updating request:", error);
      alert("Failed to update collaboration request.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Cancel / Undo Sent Request
  const cancelRequest = async (requestId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this collaboration request?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      setUpdatingId(requestId);

      const response = await fetch(
        `http://localhost:8080/requests/${requestId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to cancel request");
      }

      // Remove cancelled request from the screen
      setRequests((previousRequests) =>
        previousRequests.filter(
          (request) => request.id !== requestId
        )
      );

      alert("Collaboration request cancelled successfully.");
    } catch (error) {
      console.error("Error cancelling request:", error);
      alert("Failed to cancel collaboration request.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getUserName = (request) => {
    if (request.sender?.name) {
      return request.sender.name;
    }

    if (request.senderName) {
      return request.senderName;
    }

    return `User #${request.senderId || "Unknown"}`;
  };

  const getReceiverName = (request) => {
    if (request.receiver?.name) {
      return request.receiver.name;
    }

    if (request.receiverName) {
      return request.receiverName;
    }

    return `User #${request.receiverId || "Unknown"}`;
  };

  const isReceivedRequest = (request) => {
    if (!currentUser) {
      return true;
    }

    return (
      request.receiverId === currentUser.id ||
      request.receiver?.id === currentUser.id
    );
  };

  const receivedRequests = requests.filter(isReceivedRequest);

  const sentRequests = requests.filter((request) => {
    if (!currentUser) {
      return false;
    }

    return (
      request.senderId === currentUser.id ||
      request.sender?.id === currentUser.id
    );
  });

  return (
    <div className="requests-page">

      {/* HERO */}
      <section className="requests-hero">

        <button
          className="back-dashboard-button"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div className="requests-hero-content">

          <span className="requests-label">
            COLLABORATION
          </span>

          <h1>
            Collaboration Requests
          </h1>

          <p>
            Connect with students, collaborate on projects, and build your
            SkillBridge network.
          </p>

        </div>

        <div className="requests-hero-icon">
          🤝
        </div>

      </section>

      {/* STATISTICS */}
      <section className="request-stats">

        <div className="request-stat-card">

          <div className="stat-icon received-icon">
            📥
          </div>

          <div>
            <span>Received</span>
            <strong>{receivedRequests.length}</strong>
          </div>

        </div>

        <div className="request-stat-card">

          <div className="stat-icon sent-icon">
            📤
          </div>

          <div>
            <span>Sent</span>
            <strong>{sentRequests.length}</strong>
          </div>

        </div>

        <div className="request-stat-card">

          <div className="stat-icon network-icon">
            🌐
          </div>

          <div>
            <span>Total Requests</span>
            <strong>{requests.length}</strong>
          </div>

        </div>

      </section>

      {/* REQUEST SECTION */}
      <section className="requests-section">

        <div className="section-heading">

          <div>
            <h2>Your Requests</h2>

            <p>
              Manage your collaboration activity
            </p>
          </div>

          <button
            className="find-students-btn"
            onClick={() => navigate("/search-students")}
          >
            + Find Students
          </button>

        </div>

        {/* LOADING */}
        {loading ? (

          <div className="requests-empty">

            <div className="loading-circle"></div>

            <h3>
              Loading requests...
            </h3>

            <p>
              Please wait while we load your collaboration requests.
            </p>

          </div>

        ) : requests.length === 0 ? (

          /* NO REQUESTS */
          <div className="requests-empty">

            <div className="empty-icon">
              🤝
            </div>

            <h3>
              No collaboration requests yet
            </h3>

            <p>
              Find other students and send a collaboration request to start
              building your network.
            </p>

            <button
              className="empty-action-btn"
              onClick={() => navigate("/search-students")}
            >
              Find Students
            </button>

          </div>

        ) : (

          /* REQUEST LIST */
          <div className="requests-list">

            {requests.map((request, index) => {

              const received = isReceivedRequest(request);

              const status = request.status
                ? request.status.toUpperCase()
                : "PENDING";

              const personName = received
                ? getUserName(request)
                : getReceiverName(request);

              const isPending = status === "PENDING";

              const isUpdating =
                updatingId === request.id;

              return (

                <div
                  className="request-card"
                  key={request.id || index}
                >

                  {/* AVATAR */}
                  <div className="request-avatar">
                    {personName.charAt(0).toUpperCase()}
                  </div>

                  {/* CONTENT */}
                  <div className="request-content">

                    <div className="request-top">

                      <div>

                        <h3>
                          {personName}
                        </h3>

                        <span className="request-type">

                          {received
                            ? "Incoming collaboration request"
                            : "Collaboration request sent"}

                        </span>

                      </div>

                      <span className="request-status">
                        {status}
                      </span>

                    </div>

                    <p className="request-message">

                      {request.message ||
                        "I would like to collaborate with you on SkillBridge."}

                    </p>

                    <div className="request-footer">

                      <span className="request-date">
                        🤝 Collaboration Request
                      </span>

                      {/* RECEIVED + PENDING */}
                      {received && isPending ? (

                        <div className="request-actions">

                          <button
                            className="accept-btn"
                            onClick={() =>
                              updateRequestStatus(
                                request.id,
                                "ACCEPTED"
                              )
                            }
                            disabled={isUpdating}
                          >
                            {isUpdating
                              ? "Updating..."
                              : "✓ Accept"}
                          </button>

                          <button
                            className="decline-btn"
                            onClick={() =>
                              updateRequestStatus(
                                request.id,
                                "DECLINED"
                              )
                            }
                            disabled={isUpdating}
                          >
                            {isUpdating
                              ? "Updating..."
                              : "✕ Decline"}
                          </button>

                        </div>

                      ) : received ? (

                        /* RECEIVED + ACCEPTED/DECLINED */
                        <span className="sent-label">

                          {status === "ACCEPTED"
                            ? "✓ Request Accepted"
                            : "✕ Request Declined"}

                        </span>

                      ) : isPending ? (

                        /* SENT + PENDING */
                        <div className="request-actions">

                          <span className="sent-label">
                            📤 Request Sent
                          </span>

                          <button
                            className="cancel-request-btn"
                            onClick={() =>
                              cancelRequest(request.id)
                            }
                            disabled={isUpdating}
                          >
                            {isUpdating
                              ? "Cancelling..."
                              : "↩ Cancel Request"}
                          </button>

                        </div>

                      ) : (

                        /* SENT + ACCEPTED/DECLINED */
                        <span className="sent-label">

                          {status === "ACCEPTED"
                            ? "✓ Request Accepted"
                            : "✕ Request Declined"}

                        </span>

                      )}

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>

      {/* TIP */}
      <section className="requests-tip">

        <div className="tip-icon">
          💡
        </div>

        <div>

          <h3>
            Build your network
          </h3>

          <p>
            Collaborate with students who have complementary skills and work
            together on exciting projects.
          </p>

        </div>

      </section>

    </div>
  );
}

export default CollaborationRequests;