const User = require('../models/userModel');

// create
const create = async (data) => {
  try {
    const newData = new User(data);
    await newData.save();
    return newData;
  } catch(e) {
    return false;
  }
};

// list
const getAll = async() => {
  const data = await User.find();
  return data;
};

// update
const update = async(id, data) => {
  const updateData = await User.findOneAndUpdate(id, data);
  return updateData;
};

// delete
const deleteOne = async(id) => {
  const data = await User.findByIdAndDelete(id);
  return data;
};

// find specific data
const getOne = async(id) => {
  const data = await User.findById(id);
  return data;
};

module.exports = { create, update, getAll, deleteOne, getOne };
