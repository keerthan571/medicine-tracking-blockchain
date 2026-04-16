import React, { useState } from "react";
import axios from "axios";

function UpdateStatus({ token }) {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("Packed");
  const [location, setLocation] = useState("");

  const updateStatus = async () => {
    if (!id || !location) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/updateStatus",
        { id, status, location },
        { headers: { Authorization: token } }
      );

      alert("Status updated ✅");

      setId("");
      setLocation("");

    } catch (err) {
      alert(err.response?.data || "Error ❌");
    }
  };

  return (
    <div className="card">
      <h2>🚚 Update Status</h2>

      <input
        placeholder="Medicine ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <select onChange={e => setStatus(e.target.value)}>
        <option>Order Placed</option>
        <option>Packed</option>
        <option>Shipped</option>
        <option>Out for Delivery</option>
        <option>Delivered</option>
    </select>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={updateStatus}>Update Status 🚀</button>
    </div>
  );
}

export default UpdateStatus;