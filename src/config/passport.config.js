const passport = require("passport");
const jwt = require("passport-jwt");

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          cookieExtractor,
          headerExtractor,
        ]),
        secretOrKey: "coderSecret",
      },
      async (jwt_payload, done) => {
        try {
          return done(null, jwt_payload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const headerExtractor = (req) => {
  let token = null;
  if (req && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  return token;
};

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

module.exports = initializePassport;
