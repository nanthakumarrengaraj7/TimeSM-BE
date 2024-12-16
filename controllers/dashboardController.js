const dashboardService = require('../services/dashboardService');
const projectService = require('../services/projectService');
const mongoose = require('mongoose');

const pva = async (req, res) => {
  try {
    const data = [];
    const plannedData = await projectService.getAllProject();
    plannedData.forEach(element => {
      let name = element.projectName;
      let plannedHours = element.tasks.reduce((sum, log) => sum + Number(log.plannedHours), 0);
      const PlannedObject = {
        type: 'Planned',
        name: name,
        value: plannedHours
      }
      data.push(PlannedObject)
    });

    const actualData = await dashboardService.listLogByProject();
    actualData.forEach(element => {
      let name = element.logs[0].projectname;
      let actualHours = element.logs.reduce((sum, log) => sum + Number(log.hours), 0);
      const ActualObject = {
        type: 'Actual',
        name: name,
        value: actualHours
      }
      data.push(ActualObject);
    });
    console.log(data);
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
      const data = await dashboardService.listLog();
      res.status(200).json({ data });
    } else if (type == 'Week') {
      let allData;
      const data = [];
      const firstDayOfWeek = new Date(now);
      firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
      startDate = firstDayOfWeek;
      endDate = new Date(firstDayOfWeek);
      endDate.setDate(firstDayOfWeek.getDate() + 7); // End of the week
      allData = await dashboardService.listLogByDate(startDate, endDate);
      allData.forEach((element, index) => {
        const projectnameArray = element.logs.map(item => item.projectname);
        const taskArray = element.logs.map(item => item.task);
        const taskstatusArray = element.logs.map(item => item.taskstatus);
        const totalHours = element.logs.reduce((sum, log) => sum + Number(log.hours), 0);
        Usersdata = 
          {
            username: element._id,
            date: 'Week',
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
      allData = await dashboardService.listLogByDate(startDate, endDate);
      allData.forEach((element, index) => {
        const projectnameArray = element.logs.map(item => item.projectname);
        const taskArray = element.logs.map(item => item.task);
        const taskstatusArray = element.logs.map(item => item.taskstatus);
        const totalHours = element.logs.reduce((sum, log) => sum + Number(log.hours), 0);
        Usersdata = 
          {
            username: element._id,
            date: 'Month',
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
      allData = await dashboardService.listLogByDate(startDate, endDate);
      allData.forEach((element, index) => {
        const projectnameArray = element.logs.map(item => item.projectname);
        const taskArray = element.logs.map(item => item.task);
        const taskstatusArray = element.logs.map(item => item.taskstatus);
        const totalHours = element.logs.reduce((sum, log) => sum + Number(log.hours), 0);
        Usersdata = 
          {
            username: element._id,
            date: 'Year',
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
      data = await dashboardService.listLogById(id);
    } else if (type == 'Week') {
      const firstDayOfWeek = new Date(now);
      firstDayOfWeek.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
      startDate = firstDayOfWeek;
      endDate = new Date(firstDayOfWeek);
      endDate.setDate(firstDayOfWeek.getDate() + 7); // End of the week
      data = await dashboardService.listLogByIdAndDate(id, startDate, endDate);
      const projectnameArray = data.map(item => item.projectname);
      const taskArray = data.map(item => item.task);
      const taskstatusArray = data.map(item => item.taskstatus);
      const totalHours = data.reduce((sum, log) => sum + Number(log.hours), 0);
      data = [
        {
          username: data[0].username,
          date: 'Week',
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
      data = await dashboardService.listLogByIdAndDate(id, startDate, endDate);
      const projectnameArray = data.map(item => item.projectname);
      const taskArray = data.map(item => item.task);
      const taskstatusArray = data.map(item => item.taskstatus);
      const totalHours = data.reduce((sum, log) => sum + Number(log.hours), 0);
      data = [
        {
          username: data[0].username,
          date: 'Month',
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
      data = await dashboardService.listLogByIdAndDate(id, startDate, endDate);
      const projectnameArray = data.map(item => item.projectname);
      const taskArray = data.map(item => item.task);
      const taskstatusArray = data.map(item => item.taskstatus);
      const totalHours = data.reduce((sum, log) => sum + Number(log.hours), 0);
      data = [
        {
          username: data[0].username,
          date: 'Year',
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

module.exports = { listTimeLog, listTimeLogById, pva };
