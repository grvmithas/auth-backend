var mongoose = require('mongoose')

function connectDb() {
  return mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

module.exports = {
  connectDb
}
