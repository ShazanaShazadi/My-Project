import React, { useEffect, useState } from "react";
import "./ViewResults.css";

function ViewResults() {
  const [results, setResults] = useState([]);

  useEffect(()=>{
    fetch("http://localhost/InventoryDB/api/Inventory/results")
      .then(res=>res.json())
      .then(data=>setResults(data))
      .catch(err=>console.error(err));
  },[]);

  return (
    <div className="view-results-container">
      <h2>All Quiz Results</h2>
      <table>
        <thead>
          <tr><th>Student</th><th>Score</th><th>Total Questions</th><th>Date</th></tr>
        </thead>
        <tbody>
          {results.map(r=>(
            <tr key={r.Id}>
              <td>{r.UserName}</td>
              <td>{r.Score}</td>
              <td>{r.TotalQuestions}</td>
              <td>{new Date(r.AttemptDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewResults;