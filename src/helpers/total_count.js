module.exports = totalCount = (products) => {
  let sum = 0;
  products.forEach((product) => {
    if (product.product?.stock !== 0) {
      sum += product.product?.price * product.quantity;
    }
  });
  return sum.toFixed(2);
};
