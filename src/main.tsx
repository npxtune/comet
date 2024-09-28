import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the '/client' here for React 18
import App from './App';

// Create a root.
const root = ReactDOM.createRoot(document.getElementById('root')!); // Use non-null assertion (!)

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
