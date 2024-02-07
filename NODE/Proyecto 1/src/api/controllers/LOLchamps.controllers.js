const LOLchamps = require("../models/LOLchamps.model");

const createLOLchamps = async (req, res, next) => {
  try {
    await LOLchamps.syncIndexes();
    const customBody = {
      name: req.body?.name,
      origin: req.body?.origin,
    };
    const newLOLchamps = new LOLchamps(customBody);
      if (req.file) {
        newLOLchamps.image = req.file.path;
      } else {
        newLOLchamps.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      };
    const savedLOLchamps = await newLOLchamps.save();
    return res
      .status(savedLOLchamps ? 200 : 404)
      .json(savedLOLchamps ? savedLOLchamps : "error al crear el campeón");
  } catch (error) {
    return res.status(404).json({
      error: "error catch create campeón",
      message: error.message,
    });
  }
};

module.exports = { createLOLchamps };