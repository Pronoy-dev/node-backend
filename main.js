const http = require("http");
const fs = require("fs");
const url = require("url");
const { studentList } = require("./data");
const mainPath = require("path");
const { count } = require("console");

const server = http.createServer(function (req, res) {
  const routes = url.parse(req.url);
  const { path, pathname } = routes;
  const { query } = url.parse(path);
  const queryId = parseInt(query?.split("=")[1]);
  let countFilePath = mainPath.join(__dirname, "count.txt");
  let statusFilePath = mainPath.join(__dirname, "status.txt");
  fs.readFile(countFilePath, "utf8", (err, data) => {
    let count = 0;
    if (!err && data) {
      count = parseInt(data, 10);
    }

    count++;

    fs.writeFile(countFilePath, count.toString(), (err) => {
      if (err) {
        return;
      }
      fs.appendFile(statusFilePath, `${count}) ${req.url} \n`, (err) => {
        if (err) {
          console.error("error");
        }
      });
    });
  });

  if (path == "/data") {
    const jsonStudentlist = JSON.stringify(studentList);
    res.end(jsonStudentlist);
  }

  if (path == "/product") {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        res.end(JSON.stringify(data));
      });
  }

  // get single product routes
  if (`${pathname}/?id=${query}` == `${pathname}/?id=${query}`) {
    fetch(`https://dummyjson.com/products/${queryId}`)
      .then((res) => res.json())
      .then((data) => {
        res.end(JSON.stringify(data));
      });
  }
});
server.listen(4000, () => {
  console.log("Server running on  4000 port");
});
