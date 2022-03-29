const express = require("express");
const { marked } = require("marked");

const fs = require("fs");
const path = require("path");

const PORT = 3000;
const app = express();

app.set("view engine", "html");
app.set("views", __dirname);
app.engine("html", require("hbs").__express);

app.get("*", (req, res) => {
  // TODO: maybe try to extract out into function?
  const pathName = path.join(__dirname, "/content", req.path, "/index.md");

  fs.readFile(pathName, "utf8", (err, data) => {
    if (err) {
      res.status(404);
      res.render("template", { content: "<h1>404 - Page not found</h1>" });
    } else {
      const html = marked.parse(data);
      res.status(200);
      res.render("template", { content: html });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = {
  app,
};
