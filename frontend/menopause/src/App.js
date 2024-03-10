import logo from './logo.svg';
import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import localeData from './locales'; 

import { useState, useEffect } from 'react';
import axios from 'axios';

import Home from './Components/Home/Home';
import Signin from './Components/Signin/Signin';
import Meno from './Components/Meno/Meno';
import Signup from './Components/Signup/Signup';
import Track from './Components/Track-Symptoms/Track';
import Recommendations from './Components/Recommendation/Recommendations';
import Patterns from './Components/Patterns/Patterns';

import ViewProfile from './Components/Profile/ViewProfile';
import Reports from './Components/Reports/Reports';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


function App() {
  return (
    <IntlProvider locale="es" messages={localeData.es}>
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
                <Route path="/track" element={<Track />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/patterns" element={<Patterns />} />
                <Route path="/profile" element={<ViewProfile />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </div>
          </Router>
      </main>
    </div>
  </IntlProvider>
  );
}

export default App;
