import React, { useState, useEffect } from "react";
import "./styles.css";

import Login from "./components/Login";
import AddMedicine from "./components/AddMedicine";
import UpdateStatus from "./components/UpdateStatus";
import TrackMedicine from "./components/TrackMedicine";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // 🔥 APPLY THEME TO BODY
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  const handleLogout = () => {
    setLoggedIn(false);
    setToken("");
    setRole("");
  };

  return (
    <div style={{ padding: "30px", minHeight: "100vh" }}>

      {!loggedIn ? (
        <div className="card">
          <Login
            setToken={setToken}
            setRole={(r) => setRole(r.toLowerCase())}
            setLoggedIn={setLoggedIn}
          />
        </div>
      ) : (
        <>
          {/* TOP BUTTONS */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <button onClick={() => setDarkMode(!darkMode)}>
              🌙 Toggle
            </button>

            <button
              onClick={handleLogout}
              style={{ background: "#ff4d4d" }}
            >
              Logout
            </button>
          </div>

          <h3>Logged in as: {role.toUpperCase()}</h3>

          {/* ROLE BASED UI */}
          {role === "admin" && <AddMedicine token={token} />}
          {role === "distributor" && <UpdateStatus token={token} />}
          {role === "viewer" && <TrackMedicine token={token} />}
        </>
      )}
    </div>
  );
}

export default App;