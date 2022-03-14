import { Routes, Route} from "react-router-dom";
import * as React from "react";
import './App.css';
import {Navigation} from './Navigation';
import {Home} from './Home';
import Footer from './Footer';
import Pnews from './Pnews';
import { Gallerys } from './Gallerys';
import { Dokumen } from './Dokumen';
import DetailArtikel from './DetailArtikel';
import { DocumentViewerComponent } from './DocumentViewerComponent';
import Pengumuman from './Pengumuman';
import DetailPengumuman from './DetailPengumuman';
import Loading from "react-fullscreen-loading";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import StaticPage from './StaticPage';
import { GalVid } from './GalVid';

function App() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)
  const [LoaderComplete, setLoaderComplete] = useState(true);
  console.log('count di app js', count)

  useEffect(() => {
    console.log('LoaderComplete', LoaderComplete)
    if (count == 7 || count == 2 || count == 3 || count == 1) {
      setLoaderComplete(false)
    }
  }, [count, LoaderComplete]);
  
  return (
    <div className="App">
      <Loading loading={false} background='#2ecc71' loaderColor='#3498db' />
      <Navigation />
       <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/artikel" element={<Pnews />} />
        <Route path="/artikel/DetailArtikel/:id" element={<DetailArtikel />} />
        <Route path="/berita/DetailBerita/:id" element={<DetailPengumuman />} />
        <Route path="galerifoto" element={<Gallerys />} />
        <Route path="galerivideo" element={<GalVid />} />
        <Route path="dokumen" element={<Dokumen />} />
        <Route path="/berita" element={<Pengumuman />} />
        <Route path="/pdf/:slug/:filename" element={<DocumentViewerComponent />} />
        <Route path="/:id" element={<StaticPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
