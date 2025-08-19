const request = require("supertest");
const app = require("../app");

describe("Currency API", () => {
  it("GET / should return welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Currency Conversion API");
  });
});