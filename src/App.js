import React, { useState } from 'react';
import Header from './components/Header';
import Quiz from './components/Quiz';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Quiz />
        </>
    );
}
