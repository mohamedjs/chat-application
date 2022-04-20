import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chat from './Chat';
import '../asset/css/index.css'

export default function Index() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Chat/>} />
                </Routes>
            </Router>
        </div>
    );
}
