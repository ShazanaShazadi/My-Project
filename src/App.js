// import React from "react"; // React
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
// // Router setup

// // Import components
// import Home from "./components/Home";
// import Quiz from "./components/Quiz";
// import Result from "./components/Result";

// function App() {
//   return (

//     // Wrap entire app inside Router
//     <Router>

//       {/* Define all routes */}
//       <Routes>

//         {/* Home Page */}
//         <Route path="/" element={<Home />} />

//         {/* Quiz Page */}
//         <Route path="/quiz" element={<Quiz />} />

//         {/* Result Page */}
//         <Route path="/result" element={<Result />} />

//       </Routes>

//     </Router>
//   );
// }

// export default App; // Export App




import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Router
import Login from "./components/Login";
import Signup from "./components/Signup";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import AdminDashboard from "./components/AdminDashboard";
import AddQuestion from "./components/AddQuestions";
import ViewResults from "./components/ViewResults";
import ManageQuestions from "./components/ManageQuestions";
import UpdateQuestion from "./components/UpdateQuestions";
import StudentDashboard from "./components/StudentDashboard";
import AddQuiz from "./components/AddQuiz";
import ManageQuiz from "./components/ManageQuiz";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Student Routes */}
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/addquestion" element={<AddQuestion />} />
        <Route path="/viewresults" element={<ViewResults />} />
        <Route path="/manage-questions" element={<ManageQuestions />} />
<Route path="/update-question" element={<UpdateQuestion />} />
<Route path="/studentdashboard" element={<StudentDashboard />} />
<Route path="/add-quiz" element={<AddQuiz />} />
<Route path="/manage-quiz" element={<ManageQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;