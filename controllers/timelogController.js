const timeLogService = require('../services/timelogService');
const mongoose = require('mongoose');

const createTimeLog = async (req, res) => {
  try {
    const data = timeLogService.createLog(req.body);
    res.status(200).json({ message: 'Created', data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listTimeLog = async (req, res) => {
  try {
    const type = req.body.type || 'Day';
    let startDate, endDate;

    const now = new Date(); // Current date
    if(type == 'Day'){
      const data = await timeLogService.listLog();
      res.status(200).json({ data });
    } else if (type == 'Week') {
      let allData;
      const data = [];
      const firstDayOfWeek = new Date(now);
      firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
      startDate = firstDayOfWeek;
      endDate = new Date(firstDayOfWeek);
      endDate.setDate(firstDayOfWeek.getDate() + 7); // End of the week
      allData = await timeLogService.listLogByDate(startDate, endDate);
      allData.forEach((element, index) => {
        const projectnameArray = element.logs.map(item => item.projectname);
        const taskArray = element.logs.map(item => item.task);
        const taskstatusArray = element.logs.map(item => item.taskstatus);
        const totalHours = element.logs.reduce((sum, log) => sum + Number(log.hours), 0);
        Usersdata = 
          {
            username: element._id,
            date: 'Last Week',
            projectname: projectnameArray,
            task: taskArray,
            taskstatus: taskstatusArray,
            hours: totalHours
          }
        
        data.push(Usersdata);
      });
      res.status(200).json({ data });
    } else if (type == 'Month') {
      let allData;
      const data = [];
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the month
      startDate = firstDayOfMonth;
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of the month
      allData = await timeLogService.listLogByDate(startDate, endDate);
      allData.forEach((element, index) => {
        const projectnameArray = element.logs.map(item => item.projectname);
        const taskArray = element.logs.map(item => item.task);
        const taskstatusArray = element.logs.map(item => item.taskstatus);
        const totalHours = element.logs.reduce((sum, log) => sum + Number(log.hours), 0);
        Usersdata = 
          {
            username: element._id,
            date: 'Last Month',
            projectname: projectnameArray,
            task: taskArray,
            taskstatus: taskstatusArray,
            hours: totalHours
          }
        
        data.push(Usersdata);
      });
      res.status(200).json({ data });
    } else if (type == 'Year') {
      let allData;
      const data = [];
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1); // Start of the year
      startDate = firstDayOfYear;
      endDate = new Date(now.getFullYear(), 11, 31); // End of the year
      allData = await timeLogService.listLogByDate(startDate, endDate);
      allData.forEach((element, index) => {
        const projectnameArray = element.logs.map(item => item.projectname);
        const taskArray = element.logs.map(item => item.task);
        const taskstatusArray = element.logs.map(item => item.taskstatus);
        const totalHours = element.logs.reduce((sum, log) => sum + Number(log.hours), 0);
        Usersdata = 
          {
            username: element._id,
            date: 'Last Year',
            projectname: projectnameArray,
            task: taskArray,
            taskstatus: taskstatusArray,
            hours: totalHours
          }
        
        data.push(Usersdata);
      });
      res.status(200).json({ data });
    } else {
      throw new Error('Invalid type. Use "Day", "week", "month", or "year".');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listTimeLogById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const id  = new mongoose.Types.ObjectId(req.params);
    const type = req.body.type || 'Day';
    let startDate, endDate;

    const now = new Date(); // Current date

    let data;
    if(type == 'Day'){
      data = await timeLogService.listLogById(id);
    } else if (type == 'Week') {
      const firstDayOfWeek = new Date(now);
      firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
      startDate = firstDayOfWeek;
      endDate = new Date(firstDayOfWeek);
      endDate.setDate(firstDayOfWeek.getDate() + 7); // End of the week
      data = await timeLogService.listLogByIdAndDate(id, startDate, endDate);
      const projectnameArray = data.map(item => item.projectname);
      const taskArray = data.map(item => item.task);
      const taskstatusArray = data.map(item => item.taskstatus);
      const totalHours = data.reduce((sum, log) => sum + Number(log.hours), 0);
      data = [
        {
          username: data[0].username,
          date: 'Last Week',
          projectname: projectnameArray,
          task: taskArray,
          taskstatus: taskstatusArray,
          hours: totalHours
        }
      ]
    } else if (type == 'Month') {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // Start of the month
      startDate = firstDayOfMonth;
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // End of the month
      data = await timeLogService.listLogByIdAndDate(id, startDate, endDate);
      const projectnameArray = data.map(item => item.projectname);
      const taskArray = data.map(item => item.task);
      const taskstatusArray = data.map(item => item.taskstatus);
      const totalHours = data.reduce((sum, log) => sum + Number(log.hours), 0);
      data = [
        {
          username: data[0].username,
          date: 'Last Month',
          projectname: projectnameArray,
          task: taskArray,
          taskstatus: taskstatusArray,
          hours: totalHours
        }
      ]
    } else if (type == 'Year') {
      const firstDayOfYear = new Date(now.getFullYear(), 0, 1); // Start of the year
      startDate = firstDayOfYear;
      endDate = new Date(now.getFullYear(), 11, 31); // End of the year
      data = await timeLogService.listLogByIdAndDate(id, startDate, endDate);
      const projectnameArray = data.map(item => item.projectname);
      const taskArray = data.map(item => item.task);
      const taskstatusArray = data.map(item => item.taskstatus);
      const totalHours = data.reduce((sum, log) => sum + Number(log.hours), 0);
      data = [
        {
          username: data[0].username,
          date: 'Last Year',
          projectname: projectnameArray,
          task: taskArray,
          taskstatus: taskstatusArray,
          hours: totalHours
        }
      ]
    } else {
      throw new Error('Invalid type. Use "Day", "week", "month", or "year".');
    }
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listTimeLog, listTimeLogById, createTimeLog };
