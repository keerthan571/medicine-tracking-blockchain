import { useState } from "react";

function UpdateStatus() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = () => {
    alert(`Status Updated: ${id} - ${status}`);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Update Medicine Status</h2>

      <input
        placeholder="Medicine ID"
        onChange={(e) => setId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Status (In Transit / Delivered)"
        onChange={(e) => setStatus(e.target.value)}
      />
      <br /><br />

      <button onClick={handleUpdate}>Update Status</button>
    </div>
  );
}

export default UpdateStatus;