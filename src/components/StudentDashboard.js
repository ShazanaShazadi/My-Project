// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi"; // React Icon for logout
// import "./StudentDashboard.css";

// function StudentDashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//  console.log("user", user)
//   if (!user) navigate("/"); // redirect if not logged in

//   const startQuiz = () => {
//     navigate("/quiz", { state: { start: true } }); // start quiz
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user"); // clear user session
//     navigate("/"); // go back to login
//   };

//   return (
//     <div className="student-dashboard-container">
//       <h2>Welcome, {user?.Name}</h2>
//       <button className="start-quiz-btn" onClick={startQuiz}>
//         Start Quiz
//       </button>
//       <br />
//       <button className="logout-btn" onClick={handleLogout}>
//         <FiLogOut size={20} style={{ marginRight: "8px" }} />
//         Logout
//       </button>
//     </div>
//   );
// }

// export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
// import "./StudentDashboard.css";

// function StudentDashboard() {
//   const navigate = useNavigate();
//   const [availableQuizzes, setAvailableQuizzes] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//       return;
//     }

//     // Fetch available quizzes for this student
//     fetch(`http://localhost/InventoryDB/api/Inventory/available-quizzes/${user.Id}`)
//       .then(res => res.json())
//       .then(data => setAvailableQuizzes(data))
//       .catch(err => console.error(err));
//   }, [navigate, user]);

//   const startQuiz = (quiz) => {
//     const startTime = new Date();
//     navigate("/quiz", { state: { quiz, startTime } });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="student-dashboard-container">
//       <h2>Welcome, {user?.Name}</h2>

//       {availableQuizzes.length > 0 ? (
//         availableQuizzes.map(q => (
//           <button
//             key={q.Id}
//             className="start-quiz-btn"
//             onClick={() => startQuiz(q)}
//           >
//             Start Quiz: {q.Title}
//           </button>
//         ))
//       ) : (
//         <p>No quizzes available at this time.</p>
//       )}

//       <button className="logout-btn" onClick={handleLogout}>
//         <FiLogOut size={20} style={{ marginRight: "8px" }} />
//         Logout
//       </button>
//     </div>
//   );
// }

// export default StudentDashboard;
// StudentDashboard.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
// import "./StudentDashboard.css";
// function StudentDashboard() {
//   const navigate = useNavigate();
//   const [availableQuizzes, setAvailableQuizzes] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));


//   useEffect(() => {
//   if (!user) {
//     navigate("/");
//     return;
//   }

//   fetch(`http://localhost/InventoryDB/api/Inventory/available-quizzes/${user.Id}`)
//     .then(res => res.json())
//     .then(data => setAvailableQuizzes(data))
//     .catch(err => console.error(err));
// }, [navigate, user]);

//   const startQuiz = (quiz) => navigate("/quiz", { state: { quiz, startTime: new Date() } });

//   const logout = () => { localStorage.removeItem("user"); navigate("/"); };

//   return (
//     <div>
//       <h2>Welcome {user?.Name}</h2>
//       {availableQuizzes.length ? availableQuizzes.map(q =>
//         <button key={q.Id} onClick={() => startQuiz(q)}>Start Quiz: {q.Title}</button>
//       ) : <p>No quiz available now.</p>}
//       <button onClick={logout}><FiLogOut /> Logout</button>
//     </div>
//   );
// }
// export default StudentDashboard;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiLogOut } from "react-icons/fi";
// import "./StudentDashboard.css";

// function StudentDashboard() {
//   const navigate = useNavigate();
//   const [quizzes, setQuizzes] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//       return;
//     }

//     fetch(`http://localhost/InventoryDB/api/Inventory/available-quizzes/${user.Id}`)
//       .then(res => res.json())
//       .then(data => {
//         const now = new Date();
//         const formattedQuizzes = data.map(q => {
//           const start = new Date(q.StartTime);
//           const end = new Date(q.EndTime);
//           let status = "upcoming";
//           if (now >= start && now <= end) status = "active"; // active now
//           return { ...q, start, end, status };
//         });
//         setQuizzes(formattedQuizzes);
//       })
//       .catch(err => console.error(err));
//   }, [navigate, user]);

//   const startQuiz = (quiz) => {
//     if (quiz.status !== "active") return; // prevent early start
//     navigate("/quiz", { state: { quiz, startTime: new Date() } });
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="student-dashboard-container">
//       <h2>Welcome {user?.Name}</h2>

//       {quizzes.length ? (
//         quizzes.map(q => (
//           <button
//             key={q.Id}
//             onClick={() => startQuiz(q)}
//             className={q.status === "active" ? "active-quiz-btn" : "upcoming-quiz-btn"}
//           >
//             <strong>{q.Title}</strong>
//             <br />
//             {q.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {q.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//             <br />
//             Status: {q.status === "active" ? "Active" : "Upcoming"}
//           </button>
//         ))
//       ) : (
//         <p>No quizzes available.</p>
//       )}

//       <button className="logout-btn" onClick={logout}><FiLogOut /> Logout</button>
//     </div>
//   );
// }

// export default StudentDashboard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function StudentDashboard() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetch(`http://localhost/InventoryDB/api/Inventory/available-quizzes/${user.Id}`)
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        const formattedQuizzes = data.map(q => {
          const start = new Date(q.StartTime);
          const end = new Date(q.EndTime);
          let status = "upcoming";
          if (now >= start && now <= end) status = "active"; // active now
          return { ...q, start, end, status };
        });
        setQuizzes(formattedQuizzes);
      })
      .catch(err => console.error(err));
  }, [navigate, user]);

  const startQuiz = (quiz) => {
    if (quiz.status !== "active") return; // prevent early start
    navigate("/quiz", { state: { quiz, startTime: new Date() } });
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ---------------- Inline styles ----------------
  const style = {
    container: {
      width: "90%",
      maxWidth: "700px",
      margin: "50px auto",
      padding: "30px",
      background: "#fff8f0",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: "relative"
    },
    heading: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#ff6600",
      textAlign: "center",
      marginBottom: "40px"
    },
    quizButton: {
      width: "100%",
      padding: "20px",
      marginBottom: "15px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
      textAlign: "center",
      transition: "all 0.3s ease",
      color: "#fff"
    },
    activeQuiz: {
      backgroundColor: "#28a745" // green
    },
    upcomingQuiz: {
      backgroundColor: "#ff6600" // orange
    },
    logout: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "#ff4d00",
      border: "none",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      color: "#fff",
      fontSize: "22px",
      boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease"
    },
    logoutHover: {
      background: "#ff3300"
    }
  };
  // -------------------------------------------------

  return (
    <div style={style.container}>
      {/* Logout icon button */}
      <button
        style={style.logout}
        onClick={logout}
        title="Logout"
        onMouseOver={e => e.currentTarget.style.background = style.logoutHover.background}
        onMouseOut={e => e.currentTarget.style.background = style.logout.background}
      >
        <FiLogOut />
      </button>

      <h2 style={style.heading}>Welcome {user?.Name}</h2>

      {quizzes.length ? (
        quizzes.map(q => (
          <button
            key={q.Id}
            onClick={() => startQuiz(q)}
            style={{
              ...style.quizButton,
              ...(q.status === "active" ? style.activeQuiz : style.upcomingQuiz)
            }}
          >
            <strong>{q.Title}</strong>
            <br />
            {q.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {q.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            <br />
            Status: {q.status === "active" ? "Active" : "Upcoming"}
          </button>
        ))
      ) : (
        <p>No quizzes available.</p>
      )}
    </div>
  );
}

export default StudentDashboard;