import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import * as React from "react";
import './App.css';
import { Navbar } from 'react-bootstrap';
import {Navigation} from './Navigation';
import {Home} from './Home';
// import News from './News';
import {Profile} from './Profile';
import Footer from './Footer';
import Pnews from './Pnews';
import { Sejarah } from './Sejarah';
import { Gallerys } from './Gallerys';
import { Dokumen } from './Dokumen';

function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <News /> */}
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="News" element={<Pnews />} />
        <Route path="Sejarah" element={<Sejarah />} />
        <Route path="Gallerys" element={<Gallerys />} />
        <Route path="Dokumen" element={<Dokumen />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
