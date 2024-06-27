const mongoose = require('mongoose');

const { Schema } = mongoose;

const MovieSchema = new Schema({
    email : {
        type : String,
        unique: true,
        required: true
    },
    movie_data : {
        type : Array,
        required: true
    }
})

module.exports = mongoose.model('movie', MovieSchema)