const forPages = require("./map_helper.js");
const totalCount = require("./total_count.js");
const isAuth = require("./isAuth.js")
const isNotAdmin = require("./isNotAdmin.js")
const isAdmin = require("./isAdmin.js")
const checkFiles = require("./checkFiles.js")
const formatDate = require("./formatDates.js")

module.exports = {
  forPages,
  totalCount,
  isAuth,
  isNotAdmin,
  checkFiles,
  isAdmin,
  formatDate
};
