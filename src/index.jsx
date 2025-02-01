import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Teach from './components/Teach';  // Import Teach component

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/lessons', element: <Teach /> },  // Add Teach route here
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
