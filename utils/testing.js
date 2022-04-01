const request = require("supertest");
const fs = require("fs");
const { marked } = require("marked");

const getUrlsFromMarkdownPaths = (filePaths) => {
  return filePaths.map((p) => p.replace(/^content|\/index\.md/g, ""));
};

const resolveResponsesFromUrls = async (urls, app) => {
  const responses = urls.map(async (url) => await request(app).get(url));
  return Promise.all(responses);
};

const convertMarkdownTitleToH1Tag = (filePath) => {
  const markdownData = fs.readFileSync(filePath, "utf8");
  const lines = markdownData.split("\n");
  return marked.parse(lines[0]);
};

module.exports = {
  getUrlsFromMarkdownPaths,
  resolveResponsesFromUrls,
  convertMarkdownTitleToH1Tag,
};
