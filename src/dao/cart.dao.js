const mongoose = require("mongoose");
const Cart = require("./../models/cart.model");
class CartDAO {
  constructor() {
    this.cartCollection = Cart;
  }

  async createCart() {
    const result = await this.cartCollection.create({});

    return result;
  }
  async getCartById(cid) {
    const result = await this.cartCollection
      .findOne({ _id: cid })
      .populate({
        path: "products.product",

      })
      .lean();


    return result;
  }

  async addProductToCart(cid, pid) {
    const cart = await this.cartCollection.findOne({ _id: cid });

    const productId = new mongoose.Types.ObjectId(pid);

    const findProduct = cart.products.find((product) =>
      product.product.equals(productId)
    );

    if (findProduct) {
      findProduct.quantity++;
    } else {
      cart.products.push({ product: pid });
    }
    await cart.save();

    return cart;
  }

  async deleteProductInCart(cid, pid) {
    let cart = await this.cartCollection.findOne({ _id: cid });
    const productId = new mongoose.Types.ObjectId(pid);
    const index = cart.products.findIndex((product) =>
      product.product.equals(productId)
    );

    cart.products.splice(index, 1);

    cart.save();

    return cart;
  }

  async deleteCart(cid) {
    const cart = await this.cartCollection.findOne({ _id: cid });

    cart.products = [];

    cart.save();
    return cart;
  }

  async addManyProductsToCart(products, cid) {
    const cart = await this.cartCollection.findOne({ _id: cid });

    const aux = products.map((product) => {
      return { product: product.id };
    });

    cart.products = cart.products.concat(aux);

    cart.save();

    return cart;
  }

  async updateQuantityProduct(cid, pid, quantity) {
    const cart = await this.cartCollection.findOne({ _id: cid });
    const productId = new mongoose.Types.ObjectId(pid);

    if (quantity === 0) {
      const index = cart.products.findIndex((product) =>
        product.product.equals(productId)
      );

      cart.products.splice(index, 1);
    } else {
      const findProduct = cart.products.find((product) =>
        product.product.equals(productId)
      );
      findProduct.quantity = quantity;
    }

    await cart.save();

    return cart;
  }
}

module.exports = CartDAO;
