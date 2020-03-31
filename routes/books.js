const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Book = require('../models/book')
const Author = require('../models/author')

//upload path variable
const uploadPath = path.join('public', Book.coverImageBasePath)

//variable for accepting image types
const imageMineTypes = ['images/jpeg', 'images/png', 'images/gif']
const upload = multer({
    dest: uploadPath,
    //file fiter for server whether it accepting or not
    fileFilter: (req, file, callback) => {
        callback(null, imageMineTypes.includes(file.mimetype))
    }
})


//all books
router.get('/', async (req, res) => {
    res.send('/books')
})


//new books route
router.get('/new',async (req, res) => {
    
    try {
        const authors = await Author.find({})
        const book = new Book()
        res.render('books/new', {
            authors: authors,
            book: book
        })
    } catch {
        res.redirect('/books')
    }
})


//create author routes
router.post ('/',upload.single('cover'),  async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: new Date(req.body.publishDate), 
        pageCount: req.body.pageCount,
        coverImageName:fileName,
        description: req.body.description
    })
    try {
        const newBook = await book.save()
        // res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch{

    }
})


module.exports = router