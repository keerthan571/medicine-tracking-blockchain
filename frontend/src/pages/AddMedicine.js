import { useState } from "react";
import API from "../services/api";

function AddMedicine() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
  try {
    await API.post("/medicine", { id, name });
    alert("Medicine Added Successfully");
  } catch (error) {
    console.error(error);
    alert("Error adding medicine");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Medicine</h2>

      <input
        placeholder="Medicine ID"
        onChange={(e) => setId(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Medicine Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Add Medicine</button>
    </div>
  );
}

export default AddMedicine;