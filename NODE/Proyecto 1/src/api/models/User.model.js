const bcrypt = require("bcrypt"); // para encryptar informacion
const validator = require("validator"); /// n os sirve para validad info
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  // vamos a tener la definicion de datos
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Email not valid"], // en caso de no ser un email valido
      // lanza el error ----> 'Email not valid'
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: [validator.isStrongPassword], //minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
    },
    gender: {
      type: String,
      enum: ["hombre", "mujer", "otros"],
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "user", "superadmin"],
      default: "user",
    },
    confirmationCode: {
      type: Number,
      required: true,
    },
    check: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    /// cuando relacionamos un modelo de con otro lo hacemos con populate y el ref a otro modelo
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
    // el next puede lanzar al log o puede decir que continuemos
  } catch (error) {
    next("Error hashing password", error);
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;