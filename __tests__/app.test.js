const request = require("supertest");
const glob = require("glob-promise");

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const { app } = require("../app");

const getValidUrls = async () => {
  const files = await glob("content/**/*.md");
  return files.map((f) => f.replace(/^content|\/index\.md/g, ""));
};

describe("app", () => {
  it("should return 200 status code when URL is valid", async () => {
    const urls = await getValidUrls();
    const responses = urls.map(async (url) => await request(app).get(url));
    const resolvedResponses = await Promise.all(responses);

    resolvedResponses.forEach((res) => {
      expect(res.status).toBe(200);
    });
  });

  it("should return HTML from relevant markdown file in response body when URL is valid", async () => {
    const relativePaths = await glob("content/**/*.md");
    const absolutePaths = relativePaths.map((name) => path.resolve(name));

    const urls = relativePaths.map((p) =>
      p.replace(/^content|\/index\.md/g, "")
    );
    const responses = urls.map(async (url) => await request(app).get(url));
    const resolvedResponses = await Promise.all(responses);

    resolvedResponses.forEach((response, i) => {
      const pathToMarkdownFile = absolutePaths[i];
      const markdownData = fs.readFileSync(pathToMarkdownFile, "utf8");
      const lines = markdownData.split("\n");
      const h1Tag = marked.parse(lines[0]);
      expect(response.text).toMatch(h1Tag);
    });
  });

  it("should return 404 status code when URL is invalid", async () => {
    const res = await request(app).get("/i-am-invalid-url");

    expect(res.status).toBe(404);
  });
});
