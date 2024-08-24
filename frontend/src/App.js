import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import UploadData from './components/UploadData';
import ListingPage from './components/ListingPage';
import UserVideosPage from './components/UserVideosPage'; 

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CreateAccount />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<UploadData />} />
                <Route path="/listing" element={<ListingPage />} />
                <Route path="/user-videos/:userId" element={<UserVideosPage />} /> 
            </Routes>
        </Router>
    );
}

export default App;
