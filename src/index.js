import React from 'react';
import ReactDOM from 'react-dom/client';
import './app.css';
import App from './app.jsx';
import { builder } from "@builder.io/react";

builder.init(process.env.REACT_APP_BUILDER_API_KEY);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
 
  </React.StrictMode>
);
