const mongoose = require("mongoose");
const LOLchampsroutes = require("../routes/LOLchamps.routes");

const LOLchampsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    Rol: { type: String, required: true },
    gender: {type: String, enum: ["hombre", "mujer", "otros"],required: true},
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true,
  }
);

const LOLchamps = mongoose.model("LOLchamps", LOLchampsSchema);

module.exports = LOLchamps;