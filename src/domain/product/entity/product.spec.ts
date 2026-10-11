import NotificationError from "../../@shared/notification/notification.error";
import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      const product = new Product("123", "Name", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should accumulate multiple errors in the notification", () => {
    try {
      new Product("123", "", -1);
      fail("expected NotificationError");
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationError);
      const notificationError = error as NotificationError;
      expect(notificationError.errors).toHaveLength(2);
      expect(notificationError.errors).toEqual(
        expect.arrayContaining([
          { context: "product", message: "Name is required" },
          { context: "product", message: "Price must be greater than zero" },
        ])
      );
    }
  });

  it("should keep errors in notification without interrupting the flow", () => {
    const product = new Product("123", "Product 1", 100);

    product.changeName("");
    product.changePrice(-1);

    expect(product.notification.hasErrors()).toBe(true);
    expect(product.notification.getErrors()).toEqual(
      expect.arrayContaining([
        { context: "product", message: "Name is required" },
        { context: "product", message: "Price must be greater than zero" },
      ])
    );
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
