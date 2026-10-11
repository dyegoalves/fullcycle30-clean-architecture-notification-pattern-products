import express, { Request, Response } from "express";
import NotificationError from "../../../domain/@shared/notification/notification.error";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const output = await usecase.execute({
      name: req.body.name,
      price: Number(req.body.price),
    });
    res.status(201).send(output);
  } catch (err) {
    if (err instanceof NotificationError) {
      return res.status(400).send({ errors: err.errors });
    }
    res.status(500).send(err);
  }
});
