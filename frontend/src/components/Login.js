import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [credentials, setcredentials] = useState({ email: "", password: "", role: "admin" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.role === "user") {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('role', 'user');
                localStorage.setItem('token', json.authToken);
                navigate('/');
                toast.success("Logged In Successfully!", { position: "bottom-left", autoClose: 2000 });
            } else {
                toast.error("Invalid Details!", { position: "bottom-left", autoClose: 2000 });
            }
        } else {
            if (credentials.email === "admin@gmail.com" && credentials.password === "admin") {
                localStorage.setItem('role', 'admin');
                localStorage.setItem('token', 'admin');
                navigate('/');
                toast.success("Logged In Successfully!", { position: "bottom-left", autoClose: 2000 });
            } else {
                toast.error("Invalid Details!", { position: "bottom-left", autoClose: 2000 });
            }
        }
    };

    const handleChange = (e) => {
        setcredentials({ ...credentials, role: e.target.value });
    };

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <h3 className="text-primary fw-bold">Log In</h3>
                    <p className="text-muted">Enter your details below to access your account</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            className="form-select"
                            id="role"
                            value={credentials.role}
                            onChange={handleChange}
                        >
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            value={credentials.email}
                            onChange={onChange}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            value={credentials.password}
                            onChange={onChange}
                            required
                            minLength={5}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">Log In</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-0">Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};
