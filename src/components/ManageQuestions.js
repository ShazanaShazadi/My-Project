import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManageQuestions.css";
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
function ManageQuestions() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  // Fetch all questions from backend
  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost/InventoryDB/api/Inventory/questions");
      const data = await res.json();
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Delete a question
  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      const res = await fetch(`http://localhost/InventoryDB/api/Inventory/delete-question/${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        alert("Question deleted successfully");
        fetchQuestions(); // Refresh the list
      } else {
        const msg = await res.text();
        alert("Failed: " + msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Navigate to update screen
  const updateQuestion = (q) => {
    navigate("/update-question", { state: { question: q } });
  };

  return (
    <div className="manage-questions-container">
      <h2>Manage Questions</h2>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Option C</th>
            <th>Option D</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.Id}>
              <td>{q.QuestionText}</td>
              <td>{q.OptionA}</td>
              <td>{q.OptionB}</td>
              <td>{q.OptionC}</td>
              <td>{q.OptionD}</td>
              <td>
                <button onClick={() => updateQuestion(q)}> <FaEdit /> </button>
                <button onClick={() => deleteQuestion(q.Id)}> <FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageQuestions;

                