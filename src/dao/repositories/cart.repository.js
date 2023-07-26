const CartDAO = require("../cart.dao");
const cartSchema = require("../../models/cart.model");

const cartDao = new CartDAO();

class CartRepository {
  async createCart() {
    let addCart = await cartDao.createCart();
    return addCart;
  }

  async getCartById(cid) {
    const cart = await cartDao.getCartById(cid);
    return cart;
  }

  async addProductToCart(cid, pid) {
    const result = await cartDao.addProductToCart(cid, pid);
    return result;
  }

  async deleteProductInCart(cid, pid) {
    const result = await cartDao.deleteProductInCart(cid, pid);
    return result;
  }

  async deleteCart(cid) {
    const result = await cartDao.deleteCart(cid);
    return result;
  }

  async addManyProductsToCart(products, cid) {
    const result = await cartDao.addManyProductsToCart(products, cid);
    return result;
  }

  async updateQuantityProduct(cid, pid, quantity) {
    const result = await cartDao.updateQuantityProduct(cid, pid, quantity);
    return result;
  }
}

module.exports = CartRepository;
