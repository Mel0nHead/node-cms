const express = require("express");
const { marked } = require("marked");

const port = 3000;
const app = express();

const fs = require("fs");
const path = require("path");

app.get("*", (req, res) => {
  const pathName = path.join(__dirname, "/content", req.path, "/index.md");

  fs.readFile(pathName, "utf8", (e, data) => {
    if (e) {
      res.send(e.message);
    } else {
      const html = marked.parse(data);
      res.send(html);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
