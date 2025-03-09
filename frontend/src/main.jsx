import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from "axios";
import customFetch from './utils/customFetch.js';
import App from './App.jsx'
const data = await customFetch.get("/api/test");
console.log(data);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
