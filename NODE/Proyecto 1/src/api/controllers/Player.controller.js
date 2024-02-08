const Player = require("../models/Player.model");
const Tienda = require("../models/Tienda.model");

const createPlayer = async (req, res, next) => {
  let catchImg = req.file?.path;

  try {
    await Player.syncIndexes();

    const customBody = {
      name: req.body?.name,
      type: req.body?.type,
    };

    const newPlayer = new Player(customBody);
   
    if (req.file) {
      newPlayer.image = catchImg;
    } else {
      newPlayer.image =
        "https://idro.es/wp-content/uploads/2022/07/piramide-alimentos.jpg";
    }
    const savedAlimento = await newAlimento.save();

    return res
      .status(savedPlayer ? 200 : 404)
      .json(savedPlayer ? savedAPlayer : "error al crear Player");
  } catch (error) {
    req.file?.path && deleteImgCloudinary(catchImg);
    return res.status(404).json({
      error: "error catch create Player",
      message: error.message,
    });
  }
};



const toggleLOLchamp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { LOLchamps } = req.body;

    const PlayerById = await Player.findById(id);

    if (PlayerById) {
      const arrayIdLOLchamps = LOLchamps.split(",");

      await Promise.all(
        arrayIdLOLchamps.map(async (tienda) => {
          if (PlayerById.LOLchamps.includes(LOLchamps)) {
            try {
              await Player.findByIdAndUpdate(id, {
                $pull: { LOLchamps: LOLchamps },
              });

              try {
                await Tienda.findByIdAndUpdate(LOLchamp, {
                  $pull: { Player: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update LOLchamp",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update Player",
                message: error.message,
              }) && next(error);
            }
          } else {
            try {
              await Player.findByIdAndUpdate(id, {
                $push: { LOLchamps: LOLchamp },
              });
              try {
                await LOLchamp.findByIdAndUpdate(LOLchamps, {
                  $push: { Player: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update LOLchamp",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update Player",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json({ error: error.message }))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Player.findById(id).populate("LOLchamps"),
          });
        });
    } else {
      return res.status(404).json("este Player no existe");
    }
  } catch (error) {
    return (
      res.status(404).json({
        error: "error catch",
        message: error.message,
      }) && next(error)
    );
  }
};

//! get by id:

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const PlayerById = await Player.findById(id);

    if (PlayerById) {
      return res.status(200).json(PlayerById);
    } else {
      return res.status(404).json("No se ha encontrado el Player");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//! ---------get All:

const getAll = async (req, res, next) => {
  try {
    const allPlayers = await Player.find().populate("LOLchamps");
    if (allPlayers.length > 0) {
      return res.status(200).json(allPlayers);
    } else {
      return res.status(404).json("no se han encontrado Players");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar Players",
      message: error.message,
    });
  }
};

//! get by name:

const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    const PlayerByName = await Player.find({ name });
    if (PlayerByName.length > 0) {
      return res.status(200).json(PlayerByName);
    } else {
      return res
        .status(404)
        .json("No se ha encontrado ningun Player con ese nombre");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error en la busqueda por nombre de Player",
      message: error.message,
    });
  }
};

module.exports = { createPlayer, toggleLOLchamps, getById, getAll, getByName };