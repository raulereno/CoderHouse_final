const productSchema = require("./../../models/product.model");
const ProductDAO = require("../products.dao");

const productDao = new ProductDAO();

class ProductRepository {
  async getAllProducts(filter, user) {
    const result = await productDao.getAllProducts(filter, user);
    return result;
  }

  async getOneProduct(pid) {
    const result = await productDao.getOneProduct(pid);
    return result;
  }

  async createOneProduct(product, owner) {
    const result = await productDao.createOneProduct(product, owner);
    return result;
  }

  async createManyProducts(products) {
    const result = await productDao.createManyProducts(products);
    return result;
  }

  async updateProduct(pid, product, user) {

    try {
      const result = await productDao.updateProduct(pid, product, user);
      return result;
    } catch (error) {
      throw Error(error)
    }

  }

  async deleteProduct(pid, user) {
    const result = await productDao.deleteProduct(pid, user);
    return result;
  }
}

module.exports = ProductRepository;
