const CartRepository = require("../dao/repositories/cart.repository");
const ProductRepository = require("../dao/repositories/product.repository");
const UserRepository = require("../dao/repositories/user.repository");

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const userRepository = new UserRepository()
const getCartService = async (username) => {
  try {
    //Uso los repositorios para evitar el error de dependencia circular
    const user = await userRepository.findUserByEmail(username)

    let result = await cartRepository.getCartById(user.cartId);

    //Elimino todos los productos que se han borrado
    result.products = result?.products?.filter(e => {
      if (e.product !== null) {
        return e
      }
    })

    return result;
  } catch (error) {
    throw Error(error);
  }
};



const createCartService = async () => {
  try {
    const result = await cartRepository.createCart();
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const addProductToCartService = async ({ cid, pid }) => {
  try {
    const cart = await cartRepository.getCartById(cid)
    const product = await productRepository.getOneProduct(pid)

    if (!product.stock) throw Error("Stock insuficiente")

    cart?.products.forEach(element => {
      if (element.product.stock <= element.quantity) {
        throw Error("Stock insuficiente")
      }
    });

    const result = await cartRepository.addProductToCart(cid, pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteProductInCartService = async (cid, pid) => {
  try {
    const result = await cartRepository.deleteProductInCart(cid, pid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const deleteCartService = async ({ cid }) => {
  try {
    const result = await cartRepository.deleteCart(cid);

    return result;
  } catch (error) {
    throw Error(error);
  }
};

const addManyProductsToCartService = async (products, { cid }) => {
  try {
    const result = await cartRepository.addManyProductsToCart(products, cid);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

const updateQuantityProductService = async ({ cid, pid }, { quantity }) => {
  try {
    const result = await cartRepository.updateQuantityProduct(cid, pid, quantity);
    return result;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  getCartService,
  createCartService,
  addProductToCartService,
  deleteProductInCartService,
  deleteCartService,
  addManyProductsToCartService,
  updateQuantityProductService,
};
