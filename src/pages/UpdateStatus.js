import { useState } from "react";
import API from "../services/api";

function UpdateStatus() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async () => {
    if (!id || !status) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await API.put("/status", { id, status });
      alert(res.data.message);

      setId("");
      setStatus("");
    } catch (error) {
      console.log("ERROR:", error);
      alert("Error updating status");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Update Status</h2>

      <input
        value={id}
        placeholder="Medicine ID"
        onChange={(e) => setId(e.target.value)}
      />
      <br /><br />

      <input
        value={status}
        placeholder="Status"
        onChange={(e) => setStatus(e.target.value)}
      />
      <br /><br />

      <button onClick={handleUpdate}>Update Status</button>
    </div>
  );
}

export default UpdateStatus;