// import React, {useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./AddQuestions.css";

// function AddQuestion() {
//   const navigate = useNavigate();
//   const [questionText,setQuestionText] = useState("");
//   const [optionA,setOptionA] = useState("");
//   const [optionB,setOptionB] = useState("");
//   const [optionC,setOptionC] = useState("");
//   const [optionD,setOptionD] = useState("");
//   const [correctAnswer,setCorrectAnswer] = useState(1);
//   const [quizzes, setQuizzes] = useState([]);
// const [quizId, setQuizId] = useState(""); // selected quiz
//   const user = JSON.parse(localStorage.getItem("user")); // admin
// useEffect(() => {
//   fetch("http://localhost/InventoryDB/api/Inventory/all-quizzes")
//     .then(res => res.json())
//     .then(data => setQuizzes(data))
//     .catch(err => console.error(err));
// }, []);
//   const handleAdd = async (e)=>{
//     e.preventDefault();
//     try{
//       await fetch("http://localhost/InventoryDB/api/Inventory/add-question", {
//         method:"POST",
//         headers:{"Content-Type":"application/json"},
       
//         body: JSON.stringify({
//   QuestionText: questionText,
//   OptionA: optionA,
//   OptionB: optionB,
//   OptionC: optionC,
//   OptionD: optionD,
//   CorrectAnswer: correctAnswer,
//   QuizId: quizId,
//   CreatedBy: user.Id
// })
//       });
//       alert("Question Added!");
//       navigate("/admin");
//     }catch(err){ console.error(err);}
//   };

//   return (
//     <div className="add-question-container">
//       <h2>Add New Question</h2>
//       <form onSubmit={handleAdd}>
//         <input placeholder="Question" value={questionText} onChange={e=>setQuestionText(e.target.value)} required/>
//         <input placeholder="Option A" value={optionA} onChange={e=>setOptionA(e.target.value)} required/>
//         <input placeholder="Option B" value={optionB} onChange={e=>setOptionB(e.target.value)} required/>
//         <input placeholder="Option C" value={optionC} onChange={e=>setOptionC(e.target.value)} required/>
//         <input placeholder="Option D" value={optionD} onChange={e=>setOptionD(e.target.value)} required/>
//         <select value={correctAnswer} onChange={e=>setCorrectAnswer(parseInt(e.target.value))}>
//           <option value={1}>Option A</option>
//           <option value={2}>Option B</option>
//           <option value={3}>Option C</option>
//           <option value={4}>Option D</option>
//         </select>
        
// <select value={quizId} onChange={e => setQuizId(parseInt(e.target.value))} required>
//   <option value="">Select Quiz</option>
//   {quizzes.map(q => (
//     <option key={q.Id} value={q.Id}>{q.Title}</option>
//   ))}
// </select>
//         <button type="submit">Add Question</button>
//       </form>
//     </div>
//   );
// }

// export default AddQuestion;








import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddQuestions.css";

function AddQuestion() {
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(1);
  const [quizzes, setQuizzes] = useState([]);
  const [quizId, setQuizId] = useState(""); // selected quiz
  const user = JSON.parse(localStorage.getItem("user")); // admin

  useEffect(() => {
    fetch("http://localhost/InventoryDB/api/Inventory/all-quizzes")
      .then(res => res.json())
      .then(data => {
        const now = new Date();
        const filtered = data.filter(q => {
          const start = new Date(q.StartTime);
          const end = new Date(q.EndTime);
          // ✅ Show only quizzes that are ongoing or upcoming
          return end >= now;
        });
        setQuizzes(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAdd = async (e)=>{
    e.preventDefault();
    try{
      await fetch("http://localhost/InventoryDB/api/Inventory/add-question", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          QuestionText: questionText,
          OptionA: optionA,
          OptionB: optionB,
          OptionC: optionC,
          OptionD: optionD,
          CorrectAnswer: correctAnswer,
          QuizId: quizId,
          CreatedBy: user.Id
        })
      });
      alert("Question Added!");
      navigate("/admin");
    }catch(err){ console.error(err);}
  };

  return (
    <div className="add-question-container">
      <h2>Add Question for Quiz here !</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Question" value={questionText} onChange={e=>setQuestionText(e.target.value)} required/>
        <input placeholder="Option A" value={optionA} onChange={e=>setOptionA(e.target.value)} required/>
        <input placeholder="Option B" value={optionB} onChange={e=>setOptionB(e.target.value)} required/>
        <input placeholder="Option C" value={optionC} onChange={e=>setOptionC(e.target.value)} required/>
        <input placeholder="Option D" value={optionD} onChange={e=>setOptionD(e.target.value)} required/>

        <select value={correctAnswer} onChange={e=>setCorrectAnswer(parseInt(e.target.value))}>
          <option value={1}>Option A</option>
          <option value={2}>Option B</option>
          <option value={3}>Option C</option>
          <option value={4}>Option D</option>
        </select>

        <select value={quizId} onChange={e => setQuizId(parseInt(e.target.value))} required>
          <option value="">Select Quiz</option>
          {quizzes.map(q => (
            <option key={q.Id} value={q.Id}>
              {q.Title} ({new Date(q.StartTime).toLocaleString()} - {new Date(q.EndTime).toLocaleTimeString()})
            </option>
          ))}
        </select>

        <button type="submit">Add Question</button>
      </form>
    </div>
  );
}

export default AddQuestion;