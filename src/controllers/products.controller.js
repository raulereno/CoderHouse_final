const ValidationError = require("../dao/errors/ValidationError");
const {
  getProductsService,
  updateProductService,
  createOneProductService,
  createManyProductsService,
  deleteProductService,
} = require("../services/products.service");
const { findUserService } = require("../services/user.service")

const getAllProducts = async (req, res, next) => {
  try {
    const user = await findUserService(req.user);
    const products = await getProductsService(req.query, req.user);

    res.render("home", {
      title: "Desafio - Productos",
      style: "index.css",
      user: user,
      products: products,
    });
  } catch (error) {
    next(error)
  }

};

const getOneProduct = async (req, res, next) => {
  try {
    const result = await updateProductService(req.params, req.body);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    next(error)
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const result = await updateProductService(req.params, req.body, req.user.email);
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    next(error)
  }
};
const createOneProduct = async (req, res, next) => {
  try {
    const result = await createOneProductService(req.body, req.user.email);
    res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    next(error);
  }
};

const createManyProducts = async (req, res, next) => {
  try {
    const result = await createManyProductsService();
    res.status(200).send({ status: "success", payload: result });
  } catch (error) {
    next(error)
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await deleteProductService(req.params, req.user.email);
    res.status(200).json({ status: "success", payload: "Product deleted" });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createOneProduct,
  createManyProducts,
  updateProduct,
  deleteProduct,
};
