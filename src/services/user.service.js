const UserRepository = require("../dao/repositories/user.repository");
const { sendInfoDeleteAcount } = require("../utils/nodemailer");

const { createCartService } = require("./cart.service");
const userRepository = new UserRepository();

const documentsRequiredPremiumUser = ['identification', 'address', 'statusCount']

const createUserService = async (user) => {
  try {
    const newCart = await createCartService();
    const newUser = await userRepository.createUser(user, newCart._id);
    return newUser;
  } catch (error) {
    throw Error(error)
  }
};

const updateUserService = (user) => {
  try {
    return userRepository.updateUser(user);
  } catch (error) {
    throw Error(error)
  }
};

const getAllUsersService = () => {
  try {
    return userRepository.findAllUsers()
  } catch (error) {
    throw Error(error)
  }
}

const getUserByEmailService = async (email) => {
  try {
    const user = await userRepository.findUserByEmail(email);
    return user;
  } catch (error) {
    throw Error(error)
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await userRepository.getUserByUsername(username);
    return user;
  } catch (error) {
    throw Error(error)
  }
};

const findUserService = async (user) => {
  try {
    const userInDB = await userRepository.findUser(user);
    return userInDB;
  } catch (error) {
    throw Error(error)
  }
};

const loginLogoutUserService = async (user) => {
  try {
    const userInDB = await userRepository.findUser(user);
    return userInDB;
  } catch (error) {
    throw Error(error)
  }
};

const cleanOldUserService = async () => {
  try {
    let countDeleteUser = 0
    const users = await userRepository.findAllUsers()
    console.log("🚀 ~ file: user.service.js:75 ~ cleanOldUserService ~ users:", users)
    const dateNow = new Date(Date.now())
    //TODO: Poner bien la fecha antes de entregar
    // 2 hs
    const limit = 120 * 60 * 1000
    //2 dias
    //const limit = 48 * 60 * 60 * 1000

    const newTimestamp = dateNow.valueOf() - limit
    console.log("🚀 ~ file: user.service.js:84 ~ cleanOldUserService ~ newTimestamp:", newTimestamp)
    const filterDate = new Date(newTimestamp)
    console.log("🚀 ~ file: user.service.js:86 ~ cleanOldUserService ~ filterDate:", filterDate)


    for (const element of users) {
      //Si el usuario se registro pero nunca ingreso y si la fecha de la ultima conexión fue hace mas de dos dias se lo elimina
      const aux = new Date(element.last_connection)
      if (!element.last_connection || aux < filterDate) {
        await userRepository.deleteUser(element)
        countDeleteUser++
        await sendInfoDeleteAcount(element.email)
      }
    }

    return countDeleteUser
  } catch (error) {
    throw Error(error)
  }
}

const changeRolService = async (uid) => {
  try {
    const user = await userRepository.findUserById(uid)
    if (user.rol === "usuario") {

      const missingDocs = []
      documentsRequiredPremiumUser.forEach(documentName => {
        let foundDoc = false
        for (const i of user.documents) {
          if (i.name === documentName) {
            foundDoc = true
          }
        }
        if (!foundDoc) missingDocs.push(documentName)
      })
      if (missingDocs.length) {
        throw new Error(`Falta los siguientes documentos para ser premium: ${missingDocs.join(',')}`)
      } else {
        return await userRepository.changeRol(uid);
      }
    } else {
      return await userRepository.changeRol(uid);
    }


  } catch (error) {
    throw Error(error)
  }
}
//TODO: Poner proteccion a los archivos
const uploadDocsService = async (files, email) => {
  try {
    const user = await userRepository.findUserByEmail(email);
    const file_keys = Object.keys(files);

    file_keys.forEach(key => {
      const find = user.documents?.find(document => document.name === key)
      if (find) {
        find.reference = `http://localhost:3001/documents/${files[key][0].filename}`
      }
      else {
        user.documents.push({
          name: files[key][0].fieldname,
          reference: `http://localhost:3001/documents/${files[key][0].filename}`
        })
      }
    })



    const result = await userRepository.updateUser(user)

    return true
  } catch (error) {
    throw Error(error)
  }

}

module.exports = {
  createUserService,
  findUserService,
  getAllUsersService,
  getUserByUsername,
  getUserByEmailService,
  changeRolService,
  updateUserService,
  loginLogoutUserService,
  uploadDocsService,
  cleanOldUserService
};
