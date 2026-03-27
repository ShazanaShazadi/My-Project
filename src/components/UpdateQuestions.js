import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UpdateQuestion.css";

function UpdateQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const q = location.state.question; // question passed from ManageQuestions

  const [questionText, setQuestionText] = useState(q.QuestionText);
  const [optionA, setOptionA] = useState(q.OptionA);
  const [optionB, setOptionB] = useState(q.OptionB);
  const [optionC, setOptionC] = useState(q.OptionC);
  const [optionD, setOptionD] = useState(q.OptionD);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost/InventoryDB/api/Inventory/update-question/${q.Id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          QuestionText: questionText,
          OptionA: optionA,
          OptionB: optionB,
          OptionC: optionC,
          OptionD: optionD
        })
      });

      if (res.ok) {
        alert("Question updated successfully");
        navigate("/manage-questions");
      } else {
        const msg = await res.text();
        alert("Failed: " + msg);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="update-question-container">
      <h2>Update Question</h2>
      <form onSubmit={handleUpdate}>
        <input value={questionText} onChange={(e) => setQuestionText(e.target.value)} required />
        <input value={optionA} onChange={(e) => setOptionA(e.target.value)} required />
        <input value={optionB} onChange={(e) => setOptionB(e.target.value)} required />
        <input value={optionC} onChange={(e) => setOptionC(e.target.value)} required />
        <input value={optionD} onChange={(e) => setOptionD(e.target.value)} required />
        <button type="submit">Update Question</button>
      </form>
    </div>
  );
}

export default UpdateQuestion;