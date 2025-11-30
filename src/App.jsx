import React from 'react';
import { AuthContextProvider } from './contexts/AuthContext.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Blog } from './pages/Blog.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';

// Initialize the React Query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Sensible defaults for queries (e.g., refetch on window focus is often useful)
      // staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// A simple layout component to provide a consistent structure/error boundary for nested routes
function AppLayout() {
    return (
        // Outlet renders the matched child route component (<Blog />, <Login />, etc.)
        <Outlet /> 
    );
}

// A simple error element for routes that fail to load or do not exist
function ErrorPage() {
    return (
        <div style={{ padding: '20px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <a href="/">Go to the home page</a>
        </div>
    );
}

// Define the application routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Use the layout wrapper
    errorElement: <ErrorPage />, // Global error boundary for routing issues
    children: [
        {
            index: true, // Matches the parent path '/'
            element: <Blog />,
        },
        {
            path: 'login',
            element: <Login />,
        },  
        {
            path: 'signup',
            element: <Signup />,
        },
    ],
  },
]);

/**
 * The main application entry component that sets up global contexts and routing.
 */
export function App() {
  return (
    // Wrap the entire application with QueryClientProvider and AuthContextProvider
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

// Use 'export default App' for consistency with some project setups, but 'export function App' above is fine too.
export default App;
