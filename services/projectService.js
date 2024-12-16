const Project = require('../models/projectModel');

// getAllProject
const getAllProject = async() => {
  const data = await Project.find();
  return data;
};

// getOneProjectById
const getOneProjectById = async(id) => {
  const data = await Project.findById(id);;
  return data;
};

// addProject
const addProject = async(data) => {
  try {
    const newData = new Project(data);
    await newData.save();
    return newData;
  } catch(e) {
    return false;
  }
};

// assignNewuser
const assignNewUser = async(id, data) => {
  const updateData = await Project.findOneAndUpdate({_id: id}, {assignedUsers:data});
  return updateData;
};

// assignNewTask
const assignNewTask = async(id, data) => {
  const updateData = await Project.findOneAndUpdate({_id: id}, {tasks:data});
  return updateData;
};

// updateProject
const updateProject = async(id, data) => {
  const updateData = await Project.findOneAndUpdate(id, data);
  return updateData;
};

// searchProject
// filterProject
// deleteProjectById
const deleteProjectById = async(id) => {
  const data = await Project.findByIdAndDelete(id);
  return data;
};


module.exports = { getAllProject, getOneProjectById, addProject, assignNewUser, assignNewTask, updateProject, deleteProjectById };