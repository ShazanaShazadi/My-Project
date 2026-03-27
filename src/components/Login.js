import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const res = await fetch("http://localhost/InventoryDB/api/Inventory/loginn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, PasswordHash: password })
      });

      const data = await res.json();
      console.log("data", data);

      if (res.status === 200) {
        // ✅ Save user in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(data));

        // ✅ Navigate with state (so dashboard can immediately use it)
        if (data.Role === "Admin") {
          navigate("/admin", { state: { user: data } });
        } else {
          navigate("/studentdashboard", { state: { user: data } });
        }
      } else {
        setError(data);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <input
        className="in"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
        className="in"  
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <span onClick={() => navigate("/signup")}>Signup</span>
        </p>
      </form>
    </div>
  );
}

export default Login;