import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Dashboard</h2>

      <Link to="/add">
        <button>Add Medicine</button>
      </Link>
    </div>
  );
}

export default AdminDashboard;