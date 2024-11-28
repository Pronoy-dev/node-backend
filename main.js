const { log } = require("console");
const path = require("path");
const fs = require("fs");
const urlPath = "C:\\temp\\myfile.html";

const pathName = path.join(__dirname, "image/temp.txt");
const rightPath = path.normalize(pathName);

fs.writeFile(rightPath, "some text here", (err) => {
  if (err) {
    return;
  }
});
