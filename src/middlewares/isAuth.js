const { findUserService } = require("../services/user.service");

const isAuth = async (req, res, next) => {
  
  const user = await findUserService(req.user);

  if (user?.rol === "admin") {
    next();
  } else {
    res.status(401).send({
      status: "Unauthorized",
      message: "No posee la autorización para realizar esta acción",
      code: 401,
    });
  }
};

module.exports = isAuth;
