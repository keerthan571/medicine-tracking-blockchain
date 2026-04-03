import { Link } from "react-router-dom";

function DistributorDashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Distributor Dashboard</h2>

      <Link to="/update">
        <button>Update Status</button>
      </Link>
    </div>
  );
}

export default DistributorDashboard;