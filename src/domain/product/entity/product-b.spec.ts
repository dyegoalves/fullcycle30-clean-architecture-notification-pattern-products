import NotificationError from "../../@shared/notification/notification.error";
import ProductB from "./product-b";

describe("ProductB unit tests", () => {
  it("should double the price", () => {
    const product = new ProductB("123", "Product B", 100);
    expect(product.price).toBe(200);
  });

  it("should accumulate multiple errors in the notification", () => {
    try {
      new ProductB("123", "", -1);
      fail("expected NotificationError");
    } catch (error) {
      expect(error).toBeInstanceOf(NotificationError);
      const notificationError = error as NotificationError;
      expect(notificationError.errors).toEqual(
        expect.arrayContaining([
          { context: "product", message: "Name is required" },
          { context: "product", message: "Price must be greater than zero" },
        ])
      );
    }
  });
});
