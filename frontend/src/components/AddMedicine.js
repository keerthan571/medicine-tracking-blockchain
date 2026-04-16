import React, { useState } from "react";
import axios from "axios";

function AddMedicine({ token }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [medicines, setMedicines] = useState([]);

  const addMedicine = async () => {
    if (!id || !name || !manufacturer) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/addMedicine",
        { id, name, manufacturer },
        { headers: { Authorization: token } }
      );

      alert("Medicine added ✅");

      setId("");
      setName("");
      setManufacturer("");

    } catch (err) {
      alert(err.response?.data || "Error ❌");
    }
  };

  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getAllMedicines");
      setMedicines(res.data);
    } catch {
      alert("Error fetching medicines ❌");
    }
  };

  return (
    <div className="card">
      <h2>💊 Admin Panel</h2>

      <input placeholder="ID" value={id} onChange={e => setId(e.target.value)} />
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Manufacturer" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />

      <button onClick={addMedicine}>Add Medicine ➕</button>

      <br /><br />

      <button onClick={fetchAll}>View All Medicines 📦</button>

      {medicines.map((m, i) => (
        <div key={i} style={{ marginTop: "10px" }}>
          <b>{m.name}</b> ({m.id}) - {m.manufacturer}
        </div>
      ))}
    </div>
  );
}

export default AddMedicine;