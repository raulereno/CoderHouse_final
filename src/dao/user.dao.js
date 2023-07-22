const mongoose = require("mongoose");
const User = require("./../models/user.model");
class UserDAO {
  constructor() {
    this.userCollection = User;
  }

  async createUser(user, cid) {
    try {
      const newUser = await this.userCollection.create({ ...user, cartId: cid });
      return newUser;
    } catch (error) {
      throw Error(error)
    }
  }

  async findAllUsers() {
    try {
      const user = await this.userCollection.find({ rol: { $ne: 'admin' } }).lean()
      return user
    } catch (error) {
      throw Error(error)
    }
  }

  async getUserByUsername(username) {
    try {
      const user = await this.userCollection
        .findOne({ username: username })
        .lean();
      return user;
    } catch (error) {
      throw Error(error)
    }
  }



  async findUser(user) {
    try {
      let userInDB;

      if (user.username.includes("@")) {
        user.email = user.username;
        delete user.username;
        userInDB = await this.userCollection
          .findOne({
            email: user.email,
          })
          .lean();
      } else {
        userInDB = await this.userCollection
          .findOne({
            username: user.username,
          })
          .lean();
      }

      if (!userInDB) throw Error("Usuario inexistente");

      return userInDB;
    } catch (error) {
      throw error.message
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.userCollection.findOne({ email: email }).lean();
      return user;
    } catch (error) {
      throw Error(error);
    }
  }

  async findUserById(uid) {
    try {
      const user = await this.userCollection.findOne({ _id: uid });
      return user;
    } catch (error) {
      throw Error(error);
    }
  }

  async updateUser(user) {
    try {
      const result = await this.userCollection.findOneAndUpdate({ _id: user._id }, user);
      return result
    } catch (error) {
      throw Error(error);

    }
  }

  async changeRol(uid) {
    try {
      const user = await this.userCollection.findOne({ _id: uid });
      const rol = user.rol;
      if (rol === "usuario") {
        user.rol = "premium";
      } else {
        user.rol = "usuario";
      }
      const updatedUser = await this.userCollection.findOneAndUpdate({ _id: uid }, user).lean();
      return updatedUser;
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = UserDAO;
