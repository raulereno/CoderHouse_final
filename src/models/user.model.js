const mongoose = require("mongoose");
const { createHash } = require("../utils/passwordHash");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Este usuario ya se encuentra ocupado"],
    required: [true, "El usuario es requerido"],
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    unique: [true, "Este mail ya se encuentra ocupado"],
    required: [true, "El email es requerido"],
  },
  password: { type: String, required: [true, "Ingresa un password"] },
  rol: {
    type: String,
    enum: ['usuario', 'premium', 'admin'],
    default: "usuario",
  },
  cartId: {
    type: String,
  },
  last_connection: {
    type: String
  },
  documents: [
    {
      name: {
        type: String
      },
      reference: {
        type: String
      }
    }
  ]
});

userSchema.pre("save", function (next) {
  const user = this;

  if (
    user.email === process.env.ADMIN_EMAIL &&
    user.password === process.env.ADMIN_PASS
  ) {
    user.rol = "admin";
  } else {
    user.rol = "usuario";
  }
  user.password = createHash(this.password);
  next();
});

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", userSchema);
