import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({ name: "Product 1", price: 100 });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(100);
    expect(response.body.id).toBeDefined();
  });

  it("should return all validation errors at once", async () => {
    const response = await request(app)
      .post("/product")
      .send({ name: "", price: -1 });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        { context: "product", message: "Name is required" },
        { context: "product", message: "Price must be greater than zero" },
      ])
    );
  });
});
