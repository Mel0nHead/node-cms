const request = require("supertest");
const glob = require("glob-promise");

const fs = require("fs");

const { app } = require("../app");

const getValidUrls = async () => {
  const files = await glob("content/**/*.md");
  return files.map((f) => f.replace(/^content|\/index\.md/g, ""));
};

describe("app", () => {
  it.skip("should return 200 status code when URL is valid", async () => {
    const urls = getValidUrls();
    const responses = urls.map(async (url) => await request(app).get(url));
    const resolvedResponses = await Promise.all(responses);

    resolvedResponses.forEach((res) => {
      expect(res.status).toBe(200);
    });
  });

  it("should return HTML in response body when URL is valid", async () => {
    const res = await request(app).get("/jobs");
    const fileData = fs.readFileSync("", "utf8");

    // TODO: the response body should be HTML
    expect(res).toEqual({});
  });

  it.skip("should return 404 status code when URL is invalid", async () => {
    const res = await request(app).get("/i-am-invalid-url");

    expect(res.status).toBe(404);
  });
});
