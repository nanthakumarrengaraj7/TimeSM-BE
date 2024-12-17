const authService = require('../services/authService');
const token = require('../authendication/generateToken');

// register
const register = async (req, res) => {
  try {
    const { username, email, password, usertype } = req.body;
    const newUser = await authService.registerUser(username, email, password, usertype);
    const accessToken = await token.generateToken(newUser);
    const newUserObj = newUser.toObject();
    newUserObj.accessToken = accessToken;
    res.status(201).json({ message: 'User registered successfully', user: newUserObj });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userDetails = await authService.loginUser(username);

    if (!userDetails) return res.status(400).json({ message: 'Invalid username or password' });

    const isPasswordValid = await userDetails.comparePassword(password);

    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password' });

    const accessToken = await token.generateToken(userDetails);

    const newUserObj = userDetails.toObject();

    newUserObj.accessToken = accessToken;
    res.status(200).json({ message: 'Login successful', newUserObj });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = { register, login };
