require("./dao/db");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { engine } = require("express-handlebars");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUiExpress = require("swagger-ui-express")

const app = express();
const initializePassport = require("./config/passport.config");

const hbsHelpers = require("./helpers/index.js");
const passport = require("passport");
const { getProducstMock } = require("./utils/mockingProducts");
const addLogger = require("./utils/logger");
const swaggerJSDoc = require("swagger-jsdoc");


const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "E-commerce",
      description: "API"
    }
  },
  apis: [`${__dirname}\\docs\\**\\*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: {
      ...hbsHelpers,
    },
    defaultLayout: 'main'
  })
);

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//Logger
app.use(addLogger)

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("coderSecret"));
//Inicializo passport
initializePassport();
app.use(passport.initialize());
//Routes
app.use("", routes);

app.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

app.get("/loggerTest", (req, res) => {
  req.logger.fatal("Fatal log")
  req.logger.error("Error log")
  req.logger.warning("Warning log")
  req.logger.info("Info log")
  req.logger.http("Http log")
  req.logger.debug("Debug log")
  res.send("Logs enviados")
})

app.get("/mockingproducts", (req, res) => {
  res.send({ status: "success", payload: getProducstMock() });
});

app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use(errorHandler);

module.exports = app;
