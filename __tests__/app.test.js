const request = require("supertest");
const glob = require("glob-promise");
const path = require("path");

const { app } = require("../app");
const {
  getUrlsFromMarkdownPaths,
  resolveResponsesFromUrls,
  convertMarkdownTitleToH1Tag,
} = require("../utils/testing");

const CONTENT_FILES_PATTERN = "content/**/*.md";

describe("app", () => {
  it("should return 200 status code when URL is valid", async () => {
    const files = await glob(CONTENT_FILES_PATTERN);
    const urls = getUrlsFromMarkdownPaths(files);
    const resolvedResponses = await resolveResponsesFromUrls(urls, app);

    resolvedResponses.forEach((res) => {
      expect(res.status).toBe(200);
    });
  });

  it("should return HTML from relevant markdown file in response body when URL is valid", async () => {
    const relativePaths = await glob(CONTENT_FILES_PATTERN);
    const absolutePaths = relativePaths.map((name) => path.resolve(name));

    const urls = getUrlsFromMarkdownPaths(relativePaths);
    const resolvedResponses = await resolveResponsesFromUrls(urls, app);

    resolvedResponses.forEach((response, i) => {
      const h1Tag = convertMarkdownTitleToH1Tag(absolutePaths[i]);
      // Note: I am only verifying that the markdown title is included in the HTML. I think this should give us enough confidence.
      expect(response.text).toMatch(h1Tag);
    });
  });

  it("should return 404 status code when URL is invalid", async () => {
    const res = await request(app).get("/i-am-invalid-url");

    expect(res.status).toBe(404);
  });
});
