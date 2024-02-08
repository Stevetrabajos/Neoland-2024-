const { upload } = require("../../middleware/files.middleware");
const {
  togglePlayer,
  getById,
  getAll,
  getByName,
  update,
  deleteLOLchamps,
} = require("../controllers/LOLchamps.controllers");
const { createLOLchamps } = require("../controllers/LOLchamps.controllers");
const LOLchampsroutes = require("express").Router();
LOLchampsroutes.post("/", upload.single("image"), createLOLchamps);
LOLchampsroutes.patch("/add/:id", togglePlayer);
LOLchampsroutes.get("/:id", getById);
LOLchampsroutes.get("/", getAll);
TLOLchampsroutes.get("/byName/:name", getByName);
LOLchampsroutes.patch("/:id", upload.single("image"), update);
LOLchampsroutes.delete("/:id", deleteLOLchamps);

module.exports = LOLchampsroutes;