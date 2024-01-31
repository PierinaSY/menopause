import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useState, useEffect } from 'react';
import axios from 'axios';

import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Meno from './Components/Meno/Meno';
import Signup from './Components/Signup/Signup';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <main>
      <Router>
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/meno" element={<Meno />} />
                {/* <Route path="/track" element={<Track />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/patterns" element={<Patterns />} /> */}
              </Routes>
            </div>
          </Router>
      </main>
    </div>
  );
}

export default App;
