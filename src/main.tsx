import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(document.getElementById('root')!); // Use non-null assertion (!)

root.render(
    <React.StrictMode>
        <CssBaseline/>
        <App/>
    </React.StrictMode>
);
