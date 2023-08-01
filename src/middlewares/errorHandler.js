const handleDuplicateKeyError = (err, req, res) => {
  // Utilizamos una expresión regular para buscar la clave duplicada
  const duplicateKeyRegex = /dup key: { (\w+): "([^"]+)" }/;

  // Utilizamos exec() para obtener la información de la clave duplicada
  const match = duplicateKeyRegex.exec(err.message);

  req.logger.warning(`Una cuenta con ese ${match[1]} ya existe`)

  res.status(409).send({
    status: "error",
    message: `Una cuenta con ese ${match[1]} ya existe`,
    code: 409,
  });
};

const handleValidationError = (err, req, res) => {
  const bodyError = JSON.parse(err.message);

  req.logger.warning(bodyError)

  return res.status(400).send({ code: 400, ...bodyError });
};

const notFound = (err, req, res) => {

  req.logger.warning("Usuario no encontrado")
  res.redirect("/login")

};

const invalidCredentials = (err, req, res) => {

  req.logger.warning("Credenciales del usuario invalidas")

  res.status(403).send({
    status: "Error",
    message: err.message,
    code: 403,
  });
};
const unauthorizedUser = (err, req, res) => {

  req.logger.warning("Usuario no autorizado a realizar esta acción")

  res.status(401).send({
    status: "Unauthorized",
    message: err.message,
    code: 401,
  });
};

const incompleteDocsPremium = (err, req, res) => {
  req.logger.warning(err.message)

  const missingDocs = err.message?.split('premium: ')[1]?.split(",").map(element => {
    if (element === "identification") {
      return "Identificación"
    }
    if (element === "address") {
      return "Comprobante de domicilio"
    }
    if (element === "statusCount") {
      return "Comprobante de estado de cuenta"
    }
  })

  res.status(406).send({
    status: "Missing Documents",
    message: err.message,
    missingDocs: missingDocs,
    code: 406,
  });
}

const errorHandler = (err, req, res, next) => {
  console.log("🚀 ~ file: errorHandler.js:100 ~ errorHandler ~ err:", err)

  try {
    if (err.message?.includes("duplicate key error")) {
      return (err = handleDuplicateKeyError(err, req, res));
    }
    if (err.message?.includes("Usuario inexistente")) {
      return (err = notFound(err, req, res));
    }
    if (err.message == "Constraseña incorrecta") {
      return (err = invalidCredentials(err, req, res));
    }
    if (err.message?.includes("No tienes autorización para modificar este producto")) {
      return (err = unauthorizedUser(err, req, res));
    }
    if (err.message?.includes("Falta los siguientes documentos para ser premium")) {
      return (err = incompleteDocsPremium(err, req, res));
    }
    return (err = handleValidationError(err, req, res));
  } catch (error) {
    req.logger.error(`Un error no manejado a ocurrido: ${err.message}`)
    res.status(500).send("An unknown error ocurred");
  }
};


module.exports = errorHandler;
