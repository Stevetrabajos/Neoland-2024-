//! --------------------------middleware------------------------------------
const { deleteImgCloudinary } = require("../../middleware/files.middleware");

//! ---------------------------- modelos ----------------------------------
const User = require("../models/User.model");

//! ---------------------------- utils ----------------------------------
const randomCode = require("../../utils/randomCode");
const sendEmail = require("../../utils/sendEmail");

//! ------------------------------librerias--------------------------------
const nodemailer = require("nodemailer");
const validator = require("validator");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const {
  setTestEmailSend,
  getTestEmailSend,
} = require("../../state/state.data");
const setError = require("../../helpers/handle-error");
const { generateToken } = require("../../utils/token");
const randomPassword = require("../../utils/randomPassword");

dotenv.config();

/**+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER LARGO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------
//------------------->CRUD es el acrónimo de "Crear, Leer, Actualizar y Borrar"
const registerLargo = async (req, res, next) => {
  /// lo primero que vamos hacer captura la imagen que previamente hemos subido en el middleaware
  let catchImg = req.file?.path; /// el optional chaining es para que no rompa en caso de no haber path
  // el path es la url de cloudinary

  try {
    /** hay que meter un try catch por cada asincronia de actualizacion que tengamos de actualizacion para poder
     * seleccionar los errores de forma separada e individualizada
     *
     * la asincronias de lectura no hace falta que tengan un try catch por cada una de ellas
     */

    /** sincronizamos los index de los elementos unique */
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const { email, name } = req.body; // lo que enviamos por la parte del body de la request

    // vamos a buscsar al usuario
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );

    if (!userExist) {
      //! -------------LO REGISTRAMOS PORQUE NO HAY COINCIDENCIAS CON UN USER INTERNO
      const newUser = new User({ ...req.body, confirmationCode });

      /// ya tenemos el _id del user

      // EL USER HA METIDO IMAGEN ???
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      ///! SI HAY UNA NUEVA ASINCRONIA DE CREAR O ACTUALIZAR HAY QUE METER OTRO TRY CATCH
      try {
        const userSave = await newUser.save();

        if (userSave) {
          // ---------------------------> ENVIAR EL CODIGO CON NODEMAILER --------------------
          const emailEnv = process.env.EMAIL;
          const password = process.env.PASSWORD;

          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: emailEnv,
              pass: password,
            },
          });

          const mailOptions = {
            from: emailEnv,
            to: email,
            subject: "Confirmation code",
            text: `tu codigo es ${confirmationCode}, gracias por confiar en nosotros ${name}`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
            console.log("Email sent: " + info.response);
            return res.status(200).json({
              user: userSave,
              confirmationCode,
            });
          });
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      ///! -------> cuando ya existe un usuario con ese email y ese name
      if (req.file) deleteImgCloudinary(catchImg);
      // como ha habido un error la imagen previamente subida se borra de cloudinary
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    // SIEMPRE QUE HAY UN ERROR GENERAL TENEMOS QUE BORRAR LA IMAGEN QUE HA SUBIDO EL MIDDLEWARE
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER CORTO EN CODIGO ------------------------
//! -----------------------------------------------------------------------------

const register = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const { email, name } = req.body;

    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();

        if (userSave) {
          sendEmail(email, name, confirmationCode);
          setTimeout(() => {
            if (getTestEmailSend()) {
              // el estado ya utilizado lo reinicializo a false
              setTestEmailSend(false);
              return res.status(200).json({
                user: userSave,
                confirmationCode,
              });
            } else {
              setTestEmailSend(false);
              return res.status(404).json({
                user: userSave,
                confirmationCode: "error, resend code",
              });
            }
          }, 1100);
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) deleteImgCloudinary(catchImg);
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ----------------------------REGISTER CON REDIRECT----------------------------
//! -----------------------------------------------------------------------------
const registerWithRedirect = async (req, res, next) => {
  let catchImg = req.file?.path;
  try {
    await User.syncIndexes();
    let confirmationCode = randomCode();
    const userExist = await User.findOne(
      { email: req.body.email },
      { name: req.body.name }
    );
    if (!userExist) {
      const newUser = new User({ ...req.body, confirmationCode });
      if (req.file) {
        newUser.image = req.file.path;
      } else {
        newUser.image = "https://pic.onlinewebfonts.com/svg/img_181369.png";
      }

      try {
        const userSave = await newUser.save();
        const PORT = process.env.PORT;
        if (userSave) {
          return res.redirect(
            303,
            `http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}`
          );
        }
      } catch (error) {
        return res.status(404).json(error.message);
      }
    } else {
      if (req.file) deleteImgCloudinary(catchImg);
      return res.status(409).json("this user already exist");
    }
  } catch (error) {
    if (req.file) {
      deleteImgCloudinary(catchImg);
    }
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? ------------------CONTRALADORES QUE PUEDEN SER REDIRECT --------------------
//! ----------------------------------------------------------------------------

//!!! esto quiere decir que o bien tienen entidad propia porque se llaman por si mismos por parte del cliente
//! o bien son llamados por redirect es decir son controladores de funciones accesorias

const sendCode = async (req, res, next) => {
  try {
    /// sacamos el param que hemos recibido por la ruta
    /// recuerda la ruta: http://localhost:${PORT}/api/v1/users/register/sendMail/${userSave._id}
    const { id } = req.params;

    /// VAMOS A BUSCAR EL USER POR ID para tener el email y el codigo de confirmacion
    const userDB = await User.findById(id);

    /// ------------------> envio el codigo
    const emailEnv = process.env.EMAIL;
    const password = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailEnv,
        pass: password,
      },
    });

    const mailOptions = {
      from: emailEnv,
      to: userDB.email,
      subject: "Confirmation code",
      text: `tu codigo es ${userDB.confirmationCode}, gracias por confiar en nosotros ${userDB.name}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(404).json({
          user: userDB,
          confirmationCode: "error, resend code",
        });
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({
        user: userDB,
        confirmationCode: userDB.confirmationCode,
      });
    });
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? -----------------------RESEND CODE -----------------------------
//! -----------------------------------------------------------------------------

const resendCode = async (req, res, next) => {
  try {
    //! vamos a configurar nodemailer porque tenemos que enviar un codigo
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });

    //! hay que ver que el usuario exista porque si no existe no tiene sentido hacer ninguna verificacion
    const userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      const mailOptions = {
        from: email,
        to: req.body.email,
        subject: "Confirmation code",
        text: `tu codigo es ${userExists.confirmationCode}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(404).json({
            resend: false,
          });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            resend: true,
          });
        }
      });
    } else {
      return res.status(404).json("User not found");
    }
  } catch (error) {
    return next(setError(500, error.message || "Error general send code"));
  }
};

//! ------------------------------------------------------------------------
//? -------------------------- CHECK NEW USER------------------------------
//! ------------------------------------------------------------------------

const checkNewUser = async (req, res, next) => {
  try {
    //! nos traemos de la req.body el email y codigo de confirmation
    const { email, confirmationCode } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      //!No existe----> 404 de no se encuentra
      return res.status(404).json("User not found");
    } else {
      // cogemos que comparamos que el codigo que recibimos por la req.body y el del userExists es igual
      if (confirmationCode === userExists.confirmationCode) {
        try {
          await userExists.updateOne({ check: true });

          // hacemos un testeo de que este user se ha actualizado correctamente, hacemos un findOne
          const updateUser = await User.findOne({ email });

          // este finOne nos sirve para hacer un ternario que nos diga si la propiedad vale true o false
          return res.status(200).json({
            testCheckOk: updateUser.check == true ? true : false,
          });
        } catch (error) {
          return res.status(404).json(error.message);
        }
      } else {
        try {
          /// En caso dec equivocarse con el codigo lo borramos de la base datos y lo mandamos al registro
          await User.findByIdAndDelete(userExists._id);

          // borramos la imagen
          deleteImgCloudinary(userExists.image);

          // devolvemos un 200 con el test de ver si el delete se ha hecho correctamente
          return res.status(200).json({
            userExists,
            check: false,

            // test en el runtime sobre la eliminacion de este user
            delete: (await User.findById(userExists._id))
              ? "error delete user"
              : "ok delete user",
          });
        } catch (error) {
          return res
            .status(404)
            .json(error.message || "error general delete user");
        }
      }
    }
  } catch (error) {
    // siempre en el catch devolvemos un 500 con el error general
    return next(setError(500, error.message || "General error check code"));
  }
};

//! -----------------------------------------------------------------------------
//? --------------------------------LOGIN ---------------------------------------
//! -----------------------------------------------------------------------------

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      // compara dos contraseñar una sin encryptar y otra que si lo esta
      if (bcrypt.compareSync(password, userDB.password)) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? --------------------------------AUTOLOGIN ---------------------------------------
//! -----------------------------------------------------------------------------

const autoLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userDB = await User.findOne({ email });

    if (userDB) {
      // comparo dos contraseñas encriptadas
      if (password == userDB.password) {
        const token = generateToken(userDB._id, email);
        return res.status(200).json({
          user: userDB,
          token,
        });
      } else {
        return res.status(404).json("password dont match");
      }
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

//! -----------------------------------------------------------------------------
//? -----------------------CONTRASEÑAS Y SUS CAMBIOS-----------------------------
//! -----------------------------------------------------------------------------

//? -----------------------------------------------------------------------------
//! ------------------CAMBIO DE CONTRASEÑA CUANDO NO ESTAS LOGADO---------------
//? -----------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
  try {
    /** vamos a recibir  por el body el email y vamos a comprobar que
     * este user existe en la base de datos
     */
    const { email } = req.body;
    console.log(req.body);
    const userDb = await User.findOne({ email });
    if (userDb) {
      /// si existe hacemos el redirect
      const PORT = process.env.PORT;
      return res.redirect(
        307,
        `http://localhost:${PORT}/api/v1/users/sendPassword/${userDb._id}`
      );
    } else {
      return res.status(404).json("User no register");
    }
  } catch (error) {
    return next(error);
  }
};

const sendPassword = async (req, res, next) => {
  try {
    /** VAMOS A BUSCAR AL USER POOR EL ID DEL PARAM */
    const { id } = req.params;
    const userDb = await User.findById(id);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    });
    let passwordSecure = randomPassword();
    console.log(passwordSecure);
    const mailOptions = {
      from: email,
      to: userDb.email,
      subject: "-----",
      text: `User: ${userDb.name}. Your new code login is ${passwordSecure} Hemos enviado esto porque tenemos una solicitud de cambio de contraseña, si no has sido ponte en contacto con nosotros, gracias.`,
    };
    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        /// SI HAY UN ERROR MANDO UN 404
        console.log(error);
        return res.status(404).json("dont send email and dont update user");
      } else {
        // SI NO HAY NINGUN ERROR
        console.log("Email sent: " + info.response);
        ///guardamos esta contraseña en mongo db

        /// 1 ) encriptamos la contraseña
        const newPasswordBcrypt = bcrypt.hashSync(passwordSecure, 10);

        try {
          /** este metodo te lo busca por id y luego modifica las claves que le digas
           * en este caso le decimos que en la parte dde password queremos meter
           * la contraseña hasheada
           */
          await User.findByIdAndUpdate(id, { password: newPasswordBcrypt });

          //!------------------ test --------------------------------------------
          // vuelvo a buscar el user pero ya actualizado
          const userUpdatePassword = await User.findById(id);

          // hago un compare sync ----> comparo una contraseña no encriptada con una encrptada
          /// -----> userUpdatePassword.password ----> encriptada
          /// -----> passwordSecure -----> contraseña no encriptada
          if (bcrypt.compareSync(passwordSecure, userUpdatePassword.password)) {
            // si son iguales quiere decir que el back se ha actualizado correctamente
            return res.status(200).json({
              updateUser: true,
              sendPassword: true,
            });
          } else {
            /** si no son iguales le diremos que hemos enviado el correo pero que no
             * hemos actualizado el user del back en mongo db
             */
            return res.status(404).json({
              updateUser: false,
              sendPassword: true,
            });
          }
        } catch (error) {
          return res.status(404).json(error.message);
        }
      }
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  registerLargo,
  register,
  sendCode,
  registerWithRedirect,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  changePassword,
  sendPassword,
};