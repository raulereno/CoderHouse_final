class UserDto {
  constructor({ username, email, password, cartId }) {

    this.first_name = username;
    this.last_name = "";
    this.age = null;
    this.email = email;
    this.password = password;
    this.cartId = cartId;
  }
}
module.exports = UserDto;
