import React, { useState } from "react";
import axios from "axios";

function Login({ setToken, setRole, setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [signupRole, setSignupRole] = useState("viewer");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      setToken(res.data.token);
      setRole(res.data.role);
      setLoggedIn(true);
    } catch {
      alert("Login failed ❌");
    }
  };

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:3000/signup", {
        username,
        password,
        role: signupRole,
      });

      alert("Signup successful ✅");
      setIsSignup(false);
    } catch {
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="logo">💊 Medicine Tracking</h1>

        {/* 🔥 TOGGLE TABS */}
        <div className="tab-wrapper">
          <div className={`tab-slider ${isSignup ? "right" : "left"}`}></div>

          <button onClick={() => setIsSignup(false)}>
            Login
          </button>

          <button onClick={() => setIsSignup(true)}>
            Signup
          </button>
        </div>

        {/* INPUTS */}
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup && (
          <select onChange={(e) => setSignupRole(e.target.value)}>
            <option value="viewer">Viewer</option>
            <option value="distributor">Distributor</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {/* BUTTON */}
        <button onClick={isSignup ? handleSignup : handleLogin}>
          {isSignup ? "Create Account 🚀" : "Login 🔐"}
        </button>

      </div>
    </div>
  );
}

export default Login;