const { deleteImgCloudinary } = require("../../middleware/files.middleware");
const LOLchamp = require("../models/LOLchamps.model");
const Player = require("../models/Player.model");

const createLOLchamp = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await Team.syncIndexes();
    const customBody = {
      name: req.body?.name,
      origin: req.body?.origin,
    };
    const newLOLchamp = new Team(customBody);
      if (req.file) {
        newLOLchamp.image = req.file.path;
      } else {
        newLOLchamp.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      };
      try{
        const savedLOLchamp = await newLOLchamp.save();
        if (savedLOLchamp){
          return res.status(200).json(savedLOLchamp)
        }
        else{
          return res
          .status(404)
          .json("No se ha podido guardar en la DataBase");
        };
      }
      catch (error) {
      return res.status(404).json("error general saved LOLchamps");
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

const togglePlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { players } = req.body;
    const teamById = await Team.findById(id);
    if (teamById) {
      const arrayIdPlayers = players.split(",");
      Promise.all( // resuelve todas las promesas que hay dentro, luego sigue..
        arrayIdPlayers.map(async (player, index) => {
          if (teamById.players.includes(player)) {
            try {
              await Team.findByIdAndUpdate(id, {//si ya existe dentro del array el mismo player, se borra
                $pull: { players: player },
              });

              try {
                await Player.findByIdAndUpdate(player, {// al existir un player tambien existe el team y lo tenemos que sacar con otro try catch anidado
                  $pull: { teams: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update player",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update LOLchamps",
                message: error.message,
              }) && next(error);
            }
          } else { // si no existe hacemos un push para meterlo , antes era pull si existia y ahora es push si no existe
            try {
              await LOLchamps.findByIdAndUpdate(id, {
                $push: { players: player },
              });
              try {
                await Player.findByIdAndUpdate(player, {
                  $push: { LOLchamps: id },
                });
              } catch (error) {
                res.status(404).json({
                  error: "error update player",
                  message: error.message,
                }) && next(error);
              }
            } catch (error) {
              res.status(404).json({
                error: "error update team",
                message: error.message,
              }) && next(error);
            }
          }
        })
      )
        .catch((error) => res.status(404).json(error.message))
        .then(async () => {
          return res.status(200).json({
            dataUpdate: await LOLchamps.findById(id).populate("players"),
          });
        });
    } else {
      return res.status(404).json("este equipo no existe");
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

const deleteLOLchamp= async (req, res, next) => {
  try {
    const { id } = req.params;
    const LOLchamp = await LOLchamp.findByIdAndDelete(id);
    if (LOLchamp) {
      // lo buscamos para vr si sigue existiendo o no
      const finByIdLOLchamp = await LOLchamp.findById(id);

      try {
        const test = await LOLchamp.updateMany(
          { LOLchamp: id },
          { $pull: { LOLchamps: id } }
        );
        console.log(test);

        try {
          await User.updateMany(
            { LOLchampsFav: id },
            { $pull: { LOLchampsFav: id } }
          );

          return res.status(finByIdLOLchamp ? 404 : 200).json({
            deleteTest: finByIdLOLchamp ? false : true,
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
    const LOLchampById = await LOLchamp.findById(id);
    if (LOLchampById) {
      return res.status(200).json(teamById);
    } else {
      return res.status(404).json("no se ha encontrado el campeón");
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
    const allLOLchamp = await LOLchamp.find().populate("players");
    /** el find nos devuelve un array */
    if (allLOLchamp.length > 0) {
      return res.status(200).json(allLOLchamp);
    } else {
      return res.status(404).json("no se han encontrado el campeón");
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
    const LOLchampByName = await LOLchamp.find({ name });
    if (LOLchampByName.length > 0) {
      return res.status(200).json(LOLchampByName);
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


module.exports = { createLOLchamp , togglePlayer, deleteLOLchamp, getByName, getAll, getById };