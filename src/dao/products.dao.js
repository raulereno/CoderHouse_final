const ProductDto = require("./DTOs/product.dto");
const Product = require("./../models/product.model");

class ProductDAO {
  constructor() {
    this.productsCollection = Product;
  }

  async getAllProducts({ limit, page, query, sort }, user) {
    let setQuery;
    let products;

    if (sort !== "asc" && sort !== "desc") {
      sort = undefined;
    }

    const setLimit = limit ? limit : 10;
    const setPage = page ? Number(page) : 1;
    const setSort = sort ? { price: sort } : {};

    if (query?.includes("@")) {
      setQuery = query ? { owner: query } : {};
    } else {
      setQuery = query ? { category: query } : {};
    }

    const setStringQuery = query ? "&query=" + query : "";

    const options = {
      lean: true,
      limit: setLimit,
      page: setPage,
      sort: setSort,
    };
    try {
      products = await this.productsCollection.paginate(setQuery, options);
    } catch (error) {
      throw Error(error);
    }

    const myCustomLabels = {
      prevLink: products.hasPrevPage
        ? `${process.env.API_URL_PROD || `http://localhost:${process.env.PORT || 8080}`}/products?page=${setPage - 1
        }&limit=${setLimit}${setStringQuery}`
        : null,
      nextLink: products.hasNextPage
        ? `${process.env.API_URL_PROD || `http://localhost:${process.env.PORT || 8080}`}/products?page=${setPage + 1
        }&limit=${setLimit}${setStringQuery}`
        : null,
    };

    return { ...products, ...myCustomLabels, query: query, sort: sort };
  }

  async getOneProduct(pid) {
    const product = await this.productsCollection.findById(pid);
    return product;
  }

  async createOneProduct(product, owner) {
    try {
      const { title, description, price, image, category, stock } = product;
      const newProduct = new ProductDto(
        title,
        description,
        price,
        stock,
        category,
        image,
        owner
      );
      const result = await this.productsCollection.create(newProduct);
      return result;
    } catch (error) {
      if (error.name === "ValidationError") {
        const errores = {};
        for (let campo in error.errors) {
          errores[campo] = error.errors[campo].message;
        }

        throw JSON.stringify({ message: "ValidationError", errores });
      }
    }
  }

  async createManyProducts(products) {
    try {
      const newProducts = products.map((product) => {
        const { title, description, price, image, category, stock } = product;
        return new ProductDto(
          title,
          description,
          price,
          stock,
          category,
          image
        );
      });

      const result = await this.productsCollection.insertMany(newProducts);
      return result;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateProduct(pid, product, user) {

    try {
      let result = await this.productsCollection.findById({ _id: pid });
      if (result.owner !== user && user !== process.env.ADMIN_EMAIL) throw Error('No tienes autorización para modificar este producto')
      result = { ...product };
      await this.productsCollection.updateOne({ _id: pid }, result);

      return result;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }

  async deleteProduct(pid, user) {
    try {
      let product = await this.productsCollection.findById({ _id: pid });
      if (product.owner !== user.email && user.email !== process.env.ADMIN_EMAIL) throw Error('No tienes autorización para modificar este producto')
      const res = await this.productsCollection.deleteOne({ _id: pid });
      if (res.deletedCount) return product
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = ProductDAO;
