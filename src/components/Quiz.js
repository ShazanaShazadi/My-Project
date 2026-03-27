// import React, { useState, useEffect } from "react"; 
// // useState → store data
// // useEffect → run side effects (like timer)

// import "./Quiz.css"; // Styling
// import questions from "../data/questions"; // Import quiz data
// import { useNavigate } from "react-router-dom"; // Navigation
// import { FaClock } from "react-icons/fa"; // Timer icon

// function Quiz() {

//   // Track current question index
//   const [current, setCurrent] = useState(0);

//   // Track score
//   const [score, setScore] = useState(0);

//   // Track selected answer
//   const [selected, setSelected] = useState(null);

//   // Timer (10 seconds per question)
//   const [time, setTime] = useState(10);

//   const navigate = useNavigate(); // Navigation function

//   // ⏱️ TIMER LOGIC
//   useEffect(() => {

//     // If time reaches 0 → go to next question
//     if (time === 0) {
//       handleNext();
//       return;
//     }

//     // Decrease time every 1 second
//     const timer = setTimeout(() => {
//       setTime(time - 1);
//     }, 1000);

//     // Cleanup function (important in React)
//     return () => clearTimeout(timer);

//   }, [time]); // Runs every time "time" changes


//   // 👉 Handle Next Button
//   const handleNext = () => {

//     // Check if selected answer is correct
//     if (selected === questions[current].answer) {
//       setScore(score + 1); // Increase score
//     }

//     // If more questions exist
//     if (current + 1 < questions.length) {

//       setCurrent(current + 1); // Move to next question
//       setSelected(null); // Reset selection
//       setTime(10); // Reset timer

//     } else {

//       // If quiz finished → go to result page
//       navigate("/result", { state: { score } });
//     }
//   };

//   // 📊 Calculate progress %
//   const progress = ((current + 1) / questions.length) * 100;

//   return (
//     <div className="quiz-container"> {/* Outer container */}
      
//       <div className="quiz-card"> {/* Card UI */}

//         {/* Progress Bar */}
//         <div className="progress-bar">
//           <div style={{ width: `${progress}%` }}></div>
//         </div>

//         {/* Timer Display */}
//         <div className="timer">
//           <FaClock /> {time}s
//         </div>

//         {/* Question */}
//         <h2>{questions[current].question}</h2>

//         {/* Options */}
//         <div className="options">

//           {/* Loop through options */}
//           {questions[current].options.map((opt, index) => (

//             <label
//               key={index} // Unique key for React
//               className={selected === index ? "active" : ""} // Highlight selected
//             >
              
//               {/* Radio input */}
//               <input
//                 type="radio"
//                 name="option"
//                 onChange={() => setSelected(index)} // Save selected index
//               />

//               {opt} {/* Show option text */}
//             </label>

//           ))}
//         </div>

//         {/* Next / Submit Button */}
//         <button onClick={handleNext}>
//           {current === questions.length - 1 ? "Submit" : "Next"}
//         </button>

//       </div>
//     </div>
//   );
// }

// export default Quiz; // Export component


// import React, { useEffect, useState } from "react"; // useState & useEffect hooks
// import { useNavigate } from "react-router-dom"; // navigation
// import "./Quiz.css";

// function Quiz() {
//   const navigate = useNavigate();

//   const [questions, setQuestions] = useState([]); // store quiz questions
//   const [currentIndex, setCurrentIndex] = useState(0); // current question
//   const [selectedOption, setSelectedOption] = useState(null); // student's choice
//   const [score, setScore] = useState(0); // quiz score
//   const [timeLeft, setTimeLeft] = useState(300); // timer in seconds (5 min)

//   const user = JSON.parse(localStorage.getItem("user")); // logged-in student

//   // Fetch quiz questions from backend
//   useEffect(() => {
//     fetch("http://localhost/InventoryDB/api/Inventory/questions")
//       .then(res => res.json())
//       .then(data => setQuestions(data))
//       .catch(err => console.error(err));
//   }, []);

//   // Timer countdown
//   // useEffect(() => {
//   //   if (timeLeft <= 0) handleSubmit(); // auto submit when time is 0
//   //   const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//   //   return () => clearInterval(timer);
//   // }, [timeLeft]);
//   useEffect(() => {
//   if (timeLeft <= 0) {
//     alert("Time is up! Quiz will be submitted automatically.");
//     handleSubmit(); // submit automatically
//   }
//   const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//   return () => clearInterval(timer);
// }, [timeLeft]);

//   // Handle next question
//   const handleNext = () => {
//     if (selectedOption === questions[currentIndex].CorrectAnswer) {
//       setScore(score + 1); // increment score if correct
//     }
//     setSelectedOption(null); // reset selection
//     if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
//     else handleSubmit(); // submit quiz if last question
//   };

//   // Submit quiz to backend
//   // const handleSubmit = async () => 
//     //{
//   //   try {
//   //     await fetch("http://localhost/InventoryDB/api/Inventory/submit-quiz", {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({
//   //         userId: user.Id,
//   //         score,
//   //         total: questions.length
//   //       })
//   //     });
//   //     navigate("/result"); // navigate to results page
//   //   } catch (err) {
//   //     console.error(err);
//   //   }
//   // };
//   const handleSubmit = async () => {
//   try {
//     const res = await fetch("http://localhost/InventoryDB/api/Inventory/submit-quiz", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: user.Id,
//         score,
//         total: questions.length
//       })
//     });

//     if (res.status === 403) {
//       alert("You have already attempted this quiz 2 times. Cannot submit again.");
//       navigate("/quiz"); // or redirect somewhere
//       return;
//     }

//     navigate("/result"); // successful submission
//   } catch (err) {
//     console.error(err);
//   }
// };

//   if (!questions.length) return <p>Loading...</p>; // wait for questions

//   const q = questions[currentIndex]; // current question

//   return (
//     <div className="quiz-container">
//       <div className="quiz-header">
//         <h2>Question {currentIndex + 1}/{questions.length}</h2>
//         <span>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" + timeLeft % 60 : timeLeft % 60}</span>
//       </div>
//       <div className="quiz-question">
//         <p>{q.QuestionText}</p>
//         <div className="quiz-options">
//           {[ "OptionA", "OptionB", "OptionC", "OptionD" ].map((opt, idx) => (
//             <button
//               key={idx}
//               className={selectedOption === idx + 1 ? "selected" : ""}
//               onClick={() => setSelectedOption(idx + 1)}
//             >
//               {q[opt]}
//             </button>
//           ))}
//         </div>
//       </div>
//       <button className="next-btn" onClick={handleNext}>{currentIndex === questions.length - 1 ? "Submit" : "Next"}</button>
//     </div>
//   );
// }

// export default Quiz;






// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Quiz.css";

// function Quiz() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

//   // Ensure quiz was started from dashboard
//   useEffect(() => {
//     if (!location.state?.start) {
//       navigate("/"); // redirect to dashboard if quiz not started properly
//     }
//   }, [location.state, navigate]);

//   // Load questions immediately
//   useEffect(() => {
//     fetch("http://localhost/InventoryDB/api/Inventory/questions")
//       .then(res => res.json())
//       .then(data => setQuestions(data))
//       .catch(err => console.error(err));
//   }, []);

//   // Timer
//   useEffect(() => {
//     if (timeLeft <= 0) handleSubmit();

//     const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const handleNext = () => {
//     if (selectedOption === questions[currentIndex].CorrectAnswer) setScore(score + 1);
//     setSelectedOption(null);

//     if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
//     else handleSubmit();
//   };

//   const handleSubmit = async () => {
//     try {
//       await fetch("http://localhost/InventoryDB/api/Inventory/submit-quiz", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user.Id,
//           score,
//           total: questions.length
//         })
//       });
//       navigate("/result");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!questions.length) return <p>Loading Questions...</p>;

//   const q = questions[currentIndex];

//   return (
//     <div className="quiz-container">
//       <div className="quiz-header">
//         <h2>Question {currentIndex + 1}/{questions.length}</h2>
//         <span>
//           Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" + timeLeft % 60 : timeLeft % 60}
//         </span>
//       </div>
//       <div className="quiz-question">
//         <p>{q.QuestionText}</p>
//         <div className="quiz-options">
//           {["OptionA", "OptionB", "OptionC", "OptionD"].map((opt, idx) => (
//             <button
//               key={idx}
//               className={selectedOption === idx + 1 ? "selected" : ""}
//               onClick={() => setSelectedOption(idx + 1)}
//             >
//               {q[opt]}
//             </button>
//           ))}
//         </div>
//       </div>
//       <button className="next-btn" onClick={handleNext}>
//         {currentIndex === questions.length - 1 ? "Submit" : "Next"}
//       </button>
//     </div>
//   );
// }

// export default Quiz;

// Quiz.js
// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Quiz.css";
// function Quiz() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state;

//   // ✅ SAFE extraction
//   const quiz = state?.quiz;
//   const startTime = state?.startTime;

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);

//   // ✅ SAFE timer init
//   const [timeLeft, setTimeLeft] = useState(quiz ? quiz.DurationMinutes * 60 : 0);

//   // ✅ Redirect if no quiz
//   useEffect(() => {
//     if (!quiz) {
//       navigate("/studentdashboard");
//     }
//   }, [quiz, navigate]);

//   // ✅ Fetch quiz questions
//   useEffect(() => {
//     if (!quiz) return;

//     fetch(`http://localhost/InventoryDB/api/Inventory/questions/${quiz.Id}`)
//       .then(res => res.json())
//       .then(data => setQuestions(data))
//       .catch(err => console.error(err));
//   }, [quiz]);

//   // ✅ Timer
//   useEffect(() => {
//     if (!quiz) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [quiz]);

//   // const handleNext = () => {
//   //   if (selectedOption === questions[currentIndex].CorrectAnswer) {
//   //     setScore(prev => prev + 1);
//   //   }

//   //   setSelectedOption(null);

//   //   if (currentIndex < questions.length - 1) {
//   //     setCurrentIndex(currentIndex + 1);
//   //   } else {
//   //     handleSubmit();
//   //   }
//   // };
// //   const handleNext = () => {
// //   const correct = questions[currentIndex].CorrectAnswer;

// //   console.log("Selected:", selectedOption);
// //   console.log("Correct:", correct);

// //   // ✅ FIXED comparison
// //   if (selectedOption && Number(selectedOption) === Number(correct)) {
// //     setScore(prev => prev + 1);
// //   }

// //   setSelectedOption(null);

// //   if (currentIndex < questions.length - 1) {
// //     setCurrentIndex(currentIndex + 1);
// //   } else {
// //     handleSubmit();
// //   }
// // };
//  const handleNext = () => {
//   let newScore = score;
//   console.log("Selected:", selectedOption);
//   console.log("Correct:", correct);
//   if (Number(selectedOption) === Number(questions[currentIndex].CorrectAnswer)) {
//     newScore = score + 1;
//     setScore(newScore);
//   }

//   setSelectedOption(null);

//   if (currentIndex < questions.length - 1) {
//     setCurrentIndex(prev => prev + 1);
//   } else {
//     handleSubmit(newScore); // ✅ send correct score
//   }
// };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch("http://localhost/InventoryDB/api/Inventory/submit-quiz", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId: user.Id,
//           quizId: quiz.Id,
//           score,
//           total: questions.length,
//           startTime,
//           submitTime: new Date(),
//           completed: true
//         })
//       });

//       const msg = await res.text();

//       if (res.status === 200) {
//         alert("Quiz Submitted! Score: " + score);

//         // ✅ pass quiz again for restart
//         navigate("/result", {
//           state: { quiz }
//         });

//       } else {
//         alert(msg);
//         navigate("/studentdashboard");
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!quiz) return null;
//   if (!questions.length) return <p>Loading...</p>;

//   const q = questions[currentIndex];
// console.log("Question:", q);
//   return (
//     <div>
//       <h2>{quiz.Title}</h2>

//       <p>
//         Time Left: {Math.floor(timeLeft / 60)}:
//         {timeLeft % 60 < 10 ? "0" + (timeLeft % 60) : timeLeft % 60}
//       </p>

//       <p>{q.QuestionText}</p>

//       {/* {["OptionA", "OptionB", "OptionC", "OptionD"].map((opt, idx) => (
//         <button
//           key={idx}
//           className={selectedOption === idx + 1 ? "selected" : ""}
//           onClick={() => setSelectedOption(idx + 1)}
//         >
//           {q[opt]}
//         </button>
//       ))} */}
//       {["OptionA","OptionB","OptionC","OptionD"].map((opt, idx) => (
//   <button
//     key={idx}
//     className={selectedOption === idx + 1 ? "selected" : ""}
//     onClick={() => setSelectedOption(idx + 1)} // ✅ 1–4
//   >
//     {q[opt]}
//   </button>
// ))}

//       <button onClick={handleNext}>
//         {currentIndex === questions.length - 1 ? "Submit" : "Next"}
//       </button>
//     </div>
//   );
// }

// export default Quiz;

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./Quiz.css";

// function Quiz() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const state = location.state;

//   const quiz = state?.quiz;
//   const startTime = state?.startTime;

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [score, setScore] = useState(0);

//   const [timeLeft, setTimeLeft] = useState(
//     quiz ? quiz.DurationMinutes * 60 : 0
//   );

//   // ✅ Redirect if no quiz
//   useEffect(() => {
//     if (!quiz) {
//       navigate("/studentdashboard");
//     }
//   }, [quiz, navigate]);

//   // ✅ Fetch questions
//   useEffect(() => {
//     if (!quiz) return;

//     fetch(`http://localhost/InventoryDB/api/Inventory/questions/${quiz.Id}`)
//       .then(res => res.json())
//       .then(data => setQuestions(data))
//       .catch(err => console.error(err));
//   }, [quiz]);

//   // ✅ Timer
//   useEffect(() => {
//     if (!quiz) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit(score); // ✅ submit current score
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [quiz, score]);

//   // ✅ FIXED handleNext
//   const handleNext = () => {
//     const correct = questions[currentIndex].CorrectAnswer;

//     console.log("Selected:", selectedOption);
//     console.log("Correct:", correct);

//     let newScore = score;

//     // ✅ FIX: convert both to number
//     if (Number(selectedOption) === Number(correct)) {
//       newScore = score + 1;
//       setScore(newScore);
//     }

//     setSelectedOption(null);

//     if (currentIndex < questions.length - 1) {
//       setCurrentIndex(prev => prev + 1);
//     } else {
//       handleSubmit(newScore); // ✅ pass correct final score
//     }
//   };

//   // ✅ Updated submit
//   const handleSubmit = async (finalScore) => {
//     try {
//       const res = await fetch(
//         "http://localhost/InventoryDB/api/Inventory/submit-quiz",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: user.Id,
//             quizId: quiz.Id,
//             score: finalScore,
//             total: questions.length,
//             startTime,
//             submitTime: new Date(),
//             completed: true,
//           }),
//         }
//       );

//       const msg = await res.text();

//       if (res.status === 200) {
//         alert("Quiz Submitted! Score: " + finalScore);

//         navigate("/result", {
//           state: { quiz },
//         });
//       } else {
//         alert(msg);
//         navigate("/studentdashboard");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!quiz) return null;
//   if (!questions.length) return <p>Loading...</p>;

//   const q = questions[currentIndex];

//   return (
//     <div>
//       <h2>{quiz.Title}</h2>

//       <p>
//         Time Left: {Math.floor(timeLeft / 60)}:
//         {timeLeft % 60 < 10 ? "0" + (timeLeft % 60) : timeLeft % 60}
//       </p>

//       <p>{q.QuestionText}</p>

//       {["OptionA", "OptionB", "OptionC", "OptionD"].map((opt, idx) => (
//         <button
//           key={idx}
//           className={selectedOption === idx + 1 ? "selected" : ""}
//           onClick={() => setSelectedOption(idx + 1)}
//         >
//           {q[opt]}
//         </button>
//       ))}

//       <button onClick={handleNext}>
//         {currentIndex === questions.length - 1 ? "Submit" : "Next"}
//       </button>
//     </div>
//   );
// }

// export default Quiz;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();

  const quiz = location.state?.quiz;
  const startTime = location.state?.startTime || new Date();

  const user = JSON.parse(localStorage.getItem("user"));

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(quiz ? quiz.DurationMinutes * 60 : 0);

  useEffect(() => {
    if (!user || !quiz) navigate("/studentdashboard");
  }, [user, quiz, navigate]);

  useEffect(() => {
    if (!quiz) return;
    fetch(`http://localhost/InventoryDB/api/Inventory/questions/${quiz.Id}`)
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  }, [quiz]);

  // Timer
  useEffect(() => {
    if (!quiz) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [quiz, score]);

  const handleNext = () => {
    const correct = questions[currentIndex].CorrectAnswer;
    if (Number(selectedOption) === Number(correct)) setScore(prev => prev + 1);

    setSelectedOption(null);

    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
    else handleSubmit(score + (Number(selectedOption) === Number(correct) ? 1 : 0));
  };

  const handleSubmit = async (finalScore) => {
    try {
      const res = await fetch("http://localhost/InventoryDB/api/Inventory/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          UserId: user.Id,
          QuizId: quiz.Id,
          Score: finalScore,
          TotalQuestions: questions.length,
          StartTime: startTime.toISOString(),
          SubmitTime: new Date().toISOString(),
          Completed: true
        })
      });

      const msg = await res.text();

      if (res.ok) {
        navigate("/result", { state: { quiz } });
      } else {
        alert(msg);
        navigate("/studentdashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting quiz. Please try again.");
    }
  };

  if (!quiz) return null;
  if (!questions.length) return <p>Loading questions...</p>;

  const q = questions[currentIndex];

  // ---------------- Inline Styles ----------------
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
      position: "relative" // for timer
    },
    timer: {
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "18px",
      fontWeight: "700",
      color: "#ff6600",
      background: "#fff3e0",
      padding: "8px 12px",
      borderRadius: "8px",
      boxShadow: "0 3px 8px rgba(0,0,0,0.2)"
    },
    heading: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#ff6600",
      marginBottom: "10px"
    },
    questionNumber: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#555",
      marginBottom: "8px"
    },
    questionText: {
      fontSize: "20px",
      fontWeight: "500",
      color: "#333",
      marginBottom: "20px"
    },
    optionsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    optionButton: {
      padding: "12px 20px",
      margin: "6px 0",
      width: "100%",
      maxWidth: "400px",
      borderRadius: "10px",
      border: "2px solid #ff6600",
      background: "#f3b47a",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.3s ease"
    },
    selectedOptionButton: {
      background: "#ff6600",
      color: "#fff",
      border: "2px solid #ff6600"
    },
    nextButton: {
      marginTop: "25px",
      padding: "14px 24px",
      fontSize: "18px",
      fontWeight: "bold",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      background: "linear-gradient(45deg, #ff6600, #ff9933)",
      color: "#fff",
      boxShadow: "0 5px 15px rgba(255,102,0,0.4)",
      transition: "all 0.3s ease"
    }
  };
  // -------------------------------------------------

  return (
    <div style={style.container}>
      <div style={style.timer}>
        Time Left: {Math.floor(timeLeft / 60)}:
        {timeLeft % 60 < 10 ? "0" : ""}{timeLeft % 60}
      </div>

      <h2 style={style.heading}>{quiz.Title}</h2>
      <div style={style.questionNumber}>Question {currentIndex + 1} of {questions.length}:</div>
      <div style={style.questionText}>{q.QuestionText}</div>

      <div style={style.optionsContainer}>
        {["OptionA", "OptionB", "OptionC", "OptionD"].map((opt, idx) => (
          <button
            key={idx}
            style={
              selectedOption === idx + 1
                ? { ...style.optionButton, ...style.selectedOptionButton }
                : style.optionButton
            }
            onClick={() => setSelectedOption(idx + 1)}
          >
            {q[opt]}
          </button>
        ))}
      </div>

      <button style={style.nextButton} onClick={handleNext}>
        {currentIndex === questions.length - 1 ? "Submit" : "Next"}
      </button>
    </div>
  );
}

export default Quiz;