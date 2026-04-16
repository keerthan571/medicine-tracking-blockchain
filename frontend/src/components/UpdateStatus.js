import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateStatus() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Order Placed");
  const [location, setLocation] = useState("");
  const [history, setHistory] = useState([]);

  const flow = [
    "Order Placed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  // 🔥 Fetch history when ID changes
  useEffect(() => {
    const fetchHistory = async () => {
      if (!id) return;

      try {
        const res = await axios.get(
          `http://localhost:3000/track/${id}`
        );
        setHistory(res.data);
      } catch {
        setHistory([]);
      }
    };

    fetchHistory();
  }, [id]);

  // 🔥 Get next valid step
  const getNextStep = () => {
    if (history.length === 0) return "Order Placed";

    const lastStatus = history[history.length - 1].status;
    const index = flow.indexOf(lastStatus);

    return flow[index + 1];
  };

  const handleUpdate = async () => {
    try {
      await axios.post("http://localhost:3000/updateStatus", {
        id,
        status,
        location,
      });

      alert("Status updated ✅");

      // Refresh history
      const res = await axios.get(
        `http://localhost:3000/track/${id}`
      );
      setHistory(res.data);

    } catch (err) {
      alert(err.response?.data || "Error ❌");
    }
  };

  const nextStep = getNextStep();

  return (
    <div className="card">
      <h2>🚚 Update Status</h2>

      <input
        placeholder="Medicine ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      {/* 🔥 SMART DROPDOWN */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {flow.map((step) => (
          <option
            key={step}
            value={step}
            disabled={step !== nextStep} // 🔥 ONLY ALLOW NEXT STEP
          >
            {step}
          </option>
        ))}
      </select>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={handleUpdate}>
        Update Status 🚀
      </button>

      {/* 🔥 SHOW CURRENT STEP */}
      {history.length > 0 && (
        <p style={{ marginTop: "10px", opacity: 0.7 }}>
          Current: {history[history.length - 1].status}
        </p>
      )}
    </div>
  );
}

export default UpdateStatus;