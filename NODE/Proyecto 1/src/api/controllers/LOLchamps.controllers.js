const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const LOLchamps = require("../models/LOLchamps.model");

const registerLOLchamps = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await LOLchamps.syncIndexes();

    const CLOLchampsExist = await LOLchamps.findOne({ virtualStageName: req.body.virtualStageName });
    if (!LOLchampsExist) {
      const newLOLchamps = new LOLchamps({ ...req.body, image: catchImg });

      try {
        const LOLchampsSave = await newLOLchamps.save();

        if (LOLchampsSave) {
          return res.status(200).json({
            LOLchamps: LOLchampsSave
          });
        } else {
          return res.status(404).json("champ not saved");
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      deleteImgCloudinary(catchImg);
      return res.status(409).json("this champ already exist");
    }
  } catch (error) {
    deleteImgCloudinary(catchImg);
    return next(error);
  }
};

module.exports = { registerLOLchamps }