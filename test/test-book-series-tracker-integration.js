// connect to db
// insert seed data into db
// make HTTP requests to API using the test client
// inspect the state of the db after request is made
// tear down the db


const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const book = require('../models/book');
console.log(book);

const User = require('../models/user');
console.log(User);

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {
    app,
    runServer,
    closeServer
} = require('../server');

// import TEST_DATABASE_URL from ('../config');
const {
    DATABASE_URL,
    TEST_DATABASE_URL
} = require('../config');
console.log(TEST_DATABASE_URL);





const {
    User,
    book
} = require('../models');

const {
    DATABASE_URL,
    TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);
const should = chai.should();
const username = 'demo';

function generateUser() {
    return {
        username: username,
        password: faker.lorem.words()
    }
}

function generateBook() {
    return {
        bookTitle: faker.lorem.sentence(),
        bookSubtitle: faker.lorem.sentence(),
        bookAuthor: faker.random.last_name(),
        bookThumbnail: 'public/images/book-thumbnail-placeholder.jpg',
        bookUser: username,
        bookSeries: ''
    }
}

function seedBook() {
    console.info('Seeding books');
    const books = [];
    for (let i = 0; i < 10; i++) {
        books.push(generateBook())
    }
    return Book.insertMany(books);
    console.log(`books are ${books}`);
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('book finder APIs', () => {
            before(() => {
                return runServer(TEST_DATABASE_URL)
                    .then(console.log('running server'))
                    .catch(err => console.log({
                        err
                    }));
            });
            beforeEach(() => {
                return seedBook();
            });
            describe('GET endpoints', () => {
                it('should return all users in db', () => {
                    return chai.request(app)
                        .get('/users')
                        .then((res) => {
                            res.should.have.status(200);
                            //                    res.body.should.have.length.of.at.least(1);
                        });
                });
            });


            //describe('GET endpoint to root URL', function () {
            //    before(function () {
            //        return runServer(TEST_DATABASE_URL);
            //    });
            //    after(function () {
            //        return closeServer();
            //    });
            //
            //    it('should retrieve book items on GET', function () {
            //        return chai.request(app)
            //            .get('/get-favorites')
            //            .then(function (res) {
            //                res.should.have.status(200);
            //                res.should.be.json;
            //                res.body.should.be.a('object');
            //                // It is quite possible for the app to work properly with zero items in the /get-favorites endpoint,
            //                // ... so we will NOT check for a minimum res.body.length.
            //            });
            //    });
            //});
            //
            //describe('POST endpoint to `/add-to-favorites`', function () {
            //    before(function () {
            //        return runServer(TEST_DATABASE_URL);
            //    });
            //    after(function () {
            //        return closeServer();
            //    });
            //    // TEST STRATEGY:
            //    // 1. Make a POST request with data for a new book item
            //    // 2. Inspect response object and check for correct status code and that '_id' exists
            //    it('should add a book item on POST to endpoint `/add-to-favorites`', function () {
            //        var newBook = {
            //            bookTitle: 'Harry Potter',
            //            bookSubtitle: 'Book 3',
            //            bookAuthor: 'J.K. Rowling',
            //            bookThumbnail: 'public/images/book-thumbnail-placeholder.jpg',
            //            bookUser: 'testUser',
            //            bookPublished: '2015',
            //            bookSeries: ''
            //        };
            //        return chai.request(app)
            //            .post('/add-to-favorites')
            //            .send(newBook)
            //            .then(function (res) {
            //                res.should.have.status(201);
            //                res.should.be.json;
            //                res.body.should.be.a('object');
            //                res.body.should.include.keys(
            //                    '_id',
            //                    'bookTitle',
            //                    'bookSubtitle',
            //                    'bookAuthor',
            //                    'bookThumbnail',
            //                    'bookUser',
            //                    'bookPublished',
            //                    'bookSeries');
            //                res.body._id.should.not.be.null;
            //                res.body.should.deep.equal(Object.assign(newBook, {
            //                    _id: res.body._id
            //                }));
            //            });
            //    });
            //});

            /

            // import chai and declare a variable for should
            const should = chai.should();

            chai.use(chaiHttp);

            describe('Users', function () {
                // Before our tests run, we activate the server. Our `runServer`
                // function returns a promise, and we return the promise by
                // doing `return runServer`. If we didn't return a promise here,
                // there's a possibility of a race condition where our tests start
                // running before our server has started.
                before(function () {
                    return runServer();
                });
                // Close server after these tests run in case
                // we have other test modules that need to
                // call `runServer`. If server is already running,
                // `runServer` will error out.
                after(function () {
                    return closeServer();
                });
                // `chai.request.get` is an asynchronous operation. When
                // using Mocha with async operations, we need to either
                // return an ES6 promise or else pass a `done` callback to the
                // test that we call at the end. We prefer the first approach, so
                // we just return the chained `chai.request.get` object.
                it('should list users on GET', function () {
                    chai.request(app)
                        .get('/')
                        .then(function (res) {
                            res.should.have.status(200);
                            done();

                            return true;
                        });
                });
            });
