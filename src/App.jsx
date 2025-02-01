import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import hackingGif from './assets/coding.gif'; // Adjust path as needed

function App() {
  return (
    <div className="container">
      <Header />

      <main>
        <div className="intro">
          <h1>SCBD:  AI-Powered Platform</h1>
          <p>
            Key features of the application include expandable topic cards, and personalized samples provided through API integration. The platform allows users to easily navigate through different topics
            , explore detailed explanations. However, as the application uses an API to fetch content, there are API request limits and cooldown periods in place to ensure fair usage.
          </p>

          <br />
          
          <p>
            <b>Tech Stack</b>
            <br />
            <b>Frontend: </b>React, Vite
            <br />
            <b>API Integration: </b>Gemini API
            <br />
            <b>Styling: </b>CSS, Inline styles
          </p>

          <div className="actions">
            <Link to="/lessons" className="btn">Start Learning</Link>
          </div>
        </div>

        {/* Hacking GIF */}
        <div className="hacking-gif">
          <img src={hackingGif} alt="Hacking Animation" className="animated-gif" />
        </div>
      </main>
    </div>
  );
}

export default App;
