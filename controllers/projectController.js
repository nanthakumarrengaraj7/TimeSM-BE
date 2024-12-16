const projectService = require('../services/projectService');
const mongoose = require('mongoose');

// getProject
const getProject = async (req, res) => {
  try {
    const data = await projectService.getAllProject();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getProjectById
const getProjectById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const id = new mongoose.Types.ObjectId(req.params);
    const data = await projectService.getOneProjectById(id);
    res.status(200).json({ message: 'Created', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createProject
const createProject = async (req, res) => {
  try {
    const data = await projectService.addProject(req.body);
    if(data){
      res.status(200).json({ message: 'Created', data: data });
    } else {
      res.status(500).json({ message: 'Project not created' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// assignUser
const assignUser = async (req, res) => {
  try {
    const { projectId, userIds } = req.body;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    const project = await projectService.getOneProjectById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const data= await projectService.assignNewUser(projectId,userIds);
    res.status(200).json({ message: 'Users assigned successfully',  data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// assignTask
const assignTask= async (req, res) => {
  try {
    const { projectId, tasks } = req.body;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }
    // Find project by ID
    const project = await projectService.getOneProjectById(projectId);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    // Assign tasks to project
    const combineTasks = [...project.tasks, ...tasks];
    const data= await projectService.assignNewTask(projectId,combineTasks);
    // Return success response with updated project
    res.status(200).json({ message: 'Tasks assigned successfully', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// editProject
const editProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const id = new mongoose.Types.ObjectId(req.params);
    const data = await projectService.updateProject(id,req.body);
    if (!data) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Updated successfully', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// searchProject
// filterProject
// deleteProject
const deleteProject = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const id = new mongoose.Types.ObjectId(req.params);
    await projectService.deleteProjectById(id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { getProject, getProjectById, createProject, assignUser, assignTask, editProject, deleteProject };