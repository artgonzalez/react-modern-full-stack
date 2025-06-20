import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Blog } from './pages/Blog.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Blog />,
  },
  {
    path: '/login',
    element: <Login />,
  },  
  {
    path: '/signup',
    element: <Signup />,
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
};

export default App;