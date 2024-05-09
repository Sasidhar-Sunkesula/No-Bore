import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = (ReactDOM as any).createRoot(document.getElementById('root')!); // Add '!' to assert that document.getElementById('root') will not be null.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
