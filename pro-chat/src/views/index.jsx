import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chat from './Chat';
import CallVideo from '../components/home/callVideo/CallVideo';
import '../asset/css/index.css'
import SampleChat from './Sample';
import Register from './Register';
import VerificationCode from './VerificationCode';
import ProfileData from './ProfileData';

export default function Index() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Chat/>} />
                    <Route path="/sample" element={<SampleChat />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<VerificationCode />} />
                    <Route path="/profile" element={<ProfileData />} />

                </Routes>
            </Router>
        </div>
    );
}
