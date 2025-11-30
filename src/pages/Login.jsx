import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query'; // Added useQueryClient for potential future use (e.g., invalidating post lists upon login)
import { useNavigate, Link } from 'react-router-dom';

import { login } from '../api/users.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for displaying specific errors

  const navigate = useNavigate();
  const [, setToken] = useAuth();
  const queryClient = useQueryClient(); // Optional: used if you need to invalidate other queries on successful login

  const loginMutation = useMutation({
    mutationFn: (credentials) => login(credentials), // Pass credentials as an argument to mutate
    onSuccess: (data) => {
      setToken(data.token);
      setError(null); // Clear any previous errors
      // Optional: Invalidate queries to refresh data that requires auth
      queryClient.invalidateQueries({ queryKey: ['posts'] }); 
      navigate('/');
    },
    onError: (err) => {
      // Display a user-friendly message based on the API response/error object
      setError(err.message || 'Login failed due to a network error.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
        setError('Please enter both username and password.');
        return;
    }
    // Pass the state values explicitly to the mutation function
    loginMutation.mutate({ username, password });
  };

  const isSubmitting = loginMutation.isPending;
  const isDisabled = !username || !password || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="login-form" aria-live="polite">
      <nav>
        <Link to="/">Back to main page</Link>
      </nav>
      <hr />
      <h1>Login to Your Account</h1>

      {error && <div className="error-message" role="alert" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {isSubmitting && <div className="loading-message">Logging in...</div>}


      <div className="form-group">
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          name="username" // Changed name to 'username' for consistency
          id="login-username" // Changed ID for clarity
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-required="true"
          disabled={isSubmitting}
        />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="login-password">Password:</label>
        <input
          type="password"
          name="password" // Changed name to 'password'
          id="login-password" // Changed ID for clarity
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
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};