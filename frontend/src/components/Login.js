import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';

const Login = () => {
    const [first_name, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { first_name, password });
            localStorage.setItem('token', response.data.token);
            alert('Login Successfully !')
            navigate('/upload');
        } catch (error) {
            alert('Invalid Credentials !')
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className="form-control" value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Login;
