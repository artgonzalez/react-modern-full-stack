import { createUser, loginUser, getUserInfoById } from '../services/users.js'

const signup = async (req, res) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ username: user.username });
  } catch (err) {
    console.error('Signup error:', err.message);
    // Use 409 Conflict if the username already exists is the specific error
    return res.status(400).json({
      error: 'failed to create the user, does the username already exist?'
    });
  }
};

const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    return res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(400).json({
      error: 'login failed, did you enter the correct username/password?'
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userInfo = await getUserInfoById(req.params.id);

    if (!userInfo) {
      // Use 404 Not Found if the user doesn't exist
      return res.status(404).json({
        error: 'User not found'
      });
    }
    return res.status(200).json(userInfo);
  } catch (err) {
    console.error('Get user info error:', err.message);
    // Catch unexpected internal errors (e.g., database connection issues)
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

export function userRoutes(app) {
  app.post('/api/v1/user/signup', signup);
  app.post('/api/v1/user/login', login);
  app.get('/api/v1/users/:id', getUserById);    
};