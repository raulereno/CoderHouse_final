class ProductDto {
  constructor(title, description, price, stock, category, image, owner) {
    this.title = title;
    this.description = description;
    this.category = category;
    this.price = price;
    this.stock = stock;
    this.image = image;
    this.owner = owner
  }
}
module.exports = ProductDto;
