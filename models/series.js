var mongoose = require('mongoose');

var seriesSchema = new mongoose.Schema({
    //    bookTitle: {
    //        type: String,
    //        required: false
    //    },
    //    bookAuthor: {
    //        type: String,
    //        required: false
    //    },
    //    bookThumbnail: {
    //        type: String,
    //        required: false
    //    },
    //    bookUser: {
    //        type: String,
    //        required: false
    //        required: false
    //    },
    bookSeries: {
        type: String,
        required: false
    }
}, {
    collection: 'series'
});

var Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
