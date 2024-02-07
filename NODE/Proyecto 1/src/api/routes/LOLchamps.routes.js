const { createChamp } = require("../controllers/LOLchamps.controllers");

const LOLchampsroutes = require("express").Router();

LOLchampsroutes.post("/", createChamp);

module.exports = LOLchampsroutes;