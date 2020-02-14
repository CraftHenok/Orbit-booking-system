const fs = require('fs');
const path = require("path");

// Create and write to file
const fileName = "State.txt";

exports.createFile = () => {
  fs.appendFile(fileName, (new Date()).toString(), (err) => {
    if (err) throw err;
    console.log("file created");
  });
};


exports.createTables = () => {
  let createTable = true;
  try {
    if (fs.existsSync(fileName)) {
      //file exists
      createTable = false;
    }
  } catch (err) {
    console.error(err)
  }

  return createTable
};


