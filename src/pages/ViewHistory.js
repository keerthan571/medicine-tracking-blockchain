import { useState } from "react";
import API from "../services/api";

function ViewHistory() {
  const [searchId, setSearchId] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await API.get(`/history/${searchId}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching history");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>View Medicine History</h2>

      <input
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