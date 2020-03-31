const mongoose = require('mongoose');

const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName : {
        //pass the name of the image so that to store single string we can store image on server though
        type: String,
        required: true
    },
    author: {
        //references the author id from the author collection
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Author'
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath //export as a named variable