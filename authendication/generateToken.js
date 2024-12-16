const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = async (user) => {

    // Payload for the token
    const payload = {
      userId: user._id, 
      username: user.username, 
      usertype: user.usertype
    };
    
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    
    return accessToken;
};

module.exports = { generateToken };
