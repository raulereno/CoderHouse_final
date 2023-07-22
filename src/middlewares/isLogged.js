const passport = require("passport");

const isLogged = async (req, res, next) => {

  passport.authenticate("jwt", { session: false, failureRedirect: "/login" })(
    req,
    res,
    next
  );
};

module.exports = isLogged;
