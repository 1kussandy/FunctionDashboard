// App.js
import React from 'react';
import Header from './Header';
import JobsContainer from './JobsContainer';
import JobsContainerHome from './JobsContainerHome';
import '../styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Render Header and JobsContainerHome when the app initially loads */}
          <Route path="/" element={<>
            <Header />
            <JobsContainerHome />
          </>} />
          
          {/* Render JobsContainer when search results are available */}
          <Route path="/search-results" element={<JobsContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
