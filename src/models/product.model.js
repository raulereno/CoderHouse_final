const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const cartModel = require("./cart.model");

const productSchema = mongoose.Schema({
  title: { type: String, unique: true, required: true, max: 30 },
  description: { type: String, required: true, max: 100 },
  category: { type: String, required: true, default: "general" },
  price: { type: Number, required: true },
  image: {
    type: String,
    default:
      "https://www.mrpanet.org/global_graphics/default-store-350x350.jpg",
  },
  owner: { type: String, default: "admin" },
  stock: { type: Number, required: true },
});

productSchema.pre('save', async function (next) {
  const product = this
  if (!product.owner || product.owner === process.env.ADMIN_EMAIL) product.owner = 'admin'
  next()
});

productSchema.pre('remove', async function (next) {
  const productId = this._id;

  // Eliminar referencias al producto en los carritos
  await cartModel.updateMany(
    { "products.product": productId },
    { $pull: { products: { product: productId } } }
  );

  next();
});


productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", productSchema);
