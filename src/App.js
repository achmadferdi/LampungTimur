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
import DetailArtikel from './DetailArtikel';
import { DocumentViewerComponent } from './DocumentViewerComponent';
import Pengumuman from './Pengumuman';
import DetailPengumuman from './DetailPengumuman';



function App() {
  return (
    <div className="App">
      <Navigation />
      {/* <News /> */}
       <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route exact path="/news" element={<Pnews />} />
        <Route path="/news/DetailArtikel/:id" element={<DetailArtikel />} />
        <Route path="/pengumuman/DetailPengumuman/:id" element={<DetailPengumuman />} />
        <Route path="sejarah" element={<Sejarah />} />
        <Route path="gallerys" element={<Gallerys />} />
        <Route path="dokumen" element={<Dokumen />} />
        <Route path="Pengumuman" element={<Pengumuman />} />
        <Route path="/pdf/:slug/:filename" element={<DocumentViewerComponent />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
