const http = require("http");
const date = require("./date");
const url = require("url");
const fs = require("fs");

/**
 * Creating a basic node.js server and serving a HTML file.
 *
 * @param {Object} req
 * @param {Object} res
 */

const server = http.createServer((req, res) => {
  console.log(url.parse(req.url).query);
  fs.readFile("form.html", (err, done) => {
    if (err) throw err;
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write(done);
    return res.end();
  });
});

server.listen(3000, () => {
  console.log(date().getTime());
  console.log("Server ready");
});

