//Middleware hecho para evitar el error de depencia circular

const { findUserService, getUserByEmailService } = require("../services/user.service");
const { getOneProductService } = require("../services/products.service");
const { getCartService } = require("../services/cart.service");
const isOwner = async (req, res, next) => {
    try {
        const { pid } = req.params
        const user = req.user.username
        const product = await getOneProductService(pid)
        if (product.owner === user) throw Error("No puede comprar tu propio producto")
        next()
    } catch (error) {
        res.status(401).send({
            status: "Unauthorized",
            message: error.message,
            code: 401,
        });
    }
};

const isCartOwner = async (req, res, next) => {
    try {
        const { cid } = req.params
        const user = await getUserByEmailService(req.user.username)

        if (user.cartId !== cid && user.rol !== "admin") throw Error("No puede modificar un carrito que no le pertenece")
        next()
    } catch (error) {
        res.status(401).send({
            status: "Unauthorized",
            message: error.message,
            code: 401,
        });
    }
};

module.exports = { isOwner, isCartOwner };
