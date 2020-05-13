var express = require('express');
var router = express.Router();

let { Book } = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
  
    let books_query = Book.find({});
        books_query.sort({ author: 1, series_number: 1 });
        let find_promise = books_query.exec();
        find_promise
            .then((books) => {
                res.json(books);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
});

router.post('/', function(req, res, next) {
    const new_book = new Book(req.body);

    let save_promise = new_book.save();
    save_promise
        .then((saved_book) => {
            res.json(saved_book);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
