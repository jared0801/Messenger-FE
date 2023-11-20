import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Join from './views/Join/Join';
import Chat from './views/Chat/Chat';

import './theme.css'

const App = () => (
    <Router basename="/messenger" future={{ v7_startTransition: true }}>
        <Routes>
            <Route path="/" exact element={<Join />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    </Router>
)

export default App;