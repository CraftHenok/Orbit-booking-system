const fs = require('fs');

// Create and write to file
const fileName = "State.txt";

exports.createFile = () => {
  fs.appendFile(fileName, (new Date()).toString(), (err) => {
    if (err) throw err;
    console.log("state manager file created");
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


