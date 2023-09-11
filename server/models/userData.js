const mongoose = require('mongoose')


const userDataSchema = new mongoose.Schema({
    userName: String,
    socketID: String
})

module.exports = mongoose.model('userData', userDataSchema)