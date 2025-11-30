import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/users.js';

export function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State for displaying specific errors

    const navigate = useNavigate();

    const signupMutation = useMutation({
        mutationFn: (credentials) => signup(credentials), // Pass data via mutate argument
        onSuccess: () => {
            setError(null); // Clear any previous errors
            navigate('/login'); // Redirect to login page after successful signup
        },
        onError: (err) => {
            // Display a user-friendly message based on the API response/error object
            // e.g., 'username already exists' error from the backend
            setError(err.message || 'Failed to sign up. Please try again.');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please fill in both username and password.');
            return;
        }

        // Pass the state values explicitly to the mutation function
        signupMutation.mutate({ username, password });
    };

    const isSubmitting = signupMutation.isPending;
    const isDisabled = !username || !password || isSubmitting;

    return (
        <form onSubmit={handleSubmit} className="signup-form" aria-live="polite">
            <nav>
                <Link to="/">Back to main page</Link>
            </nav>
            <hr />
            <h1>Create a New Account</h1>

            {error && <div className="error-message" role="alert" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {isSubmitting && <div className="loading-message">Signing up...</div>}


            <div className="form-group">
                <label htmlFor="signup-username">Username:</label>
                <input
                    type="text"
                    name="username"
                    id="signup-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-required="true"
                    disabled={isSubmitting}
                />
            </div>
            <br />
            <div className="form-group">
                <label htmlFor="signup-password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="signup-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-required="true"
                    disabled={isSubmitting}
                />
            </div>
            <br />
            <button
                type="submit"
                disabled={isDisabled}
            >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
        </form>
    );
};