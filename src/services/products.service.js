const products = require("../../products");
const ProductRepository = require("../dao/repositories/product.repository");

const productRepository = new ProductRepository();

const getProductsService = async (filters, user) => {
  try {
    const products = await productRepository.getAllProducts(filters, user);
    return products;
  } catch (error) {
    throw Error(error);
  }
};

const getOneProductService = async (pid) => {
  try {
    const product = await productRepository.getOneProduct(pid);
    return product;
  } catch (error) {
    throw Error(error);
  }
};

const createProductService = async (product) => {
  try {
    const products = await productRepository.createProduct(product);
    return products;
  } catch (error) {
    throw Error(error);
  }
};
const createManyProductsService = async () => {
  try {
    const result = await productRepository.createManyProducts(products);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

const updateProductService = async ({ pid }, product, user) => {
  try {
    if (!product.image) delete product.image;
    const result = await productRepository.updateProduct(pid, product, user);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const createOneProductService = async (product, owner) => {
  try {
    const result = await productRepository.createOneProduct(product, owner);
    return result;
  } catch (error) {
    throw Error(error);
  }
};
const deleteProductService = async ({ pid }, user) => {
  try {
    const result = await productRepository.deleteProduct(pid, user);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getProductsService,
  getOneProductService,
  createProductService,
  createManyProductsService,
  updateProductService,
  createOneProductService,
  deleteProductService,
};
