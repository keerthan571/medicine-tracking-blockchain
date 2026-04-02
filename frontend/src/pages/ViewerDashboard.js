import { Link } from "react-router-dom";

function ViewerDashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Viewer Dashboard</h2>

      <Link to="/history">
        <button>View History</button>
      </Link>
    </div>
  );
}

export default ViewerDashboard;