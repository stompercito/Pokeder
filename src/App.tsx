import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Form, Match, List, NotFoud404 } from './pages'

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/match" element={<Match />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<NotFoud404 />} />
     </Routes>
    </div>
  );
}

export default App;
