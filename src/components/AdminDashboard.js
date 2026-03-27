// import React ,{useEffect} from "react";
// import { useNavigate } from "react-router-dom";  
// import "./AdminDashboard.css";

// function AdminDashboard() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) navigate("/");
//     else if (user.Role !== "Admin") navigate("/quiz");
//   }, [navigate]);
  
//   return (
//     <div className="admin-container">
//       <h2>Admin Dashboard</h2>
//       <div className="admin-buttons">
//         <button onClick={()=>navigate("/addquestion")}>Add Question</button>
//         <button onClick={()=>navigate("/viewresults")}>View Results</button>
//   <button onClick={()=>navigate("/manage-questions")}>Manage Questions</button>
//           <button onClick={()=>navigate("/")}>LOGOUT</button>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

//   import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";  
// import { FiLogOut } from "react-icons/fi";
// import "./AdminDashboard.css";

// function AdminDashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user) navigate("/");
//     else if (user.Role !== "Admin") navigate("/quiz");
//   }, [navigate]);
  
//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className="admin-container">
//       <h2>Admin Dashboard</h2>
//       <div className="admin-buttons">
//         <button onClick={()=>navigate("/addquestion")}>Add Question</button>
//         <button onClick={()=>navigate("/manage-questions")}>Manage Questions</button>
//         <button onClick={()=>navigate("/add-quiz")}>Set Quiz Timing</button>
//          <button onClick={()=>navigate("/viewresults")}>View Results</button>
//         <button onClick={handleLogout}>
//           <FiLogOut style={{marginRight:"5px"}} /> Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";  
import { FiLogOut } from "react-icons/fi";

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) navigate("/");
    else if (user.Role !== "Admin") navigate("/quiz");
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ---------------- Inline styles ----------------
  const style = {
    container: {
      width: "90%",
      // maxWidth: "900px",
      height:"70vh",
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
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px"
    },
    button: {
      padding: "14px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(45deg, #ff6600, #ff9933)",
      color: "#fff",
      width: "250px",
      boxShadow: "0 5px 15px rgba(255,102,0,0.4)",
      transition: "all 0.3s ease"
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
        onClick={handleLogout}
        title="Logout"
        onMouseOver={e => e.currentTarget.style.background = style.logoutHover.background}
        onMouseOut={e => e.currentTarget.style.background = style.logout.background}
      >
        <FiLogOut />
      </button>

      <h2 style={style.heading}>Admin Dashboard</h2>

      <div style={style.buttonContainer}>
        <button style={style.button} onClick={() => navigate("/addquestion")}>
          Add Question
        </button>

        <button style={style.button} onClick={() => navigate("/manage-questions")}>
          Manage Questions
        </button>

        <button style={style.button} onClick={() => navigate("/manage-quiz")}>
          Manage Quiz Timing
        </button>

        <button style={style.button} onClick={() => navigate("/viewresults")}>
          View Results
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;