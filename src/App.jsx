import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AddPost from './pages/AddPost';
import ViewPost from './pages/ViewPost';
import "./App.css"
function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2 className="mb-4 text-center">📘 Interviee</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/posts/:id" element={<ViewPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
