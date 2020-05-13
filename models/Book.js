const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book_schema = new Schema({
    title: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    series_title: String,
    series_number: Number,
    publish_date: Date,
    genre: {
        type: String,
        required: true
    },
});

const Book = mongoose.model('weston_personal_libraries', book_schema);

module.exports = Book;