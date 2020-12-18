var express = require('express')
var router = express.Router()
var authMiddleware = require('../middleware/auth')
var auth = require('./auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})
router.use('/auth', auth)
router.use(authMiddleware.authenticate)

module.exports = router
