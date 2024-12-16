const Log = require('../models/timelogModel');

// create
const createLog = async (data) => {
  const newData = new Log(data);
  await newData.save();
  return newData;
};

// read
const listLog = async() => {
  const data = await Log.find();
  return data;
};

const listLogByProject = async() => {
  const data = await Log.aggregate([
    {
      $group: {
        _id: "$projectname", // Group by the "projectname" field
        logs: { $push: "$$ROOT" } // Push all the data for each group into an array
      }
    }
  ]);
  return data
}

// read by date
const listLogByDate = async(startDate, endDate) => {
  const data = await Log.aggregate([
    {
      $match: {
        date: {
          $gte: startDate, // Start date for filtering
          $lte: endDate    // End date for filtering
        }
      }
    },
    {
      $group: {
        _id: "$username", // Group by the "username" field
        logs: { $push: "$$ROOT" } // Push all the data for each group into an array
      }
    }
  ]);  
  return data;
};

// find specific one
const listLogById = async(id) => {
  const data = await Log.find({userid: id});
  return data;
};

// find specific one by date
const listLogByIdAndDate = async(id, startDate, endDate) => {
  const data = await Log.find({userid: id, date: {
    $gte: startDate, // Greater than or equal to the start date
    $lte: endDate,   // Less than or equal to the end date
  }});
  return data;
};

module.exports = { createLog, listLog, listLogByDate, listLogById, listLogByIdAndDate, listLogByProject };
