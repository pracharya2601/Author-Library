const express = require('express')
const router = express.Router()
const Author = require('../models/author')


//all authors
router.get('/', async (req, res) => {
    let searchOption = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOption.name = new RegExp(req.query.name, 'i')
        //RegExp is a regular expression. search for part of the text "i" is a flag
    }
    try{
        const authors = await Author.find(searchOption)
        res.render("authors/index", { 
            authors: authors, searchOption: req.query
        })
    } catch {
        res.redirect('/')
    }

})


//new authors routes to display form
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })
})


//create authors routes

// router.post ('/', (req, res) => {
//     const author = new Author({
//         name: req.body.name
//     })
//     author.save((err, newAuthor) => {
//         if (err) {
//             res.render('author/new', {
//                 author: author,
//                 errorMessage: 'Error creating Authors'
//             })
//         } else {
//             //change once setup the page
//             //res.redirect(`authors/${newSuthor.id}`) 
//             res.redirect('authors')
//         }
//     })
// })

//create authors routes in another async await way
router.post ('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try{
        const newAuthor = await author.save() //asyncroy
        //res.redirect(`authors/${newSuthor.id}`) 
        res.redirect('authors')

    } catch { //catch will catch alll the error
        res.render('author/new', {
            author: author,
            errorMessage: 'Error creating Authors'
        })
    }
})


module.exports = router