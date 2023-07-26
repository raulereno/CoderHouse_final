const {
  createUserService,
  findUserService,
  changeRolService,
  getUserByEmailService,
  updateUserService,
  loginLogoutUserService,
  getUserByUsername,
  getAllUsersService,
  uploadDocsService,
  cleanOldUserService
} = require("../services/user.service");
const { generateAuthToken, decodeAuthToken } = require("../utils/jwt");
const { sendResetPassEmail } = require("../utils/nodemailer");
const { isValidPassword, createHash } = require("../utils/passwordHash");

const formLoginUser = (req, res) => {
  res.render("login", { title: "Iniciar Sesión" });
};

//TODO: FALTA EL UPDATE USER

const loginUser = async (req, res, next) => {
  try {
    const user = await loginLogoutUserService(req.body);

    const validPassword = isValidPassword(user, req.body.password);

    if (validPassword) {
      await updateUserService({ ...user, last_connection: new Date(Date.now()) })
      const access_token = generateAuthToken(user.email, "12h");
      res.cookie("access_token", access_token);

      res.status(200).send({
        status: "success",
        payload: "login success",
        cartId: user.cartId,
      });
    } else {
      throw Error("Constraseña incorrecta");
    }
  } catch (error) {
    next(error);
  }
};

const formRegisterUser = (req, res) => {
  res.render("register");
};

const createUser = async (req, res, next) => {
  try {
    await createUserService(req.body);
    res
      .status(201)
      .json({ status: "success", payload: "Usuario creado correctamente" });
  } catch (error) {
    next(error);
  }
};

const formRecoverPass = (req, res) => {
  const { expired } = req.query

  res.render("recover", {
    expired: expired
  })
};

const changePassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmailService(email);
    if (!user) res.redirect("/login");

    const token = generateAuthToken(user.email, "1h")
    await sendResetPassEmail(`${process.env.API_URL_PROD || "http://localhost"}:${process.env.PORT || 8080}/restorepass/${token}`, user)

    res.status(201).send({ status: "success", payload: "Link de restauración de contraseña enviado a casilla de email" })
  } catch (error) {
    next(error);
  }
}


const restorePassword = async (req, res, next) => {
  const { token } = req.params;
  try {
    const decoded = decodeAuthToken(token);
    if (decoded.message?.includes("jwt expired")) {
      res.redirect(`/recover?expired=true`);
      return
    }
    res.render("restorePass", {
      title: "Restaurar Contraseña",
      style: "index.css",
      expired: false,
      token: token
    })
  } catch (error) {
    next(error);
  }
}

const sendNewPassword = async (req, res, next) => {

  try {
    const { token, newPassword } = req.body
    const decoded = decodeAuthToken(token)

    const user = await getUserByEmailService(decoded.username);

    if (isValidPassword(user, newPassword)) {
      return res.status(304).send({ status: "error", code: 304, message: "Establece una contraseña distinta a la anterior" })
    }
    user.password = createHash(newPassword)
    await updateUserService(user)
    res.status(202).send({ status: "success", code: 202, message: "Password cambiado con exito" })
  } catch (error) {
    next(error)
  }

}

const logoutUser = async (req, res, next) => {
  try {
    const user = await loginLogoutUserService(req.user);
    await updateUserService({ ...user, last_connection: new Date(Date.now()) })
    res.clearCookie("access_token");
    res.redirect("/login");
  } catch (error) {
    next(error)
  }

};

const changeRol = async (req, res, next) => {
  const { uid } = req.params;

  try {
    const user = await changeRolService(uid)

    return res.status(201).send({ status: "success", message: `El usuario a cambiado de rol a <strong>${user.rol}</strong>` })
  } catch (error) {
    next(error);
  }
}

const profileView = async (req, res, next) => {

  try {
    const user = await getUserByEmailService(req.user.username);

    res.render("userProfile", { title: "Profile", style: "index.css", user });

  } catch (error) {
    next(error);
  }
};

const dashboardView = async (req, res, next) => {
  try {
    const user = await getUserByEmailService(req.user.email);
    const users = await getAllUsersService()

    res.render("dashboard", { title: "Dashboard", style: "index.css", user, users });

  } catch (error) {
    next(error);
  }
};

const cleanUsers = async (req, res, next) => {
  try {
    const result = await cleanOldUserService()

    res.status(200).send({
      status: "success",
      payload: "Usuarios eliminados",
      deleteUsers: result
    });
  } catch (error) {
    next(error);
  }
}


const uploadDocs = async (req, res, next) => {
  try {
    //Revisar bien el metodo
    const result = await uploadDocsService(req.files, req.user.username)

    if (result) {
      return res.status(201).send({ status: "success", code: 201, message: "Archivo/s agregado con exito" })
    }
    throw Error(result?.message)
  } catch (error) {
    next(error);
  }
}


module.exports = {
  formRegisterUser,
  formLoginUser,
  formRecoverPass,
  createUser,
  loginUser,
  changePassword,
  logoutUser,
  changeRol,
  restorePassword,
  sendNewPassword,
  profileView,
  dashboardView,
  uploadDocs,
  cleanUsers
};
