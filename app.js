var express = require('express')
require('dotenv').config()
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const cors = require('cors')

var indexRouter = require('./src/routes/index')
var  corsOptions = {
  origin: 'http://localhost:3000'
}
var app = express()
app.use(logger('dev'))
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', indexRouter)
module.exports = app
