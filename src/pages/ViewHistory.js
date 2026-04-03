import { useState } from "react";
import API from "../services/api";

function ViewHistory() {
  const [searchId, setSearchId] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    if (!searchId) {
      alert("Enter ID");
      return;
    }

    try {
      const res = await API.get(`/history/${searchId}`);
      setData(res.data);
    } catch (error) {
      console.log("ERROR:", error);
      alert("Medicine not found");
      setData(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>View History</h2>

      <input
        value={searchId}
        placeholder="Enter Medicine ID"
        onChange={(e) => setSearchId(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSearch}>Search</button>

      {data && (
        <div>
          <p>ID: {data.id}</p>
          <p>Name: {data.name}</p>
          <p>Status: {data.status}</p>
        </div>
      )}
    </div>
  );
}

export default ViewHistory;