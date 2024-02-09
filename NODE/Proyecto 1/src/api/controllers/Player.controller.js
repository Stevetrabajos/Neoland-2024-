const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const Player = require("../models/Player.model");
const LOLchamp = require("../models/LOLchamp.model");

const createPlayer = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Player.syncIndexes();
    const customBody = {
      name: req.body?.name,
      origin: req.body?.origin,
    };
    const newPlayer = new Player(customBody);
      if (req.file) {
        newPlayer.image = req.file.path;
      } else {
        newPlayer.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      };
      try{
        const savedPlayer = await newPlayer.save();
        if (savedPlayer){
          return res.status(200).json(savedPlayer)
        }
        else{
          return res
          .status(404)
          .json("No se ha podido guardar en la DB");
        };
      }
      catch (error) {
      return res.status(404).json("error general saved Player");
      }
   } catch (error) {
    req.file?.path && deleteImgCloudinary(catchImg);
    return(
      res.status(404).json({
        message: "error en el creado del elemento", error: error,
      }) && next(error))
    };
};

//-----------------------------------------------------------------------------
//-----------------------------------Toggle------------------------------------
//-----------------------------------------------------------------------------

const toggleLOLchamp = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { teams } = req.body;
    const playerById = await Player.findById(id);
    if (playerById) {
      const arrayIdLOLchamps = LOLchamps.split(",");
      Promise.all(
        arrayIdLOLchamps.map(async (LOLchamp, index) => {
          if (playerById.LOLchamps.includes(LOLchamp)) {
            try {
              await Player.findByIdAndUpdate(id, {
                $pull: { LOLchamps: team },
              });

              try {
                await LOLchamp.findByIdAndUpdate(LOLchamps, {
                  $pull: { players: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update LOLchamps",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update player",
                message: error.message,
              }) && next(error);
            }
          } else {
            try {
              await Player.findByIdAndUpdate(id, {
                $push: { teams: team },
              });
              try {
                await LOLchamp.findByIdAndUpdate(LOLchamp, {
                  $push: { players: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update LOLchamp",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update player",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await Player.findById(id).populate("LOLchamps"),
          });
        });
    } else {
      return res.status(404).json("este jugador no existe");
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

//-----------------------------------------------------------------------------
//-----------------------------------Delete------------------------------------
//-----------------------------------------------------------------------------

const deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const player = await Player.findByIdAndDelete(id);
    if (player) {
      // lo buscamos para vr si sigue existiendo o no
      const finByIdPlayer = await Player.findById(id);

      try {
        const test = await Movie.updateMany(
          { players: id },
          { $pull: { players: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { playersFav: id },
            { $pull: { playersFav: id } }
          );

          return res.status(finByIdPlayer ? 404 : 200).json({
            deleteTest: finByIdPlayer ? false : true,
          });
        } catch (error) {
          return res.status(404).json({
            error: "error catch update User",
            message: error.message,
          });
        }
      } catch (error) {
        return res.status(404).json({
          error: "error catch update LOLchamp",
          message: error.message,
        });
      }
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};

//-----------------------------------------------------------------------------
//-----------------------------------getById-----------------------------------
//-----------------------------------------------------------------------------
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const playerById = await Player.findById(id);
    if (playerById) {
      return res.status(200).json(playerById);
    } else {
      return res.status(404).json("no se ha encontrado el player");
    }
  } catch (error) {
    return res.status(404).json(error.message);
  }
};
//-----------------------------------------------------------------------------
//-----------------------------------getall------------------------------------
//-----------------------------------------------------------------------------

const getAll = async (req, res, next) => {
  try {
    const allPlayer = await Player.find().populate("LOLchamps");
    /** el find nos devuelve un array */
    if (allPlayer.length > 0) {
      return res.status(200).json(allPlayer);
    } else {
      return res.status(404).json("no se han encontrado players");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar - lanzado en el catch",
      message: error.message,
    });
  }
};

//-----------------------------------------------------------------------------
//-----------------------------------getByName---------------------------------
//-----------------------------------------------------------------------------
const getByName = async (req, res, next) => {
  try {
    const { name } = req.params;

    /// nos devuelve un array de elementos
    const playerByName = await Player.find({ name });
    if (playerByName.length > 0) {
      return res.status(200).json(playerByName);
    } else {
      return res.status(404).json("no se ha encontrado");
    }
  } catch (error) {
    return res.status(404).json({
      error: "error al buscar por nombre capturado en el catch",
      message: error.message,
    });
  }
};


module.exports = { createPlayer, toggleLOLchamp, deletePlayer, getById, getAll, getByName };