import { useState } from "react";
import API from "../services/api";

function AddMedicine() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    if (!id || !name) {
      alert("Enter all fields");
      return;
    }

    try {
      const res = await API.post("/medicine", { id, name });
      alert(res.data.message);

      setId("");
      setName("");
    } catch (error) {
      console.log("ERROR:", error);
      alert("Error adding medicine");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add Medicine</h2>

      <input
        value={id}
        placeholder="Medicine ID"
        onChange={(e) => setId(e.target.value)}
      />
      <br /><br />

      <input
        value={name}
        placeholder="Medicine Name"
        onChange={(e) => setName(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSubmit}>Add Medicine</button>
    </div>
  );
}

export default AddMedicine;