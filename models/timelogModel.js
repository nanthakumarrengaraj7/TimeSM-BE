const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    username: { type: String, require: true },
    date: { type: Date, require: true },
    projectname: { type: String, require: true },
    task: { type: String, require: true },
    hours: { type: Number, require: true },
    taskstatus: { type: String, require: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TimeLog', timeLogSchema);