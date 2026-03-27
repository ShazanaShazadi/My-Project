import React from "react"; // Import React library
import "./Home.css"; // Import CSS for styling
import { useNavigate } from "react-router-dom"; // Hook for navigation
import { FaPlayCircle } from "react-icons/fa"; // Icon for button

function Home() {
  const navigate = useNavigate(); // Create navigation function

  return (
    <div className="home"> {/* Main container */}
      
      <div className="card"> {/* Card UI */}
        
        <h1>🎓 Uni Quiz App</h1> {/* Title */}
        
        <p>Test your knowledge with timed questions</p> {/* Subtitle */}

        {/* Button to start quiz */}
        <button onClick={() => navigate("/quiz")}>
          <FaPlayCircle /> {/* Icon */}
          Start Quiz
        </button>

      </div>
    </div>
  );
}

export default Home; // Export component