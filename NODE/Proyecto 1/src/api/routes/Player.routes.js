const { upload } = require("../../middleware/files.middleware");
const {
  createPlayer,
  toggleTiendas,
  getById,
  getAll,
  getByName,
} = require("../controllers/Player.controllers");

const PlayerRoutes = require("express").Router();
Playeroutes.post("/", upload.single("image"), createPlayer);
Playerroutes.patch("/add/:id", toggleLOLchamps);
Playerroutes.get("/:id", getById);
Playerroutes.get("/", getAll);
Playerroutes.get("/byName/:name", getByName);
module.exports = PlayerRoutes;