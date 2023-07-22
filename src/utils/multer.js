const multer = require('multer');
const path = require('path');
const { getUserByEmailService } = require('../services/user.service');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../public/documents"))
    },
    filename: async function (req, file, cb) {
        const fileName = file?.originalname?.split(".")[0]
        const fileType = file?.originalname?.split(".")[1]
        const username = await getUserByEmailService(req.user.username)

        cb(null, `${fileName}_${username._id}.${fileType}`)
    }
});

module.exports = uploader = multer({ storage }) 
