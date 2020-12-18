const bcrypt = require('bcrypt')
const saltRounds = 10
var jwt = require('jsonwebtoken')
var User = require('../models/User')

function register(fields) {
  if (fields.password) {
    return bcrypt
      .hash(fields.password, saltRounds)
      .then((hash) => {
        var user = new User()
        user.name = fields.name
        user.password = hash
        user.phone = fields.phone
        user.email = fields.email
        user.userName = fields.userName
        return user
          .save()
          .then((data) => {
            return data
          })
          .catch((err) => err)
      })
      .catch((err) => err)
  } else {
    throw new Error('password not provided!')
  }
}

function updateUser(req) {
  var user = new user(req.user)
  if (req.body['_id']) {
    delete req.body['_id']
  }
  if (req.body['password']) {
    return bcrypt.hash(req.body['password'], saltRounds).then((hash) => {
      delete req.body['password']
      user.password = hash
      Object.keys(req.body).forEach((item) => {
        user[item] = req.body[item]
      })
      return user
        .save()
        .then((data) => data)
        .catch((err) => err)
    })
  } else {
    Object.keys(req.body).forEach((item) => {
      user[item] = req.body[item]
    })
    return user
      .save()
      .then((data) => data)
      .catch((err) => err)
  }
}

function signIn(user, password) {
  return bcrypt
    .compare(password, user.password)
    .then((response) => {
      if (!response) {
        return { status: 401 }
      }
      let jwtToken = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '1d',
        }
      )
      return {
        token: jwtToken,
        expiresIn: 3600,
        user: user,
        status: 200,
      }
    })
    .catch(() => {
      return {
        status: 401,
      }
    })
}

async function deleteUser(id) {
  try {
    return await User.findByIdAndDelete(id)
  } catch (err) {
    return err
  }
}

module.exports = {
  register,
  updateUser,
  signIn,
  deleteUser,
}
