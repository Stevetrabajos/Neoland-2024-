const { upload } = require("../../middleware/files.middleware");
const { registerLargo } = require("../controllers/User.controllers");
const express = require("express");
const UserRoutes = express.Router();

UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);
module.exports = UserRoutes;