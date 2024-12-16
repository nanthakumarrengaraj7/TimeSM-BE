const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Register Logic
const registerUser = async (username, email, password, usertype) => {
    const existingUser = await User.findOne({username});

    if(existingUser){
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, email, password: hashedPassword, usertype});

    await newUser.save();
    return newUser;
};

const loginUser = async (username) => {
    const user = await User.findOne({ username });
    return user;
  };

module.exports = { registerUser, loginUser };