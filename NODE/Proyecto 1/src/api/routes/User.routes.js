const { upload } = require("../../middleware/files.middleware");
const {
  registerLargo,
  register,
  registerWithRedirect,
  sendCode,
  resendCode,
  checkNewUser,
  login,
  autoLogin,
  changePassword,
  sendPassword,
} = require("../controllers/User.controllers");
const express = require("express");
const UserRoutes = express.Router();

//! ---------------- endPoints sin auth ---------------------------------------
UserRoutes.post("/registerLargo", upload.single("image"), registerLargo);
UserRoutes.post("/registerUtil", upload.single("image"), register);
UserRoutes.post("/register", upload.single("image"), registerWithRedirect);
UserRoutes.post("/resend", resendCode);
UserRoutes.post("/check", checkNewUser);
UserRoutes.post("/login", login);
UserRoutes.post("/login/autologin", autoLogin);
UserRoutes.patch("/forgotpassword", changePassword);

//! ---------------- endPoints con auth ---------------------------------------

/// ------------------> rutas que pueden ser redirect
UserRoutes.get("/register/sendMail/:id", sendCode); // :id ---> es el nombre del param
UserRoutes.patch("/sendPassword/:id", sendPassword);
module.exports = UserRoutes;