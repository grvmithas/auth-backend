var mongoose = require('mongoose')

function connectDb() {
  return mongoose.connect(process.env.DB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).catch(error=>{
    console.log(error,'mongoose error')
  })
}

module.exports = {
  connectDb
}
