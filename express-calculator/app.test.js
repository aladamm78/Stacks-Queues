const request = require("supertest");
const app = require("./index");

describe("Test /mean route", () => {
  test("It should calculate the mean", async () => {
    const response = await request(app).get("/mean?nums=1,2,3,4");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "mean", value: 2.5 });
  });

  test("It should return error for NaN input", async () => {
    const response = await request(app).get("/mean?nums=1,2,foo");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "foo is not a number." });
  });

  test("It should return error for missing nums", async () => {
    const response = await request(app).get("/mean");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ error: "nums are required." });
  });
});

describe("Test /median route", () => {
  test("It should calculate the median", async () => {
    const response = await request(app).get("/median?nums=1,3,2,4");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "median", value: 2.5 });
  });
});

describe("Test /mode route", () => {
  test("It should calculate the mode", async () => {
    const response = await request(app).get("/mode?nums=1,2,2,3");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ operation: "mode", value: 2 });
  });
});
