import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './views/Join/Join';
import Chat from './views/Chat/Chat';

import './theme.css'

const App = () => (
    <Router basename="/">
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
    </Router>
)

export default App;