import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'

export function Header() {
    // Destructure the token and setToken function directly from the hook result
    const [token, setToken] = useAuth();

    if (token) {
        // Use optional chaining just in case the token is momentarily invalid
        const { sub } = jwtDecode(token); 
        
        return (
            <div>
                {/* Ensure the User component handles its own data fetching based on the ID */}
                Logged in as <b><User id={sub} /></b>
                <br />
                {/* Added accessibility label to the button */}
                <button onClick={() => setToken(null)} aria-label="Logout current user">
                    Logout
                </button>
            </div>
        );
    }

    // Default return block for the logged-out state
    return (
        <nav>
            <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
        </nav>
    );
};