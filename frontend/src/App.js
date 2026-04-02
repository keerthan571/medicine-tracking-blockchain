import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DistributorDashboard from "./pages/DistributorDashboard";
import ViewerDashboard from "./pages/ViewerDashboard";

import AddMedicine from "./pages/AddMedicine";
import UpdateStatus from "./pages/UpdateStatus";
import ViewHistory from "./pages/ViewHistory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboards */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/distributor" element={<DistributorDashboard />} />
        <Route path="/viewer" element={<ViewerDashboard />} />

        {/* Features */}
        <Route path="/add" element={<AddMedicine />} />
        <Route path="/update" element={<UpdateStatus />} />
        <Route path="/history" element={<ViewHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;