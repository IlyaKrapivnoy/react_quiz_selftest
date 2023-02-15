import React, { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Results from './components/Results';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path='/' exact element={<Quiz />} />
                <Route path='results' element={<Results />} />
            </Routes>
        </BrowserRouter>
    );
}
