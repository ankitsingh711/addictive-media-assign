import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios/api';

const CreateAccount = () => {
    const [user, setUser] = useState({ first_name: '', last_name: '', email: '', num : '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', user);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" name="first_name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" name="last_name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Number</label>
                    <input type="number" name="num" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CreateAccount;
