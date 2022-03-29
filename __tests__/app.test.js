const request = require("supertest");
const { app } = require("../app");

describe("app", () => {
  // TODO: tests should still pass even if content is moved/changed
  it("should return 200 status code when URL is valid", async () => {
    const res = await request(app).get("/blog/june/company-update");

    expect(res.status).toBe(200);
  });

  it.only("should return HTML in response body when URL is valid", async () => {
    const res = await request(app).get("/jobs");

    // TODO: the response body should be HTML
    expect(res).toEqual({});
  });

  it("should return 404 status code when URL is invalid", async () => {
    const res = await request(app).get("/i-am-invalid-url");

    expect(res.status).toBe(404);
  });
});
