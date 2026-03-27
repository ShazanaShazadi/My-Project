import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/InventoryDB/api/Inventory/signupp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Name: name, Email: email, PasswordHash: password, Role: role })
      });

      const data = await res.json();

      if (res.status === 200) {
        navigate("/"); // go to login
      } else {
        setError(data);
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-card" onSubmit={handleSignup}>
        <h2>Create your account !</h2>
        {error && <p className="error">{error}</p>}
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="Student">Student</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">Signup</button>
        <p>
          Already have an account? <span onClick={()=>navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;