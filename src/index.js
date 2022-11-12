import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import App from './App';
import Game from './Game';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route exact path='/' element={<App/>} />
      <Route path="/game" element={<Game/>}  />
    </Routes>
  </BrowserRouter>
);
