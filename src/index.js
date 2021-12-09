import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Results from './components/Results';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<App />} />
                <Route path='results' element={<Results />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
 