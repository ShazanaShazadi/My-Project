// import React from "react"; // React
// import "./Result.css"; // Styling
// import { useLocation, useNavigate } from "react-router-dom"; 
// // useLocation → receive data
// // useNavigate → redirect

// import { FaTrophy } from "react-icons/fa"; // Trophy icon

// function Result() {

//   const { state } = useLocation(); // Get data from Quiz page
//   const navigate = useNavigate(); // Navigation function

//   // If no score found → default 0
//   const score = state?.score || 0;

//   return (
//     <div className="result"> {/* Container */}

//       <div className="card"> {/* Card UI */}

//         <FaTrophy className="icon" /> {/* Icon */}

//         <h2>Your Score</h2>

//         <h1>{score}</h1> {/* Display score */}

//         {/* Restart button */}
//         <button onClick={() => navigate("/")}>
//           Try Again
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Result; // Export



// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Result.css";

// function Result() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [results, setResults] = useState([]);
//   const user = JSON.parse(localStorage.getItem("user"));

//   // ✅ get quiz from previous screen (optional)
//   const quiz = location.state?.quiz;

//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//       return;
//     }

//     fetch(`http://localhost/InventoryDB/api/Inventory/my-results/${user.Id}`)
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setResults(data);
//         else setResults([]);
//       })
//       .catch(err => {
//         console.error(err);
//         setResults([]);
//       });
//   }, [user, navigate]);

//   // ✅ FIXED restart logic
//   const handleRestart = () => {
//     if (!quiz) {
//       // fallback → go dashboard
//       navigate("/studentdashboard");
//       return;
//     }

//     navigate("/quiz", {
//       state: {
//         quiz: quiz,
//         startTime: new Date()
//       }
//     });
//   };

//   return (
//     <div className="result-container">
//       <h2>Your Quiz Results</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>Score</th>
//             <th>Total Questions</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {results.map((r, index) => (
//             <tr key={index}>
//               <td>{r.Score}</td>
//               <td>{r.TotalQuestions}</td>
//               <td>{new Date(r.AttemptDate).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* ✅ Restart fixed */}
//       <button onClick={handleRestart}>Attempt Again</button>
//     </div>
//   );
// }

// export default Result;




import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Result.css";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz = location.state?.quiz; // ✅ Current quiz

  const user = JSON.parse(localStorage.getItem("user"));
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!user || !quiz) {
      navigate("/studentdashboard");
      return;
    }

    fetch(`http://localhost/InventoryDB/api/Inventory/my-results/${user.Id}/${quiz.Id}`)
      .then(res => res.json())
      .then(data => setResults(Array.isArray(data) ? data : []))
      .catch(err => setResults([]));
  }, [user, quiz, navigate]);

  const handleRestart = () => {
    if (!quiz) navigate("/studentdashboard");

    navigate("/quiz", { state: { quiz, startTime: new Date() } });
  };

  return (
    <div className="result-container">
      <h2>{quiz?.Title} - Your Result</h2>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Total Questions</th>
            <th>Date</th>
          </tr>
        </thead>
        {/* <tbody>
          {results.map((r, idx) => (
            <tr key={idx}>
              <td>{r.Score}</td>
              <td>{r.TotalQuestions}</td>
              <td>{new Date(r.AttemptDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody> */}

        <tbody>
  {results.map((r, idx) => (
    <tr key={idx}>
      <td>{r.Score}</td>
      <td>{r.TotalQuestions}</td>
      <td>{new Date(r.AttemptDate).toLocaleString()}</td> {/* parse properly */}
    </tr>
  ))}
</tbody>
      </table>

      <button onClick={handleRestart}>Attempt Again</button>
    </div>
  );
}

export default Result;