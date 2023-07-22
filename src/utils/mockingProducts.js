const { faker } = require("@faker-js/faker");
// import { faker } from '@faker-js/faker/locale/de';

const PRODUCTS = [];

function createRandomProduct() {
  return {
    _id: faker.datatype.uuid(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.internet.password(),
    price: Number(faker.commerce.price(100, 5000, 2)),
    image: faker.image.abstract(350, 350, true),
    stock: Math.ceil(Math.random() * 10),
  };
}

const getProducstMock = () => {
  Array.from({ length: 50 }).forEach(() => {
    PRODUCTS.push(createRandomProduct());
  });

  return PRODUCTS;
};

module.exports = { getProducstMock };
