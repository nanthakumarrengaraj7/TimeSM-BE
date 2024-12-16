const userService = require('../services/userService');
const mongoose = require('mongoose');

const getUser = async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const data = await userService.create(req.body);
    if(data){
      res.status(200).json({ message: 'Created', data: data });
    } else {
      res.status(500).json({ message: 'User not created' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const id  = new mongoose.Types.ObjectId(req.params);
    const data = await userService.update(id, req.body);
    res.status(200).json({ message: 'Updated Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const id  = new mongoose.Types.ObjectId(req.params);
    const data = await userService.deleteOne(id);
    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const id  = new mongoose.Types.ObjectId(req.params);
    const data = await userService.getOne(id);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, addUser, editUser, deleteUser, getUserById }
