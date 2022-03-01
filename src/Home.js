import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import News from './News';
import Slides from './Slides';

export const Home = (params) => {
    return (
      <div className="App">
        <Slides />
        <News />
      </div>
    );
  }