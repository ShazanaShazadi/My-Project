// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

// function ManageQuiz() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [editingQuiz, setEditingQuiz] = useState(null);
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const navigate = useNavigate();

//   // ✅ Fetch quizzes
//   const fetchQuizzes = () => {
//     fetch("http://localhost/InventoryDB/api/Inventory/quizzes")
//       .then(res => res.json())
//       .then(data => setQuizzes(data))
//       .catch(err => console.error(err));
//   };

//   useEffect(() => {
//     fetchQuizzes();
//   }, []);

//   // ✅ FORMAT for display (Pakistan time)
//   const formatDisplay = (date) => {
//     return new Date(date).toLocaleString("en-PK", {
//       hour12: true
//     });
//   };

//   // ✅ FORMAT for sending (LOCAL time, no UTC)
//   const formatLocalDateTime = (date) => {
//     const pad = (n) => n.toString().padStart(2, "0");

//     return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
//   };

//   // ✅ STATUS
//   const getStatus = (quiz) => {
//     const now = new Date();
//     const start = new Date(quiz.StartTime);
//     const end = new Date(quiz.EndTime);

//     if (now < start) return { text: "Upcoming", color: "blue" };
//     if (now > end) return { text: "Expired", color: "red" };
//     return { text: "Active", color: "green" };
//   };

//   // ✅ DELETE
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this quiz?")) return;

//     const res = await fetch(
//       `http://localhost/InventoryDB/api/Inventory/delete-quiz/${id}`,
//       { method: "DELETE" }
//     );

//     const msg = await res.text();

//     if (res.ok) {
//       alert(msg);
//       fetchQuizzes();
//     } else {
//       alert(msg);
//     }
//   };

//   // ✅ EDIT (only block expired)
//   const handleEdit = (quiz) => {
//     const now = new Date();
//     const end = new Date(quiz.EndTime);

//     if (now > end) {
//       alert("Cannot edit expired quiz");
//       return;
//     }

//     setEditingQuiz(quiz);

//     const format = (d) => new Date(d).toISOString().slice(0, 16);
//     setStartTime(format(quiz.StartTime));
//     setEndTime(format(quiz.EndTime));
//   };

//   // ✅ OVERLAP CHECK
//   const isOverlapping = (newStart, newEnd, currentId) => {
//     return quizzes.some(q => {
//       if (q.Id === currentId) return false;

//       const s = new Date(q.StartTime);
//       const e = new Date(q.EndTime);

//       return newStart < e && newEnd > s;
//     });
//   };

//   // ✅ UPDATE
//   const handleUpdate = async () => {
//     const start = new Date(startTime);
//     const end = new Date(endTime);

//     if (end <= start) {
//       alert("End must be after start");
//       return;
//     }

//     if (isOverlapping(start, end, editingQuiz.Id)) {
//       alert("Quiz timing overlaps with another quiz!");
//       return;
//     }

//     const duration = Math.ceil((end - start) / (1000 * 60));

//     const res = await fetch(
//       "http://localhost/InventoryDB/api/Inventory/update-quiz",
//       {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           Id: editingQuiz.Id,
//           StartTime: formatLocalDateTime(start), // ✅ FIXED
//           EndTime: formatLocalDateTime(end),     // ✅ FIXED
//           DurationMinutes: duration
//         })
//       }
//     );

//     const msg = await res.text();

//     if (res.ok) {
//       alert(msg);
//       setEditingQuiz(null);
//       fetchQuizzes();
//     } else {
//       alert(msg);
//     }
//   };

//   return (
//     <div>
//       <h2>Manage Quizzes</h2>

//       <button onClick={() => navigate("/add-quiz")}>
//         <FaPlus /> Add Quiz
//       </button>

//       <table border="1" style={{ marginTop: "20px", width: "100%" }}>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Start</th>
//             <th>End</th>
//             <th>Duration</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {quizzes.map(q => {
//             const status = getStatus(q);

//             return (
//               <tr key={q.Id}>
//                 <td>{q.Title}</td>
//                 <td>{formatDisplay(q.StartTime)}</td>
//                 <td>{formatDisplay(q.EndTime)}</td>
//                 <td>{q.DurationMinutes} min</td>
//                 <td style={{ color: status.color }}>{status.text}</td>
//                 <td>
//                   <button onClick={() => handleEdit(q)}><FaEdit /></button>
//                   <button onClick={() => handleDelete(q.Id)}><FaTrash /></button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       {/* MODAL */}
//       {editingQuiz && (
//         <div style={modal.overlay}>
//           <div style={modal.box}>
//             <h3>Edit Quiz</h3>

//             <input type="datetime-local" value={startTime} onChange={e => setStartTime(e.target.value)} />
//             <input type="datetime-local" value={endTime} onChange={e => setEndTime(e.target.value)} />

//             <div>
//               <button onClick={handleUpdate}><FaSave /> Save</button>
//               <button onClick={() => setEditingQuiz(null)}><FaTimes /> Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// const modal = {
//   overlay: {
//     position: "fixed",
//     top: 0, left: 0,
//     width: "100%", height: "100%",
//     background: "rgba(0,0,0,0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   box: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "10px"
//   }
// };

// export default ManageQuiz;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

function ManageQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch quizzes
  const fetchQuizzes = () => {
    fetch("http://localhost/InventoryDB/api/Inventory/quizzes")
      .then(res => res.json())
      .then(data => setQuizzes(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // ✅ STATUS BADGE
  const getStatus = (quiz) => {
    const now = new Date();
    const start = new Date(quiz.StartTime);
    const end = new Date(quiz.EndTime);
    if (now < start) return { text: "Upcoming", color: "blue" };
    if (now > end) return { text: "Expired", color: "red" };
    return { text: "Active", color: "green" };
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this quiz?")) return;

    const res = await fetch(
      `http://localhost/InventoryDB/api/Inventory/delete-quiz/${id}`,
      { method: "DELETE" }
    );

    const msg = await res.text();

    if (res.ok) {
      alert(msg);
      fetchQuizzes();
    } else {
      alert(msg);
    }
  };

  // ✅ EDIT (modal)
  const handleEdit = (quiz) => {
    const now = new Date();
    const end = new Date(quiz.EndTime);

    if (now > end) {
      alert("Cannot edit expired quiz");
      return;
    }

    setEditingQuiz(quiz);

    // ✅ Convert backend datetime to local string for datetime-local input
    const formatForInput = (dateStr) => {
      const d = new Date(dateStr);
      // convert to local ISO string without timezone offset
      const tzOffset = d.getTimezoneOffset() * 60000; // in ms
      const localISO = new Date(d.getTime() - tzOffset).toISOString().slice(0,16);
      return localISO;
    };

    setStartTime(formatForInput(quiz.StartTime));
    setEndTime(formatForInput(quiz.EndTime));
  };

  // ✅ CHECK OVERLAP
  const isOverlapping = (newStart, newEnd, currentId) => {
    return quizzes.some(q => {
      if (q.Id === currentId) return false;
      const s = new Date(q.StartTime);
      const e = new Date(q.EndTime);
      return newStart < e && newEnd > s;
    });
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
      alert("End must be after start");
      return;
    }

    if (isOverlapping(start, end, editingQuiz.Id)) {
      alert("Quiz timing overlaps with another quiz!");
      return;
    }

    const duration = Math.ceil((end - start) / (1000*60));

    const res = await fetch(
      "http://localhost/InventoryDB/api/Inventory/update-quiz",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Id: editingQuiz.Id,
          StartTime: startTime, // send local datetime string as-is
          EndTime: endTime,
          DurationMinutes: duration
        })
      }
    );

    const msg = await res.text();
    if (res.ok) {
      alert(msg);
      setEditingQuiz(null);
      fetchQuizzes();
    } else {
      alert(msg);
    }
  };

  return (
    <div>
      <h2>Manage Quizz Timings !</h2>

      <button onClick={() => navigate("/add-quiz")}>
        <FaPlus style={{ marginRight: "5px" }} /> Add Quiz
      </button>

      <table border="1" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {quizzes.map(q => {
            const status = getStatus(q);
            return (
              <tr key={q.Id}>
                <td>{q.Title}</td>
                <td>{new Date(q.StartTime).toLocaleString()}</td>
                <td>{new Date(q.EndTime).toLocaleString()}</td>
                <td>{q.DurationMinutes} min</td>
                <td style={{ color: status.color, fontWeight: "bold" }}>
                  {status.text}
                </td>
                <td>
                  <button onClick={() => handleEdit(q)}> <FaEdit /> </button>
                  <button onClick={() => handleDelete(q.Id)}> <FaTrash /> </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ✅ EDIT MODAL */}
      {editingQuiz && (
        <div style={modalStyle.overlay}>
          <div style={modalStyle.modal}>
            <h3>Edit Quiz</h3>

            <label>Start Time</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />

            <label>End Time</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />

            <div style={{ marginTop: "15px" }}>
              <button onClick={handleUpdate}>
                <FaSave style={{ marginRight: "5px" }} /> Save
              </button>
              <button onClick={() => setEditingQuiz(null)}>
                <FaTimes style={{ marginRight: "5px" }} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px"
  }
};

export default ManageQuiz;