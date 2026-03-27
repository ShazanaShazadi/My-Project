// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// function AddQuiz() {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//  const handleAdd = async (e) => {
//   e.preventDefault();
//   try {
//     // Convert datetime-local strings to ISO format
//     const start = new Date(startTime);
//     const end = new Date(endTime);
//     const duration = Math.ceil((end - start) / (1000 * 60)); // duration in minutes

//     const res = await fetch("http://localhost/InventoryDB/api/Inventory/add-quiz", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         Title: name,
//         StartTime: start.toISOString(), // send proper datetime
//         EndTime: end.toISOString(),
//         DurationMinutes: duration
//       })
//     });

//     if (res.ok) {
//       alert("Quiz Added");
//       navigate("/admin");
//     } else {
//       const msg = await res.text();
//       alert("Error: " + msg);
//     }
//   } catch (err) {
//     console.error(err);
//   }
// }; 

//   return (
//     <div className="add-quiz-container">
//       <h2>Set Quiz Timing</h2>
//       <form onSubmit={handleAdd}>
//         <input type="text" placeholder="Quiz Name" value={name} onChange={e => setName(e.target.value)} required />
//         <label>Start Time</label>
//         <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} required />
//         <label>End Time</label>
//         <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} required />
//         <button type="submit">Add Quiz</button>
//       </form>
//     </div>
//   );
// }

// export default AddQuiz;

// AddQuiz.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const formatLocalDateTime = (input) => input;

  const handleAdd = async (e) => {
    e.preventDefault();
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      alert("End time must be after start");
      return;
    }

    const duration = Math.ceil((end - start) / (1000 * 60));

    const payload = {
      Title: title,
      StartTime: formatLocalDateTime(startTime),
      EndTime: formatLocalDateTime(endTime),
      DurationMinutes: duration,
    };

    const res = await fetch(
      "http://localhost/InventoryDB/api/Inventory/add-quiz",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const msg = await res.text();

    if (res.ok) {
      alert(msg);
      navigate("/admin");
    } else {
      alert(msg);
    }
  };

  // Inline styles
  const containerStyle = {
    width: "90%",
    maxWidth: "500px",
    margin: "50px auto",
    background: "#fff8f0",
    padding: "40px 30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#ff6600",
    fontSize: "28px",
    fontWeight: "700",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const inputStyle = {
    padding: "12px 15px",
    marginBottom: "20px",
    border: "1.5px solid #ccc",
    borderRadius: "10px",
    fontSize: "16px",
  };

  const labelStyle = {
    fontWeight: 600,
    marginBottom: "5px",
    color: "#333",
  };

  const buttonStyle = {
    padding: "14px 20px",
    fontSize: "18px",
    fontWeight: "bold",
    background: "linear-gradient(45deg, #ff6600, #ff9933)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(255, 102, 0, 0.4)",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Add Quiz</h2>
      <form style={formStyle} onSubmit={handleAdd}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>End Time</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Add Quiz
        </button>
      </form>
    </div>
  );
}

export default AddQuiz;