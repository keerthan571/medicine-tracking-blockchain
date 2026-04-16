import React, { useState } from "react";
import axios from "axios";

function TrackMedicine() {
  const [id, setId] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const track = async () => {
    if (!id) {
      alert("Enter Medicine ID ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/track/${id}`
      );

      setHistory(res.data);

    } catch (err) {
      setHistory([]);

      alert(err.response?.data || "Error fetching history ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🕒 FIX TIMESTAMP
  const formatTime = (timestamp) => {
    if (!timestamp || timestamp === 0) {
      return "Time not available";
    }

    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="card">
      <h2>📍 Track Medicine</h2>

      <input
        placeholder="Enter Medicine ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={track}>
        {loading ? "Tracking..." : "Track"}
      </button>

      {/* 🔥 NO DATA CASE */}
      {!loading && history.length === 0 && (
        <p style={{ marginTop: "15px", opacity: 0.7 }}>
          No tracking data available
        </p>
      )}

      {/* 🔥 TIMELINE */}
      <div className="timeline">
        {history.map((item, i) => (
          <div key={i} className="timeline-item fade-in">
            <div className="timeline-dot"></div>

            <div className="timeline-card">
              <b>{item.status}</b>

              <p>📍 {item.location || "Unknown location"}</p>

              <p>🕒 {formatTime(item.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackMedicine;