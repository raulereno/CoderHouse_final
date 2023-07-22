const { findUserService } = require("../services/user.service");

const hasPermissions = async (req, res, next) => {

    const user = await findUserService(req.user);

    if (user?.rol === "admin" || user?.rol === "premium") {
        next();
    } else {
        res.status(401).send({
            status: "Unauthorized",
            message: "No posee la autorización para realizar esta acción",
            code: 401,
        });
    }
};

module.exports = hasPermissions;
