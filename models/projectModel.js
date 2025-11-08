const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, require: true },
    clientName: { type: String, require: true },
    address: { type: String, require: true },
    department: { type: String, require: true },
    businessUnit: { type: String, require: true },
    projectType: { type: String, require: true },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }],
    tasks: [{
        taskName: { type: String, require: true },
        plannedHours: { type: Number, require: true }
      }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);