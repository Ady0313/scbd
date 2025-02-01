import React, { useState } from 'react';
import Header from './header'; // Importing Header


const pythonTopics = [
  { title: 'Variables and Data Types', description: 'Ever wondered what a variable is? It’s like a box that holds your favorite candy... or maybe your pizza slice. It can hold numbers, text, booleans—anything! Don’t leave your variables unwrapped!' },
  { title: 'Control Flow', description: 'Life’s full of choices. You know, like if you should go to the gym or watch Netflix? Control flow in Python helps you make these decisions: if-else, loops—you decide where the program goes!' },
  { title: 'Functions', description: 'A function is like a microwave. You put stuff in (parameters), press a button (call the function), and out pops something magical. Save time, and don’t repeat yourself. Reuse it like leftovers!' },
  { title: 'Lists and Tuples', description: 'Think of a list like your grocery list: it’s ordered, you can change it, add or remove items. A tuple is like your breakfast order: it’s set, unchangeable, and only for the bravest!' },
  { title: 'Dictionaries', description: 'Dictionaries are like your grandma’s recipe box: it’s a collection of key-value pairs. Just make sure to keep your keys organized, or grandma will be looking for that secret sauce forever!' },
  { title: 'Sets', description: 'Imagine a club where no one can bring the same outfit twice. That’s a set—unique, no duplicates, and always fashionable! Sets make sure you never repeat your mistakes... at least in your code.' },
  { title: 'Modules and Packages', description: 'Modules are like your best friends who do one thing really well. Packages? That’s when you get your whole squad together to handle all the heavy lifting. Python loves teamwork!' },
  { title: 'Error Handling', description: 'Life’s unpredictable. Just like bugs in code. Don’t panic. Use try and except, and catch those errors before they ruin your day. Think of it like a safety net for your code.' },
  { title: 'File I/O', description: 'Files are like books: you can read them, write to them, and even edit them. Python lets you open and close your books easily, so you can write your own story, one line at a time!' },
  { title: 'OOP (Object-Oriented Programming)', description: 'Object-Oriented Programming is like turning your code into little robots (objects) that know their own thing. Create classes to make them smart, and let them do the work for you!' },
];



const TopicCard = ({ title, description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div 
      className="topic-card"
      style={{
        backgroundColor: '#2c2f36',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px',
        width: '250px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Floating effect with shadow
        transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effect
        transform: 'translateY(0)', // Initial position
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)'; // Lift effect on hover
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)'; // Deepen shadow on hover
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'; // Reset position
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; // Reset shadow
      }}
    >
      <h3 style={{ fontWeight: 'bold', color: '#fff' }}>{title}</h3>
      <button 
  className="expand-btn" 
  onClick={() => setExpanded(!expanded)}
  style={{
    backgroundColor: '#fe8033',  // Orange color
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  }}
>
  {expanded ? 'Collapse' : 'Expand'}
</button>

      {expanded && <p style={{ color: '#ddd' }}>{description}</p>}
    </div>
  );
};

const Teach = () => {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [customApiKey, setCustomApiKey] = useState('');
  const [message, setMessage] = useState('');
  const [lesson, setLesson] = useState('');
  const [query, setQuery] = useState('');
  const [isCustomKey, setIsCustomKey] = useState(false);

  const simplifyResponse = (responseText) => {
    const pythonCodeMatch = responseText.match(/```python([\s\S]*?)```/);
    if (pythonCodeMatch) {
      return pythonCodeMatch[1].trim();
    }
    return "No Python code found in the response.";
  };

  const handleFetchLesson = async () => {
    const keyToUse = isCustomKey ? customApiKey : apiKey;
    if (!keyToUse) {
      setMessage('Please provide a valid API key.');
      return;
    }
    if (!query.trim()) {
      setMessage('Please enter a valid query.');
      return;
    }
  
    // Function to check if the query is theoretical
    const isTheoreticalQuery = (query) => {
      const theoreticalKeywords = ['what is', 'define', 'explain', 'who is', 'why is'];
      return theoreticalKeywords.some(keyword => query.toLowerCase().includes(keyword));
    };
  
    // Function to check if the query is a program/code request
    const isCodeRequest = (query) => {
      const codeKeywords = ['write a program', 'example', 'how to code', 'program for', 'implement'];
      return codeKeywords.some(keyword => query.toLowerCase().includes(keyword));
    };
  
    // Clean the response to remove non-Python code examples
    const cleanPythonCodeResponse = (responseText) => {
      // Remove non-Python code (e.g., JavaScript, Java, etc.)
      const pythonCodeRegex = /```python([\s\S]*?)```/g; // Match Python code block
      const pythonCode = responseText.match(pythonCodeRegex);
  
      if (pythonCode && pythonCode.length > 0) {
        return pythonCode.map(code => code.replace(/```python|```/g, '').trim()).join('\n');
      }
  
      return "No Python code found in the response.";
    };
  
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${keyToUse}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: query }] }]
        }),
      });
  
      if (!response.ok) {
        setMessage(`Error: ${response.status} ${response.statusText}`);
        return;
      }
  
      const data = await response.json();
  
      if (data?.candidates && data.candidates.length > 0) {
        const lessonContent = data.candidates[0].content.parts[0].text;
  
        if (lessonContent) {
          if (isTheoreticalQuery(query)) {
            setLesson(`Here's an explanation: ${lessonContent}`);
          } else if (isCodeRequest(query)) {
            // Clean the response to only show Python code
            const pythonCode = cleanPythonCodeResponse(lessonContent);
            setLesson(`Here's your Python program:\n\n${pythonCode}`);
          } else {
            setLesson(lessonContent);
          }
          setMessage('');
        } else {
          setMessage('Sorry, no relevant content found for your query.');
        }
      } else {
        setMessage('Sorry, no candidates found for your query.');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setMessage('Error: Unable to fetch lesson');
    }
  };
  
  
  
  

  return (
    <div className="lesson">
      <Header />
      <h2 style={{ color: 'white', fontSize: '2rem', margin: '20px 0' }}>Python Lessons</h2>
      <p style={{ fontSize: '1.25rem', color: '#e1e1e1', lineHeight: '1.7', marginBottom: '20px' }}>
        Explore lessons on Python basics, functions, and more.
      </p>

      {/* Input and Query Section */}
      <div className="lesson-content" style={{ padding: '20px' }}>
        <div className="api-key-section" style={{ marginBottom: '20px' }}>
          <label>
            Use custom API key:
            <input
              type="checkbox"
              checked={isCustomKey}
              onChange={() => setIsCustomKey(!isCustomKey)}
              style={{ marginLeft: '10px' }}
            />
          </label>

          {isCustomKey ? (
            <input
              type="text"
              value={customApiKey}
              onChange={(e) => setCustomApiKey(e.target.value)}
              placeholder="Enter your Gemini API Key"
              className="api-key-input"
              style={{ padding: '10px', fontSize: '1rem', marginTop: '10px', width: '100%' }}
            />
          ) : (
            <p className="api-key-message" style={{ color: '#ccc', fontSize: '1rem' }}>Using default API key</p>
          )}
        </div>

        <div className="query-section" style={{ marginBottom: '20px' }}>
          <label htmlFor="query-input" style={{ fontSize: '1.1rem', color: '#fff' }}>Enter your query:</label>
          <input
            type="text"
            id="query-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask something about Python..."
            className="query-input"
            style={{ padding: '10px', fontSize: '1rem', width: '100%', marginTop: '10px' }}
          />
          <button
            onClick={handleFetchLesson}
            className="fetch-btn"
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#fe8033',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '15px',
              transition: 'background-color 0.3s ease',
            }}
          >
            Submit Query
          </button>
        </div>

        {message && (
          <p className="lesson-message" style={{ color: '#ff5c00', fontWeight: 'bold', fontSize: '1rem' }}>
            {message}
          </p>
        )}

        {lesson && (
          <pre className="lesson-text" style={{ backgroundColor: '#1d1f23', color: '#e1e1e1', padding: '20px', borderRadius: '5px' }}>
            {lesson}
          </pre>
        )}
      </div>

      {/* Topic Cards */}
      <div 
        className="topics-container" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '20px', // Add some space between cards
          marginTop: '20px',
        }}
      >
        {pythonTopics.map((topic, index) => (
          <TopicCard key={index} title={topic.title} description={topic.description} />
        ))}
      </div>

    </div>
  );
};

export default Teach;
