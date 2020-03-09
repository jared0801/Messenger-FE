import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

import './theme.css'

const App = () => (
    <Router basename="/messenger">
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
    </Router>
)

export default App;