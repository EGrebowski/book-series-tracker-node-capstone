"use strict";

var User = require('./models/user');
//var Lead = require('./models/lead');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var cors = require('cors');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

var server = undefined;

function runServer() {
    return new Promise(function (resolve, reject) {
        mongoose.connect(config.DATABASE_URL, function (err) {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, function () {
                console.log('Listening on localhost:' + config.PORT);
                resolve();
            }).on('error', function (err) {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(function (err) {
        return console.error(err);
    });
};

function closeServer() {
    return mongoose.disconnect().then(function () {
        return new Promise(function (resolve, reject) {
            console.log('Closing server');
            server.close(function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

// ----------- LEAD ENDPOINTS ------------------------
// GET: getting all the lead objects to populate the dashboard
app.get('/leads', function (req, res) {
    Lead
        .find()
        .then(function (leads) {
            res.json({
                leads: leads.map(function (lead) {
                    return lead;
                })
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

// GET: getting one lead object
app.get('/leads/:id', function (req, res) {
    Lead
        .findById(req.params.id).exec().then(function (lead) {
            return res.json(lead);
        })
        .catch(function (leads) {
            console.error(err);
            res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

// POST: signing in a user
// next step is verifying and validating the user credentials
app.post('/login', function (req, res) {
    var user = req.body.username;
    var pwd = req.body.password;
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                // bad username
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        console.log('There was an error validating the password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        var logInTime = new Date();
                        console.log("User logged in: " + req.body.username + ' at ' + logInTime);
                        return res.json(items);
                    }
                });
            };
        });
});

// POST: creating a new user
// TODO: ensure a user cannot sign up with the same username as already exists in the system
// step 4 (continuing from client.js): local API endpoint in server.js
app.post('/users/create', function (req, res) {
    var username = req.body.username;
    username = username.trim();
    var password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                username: username,
                password: hash,
            }, function (err, item) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                if (item) {
                    console.log("User `" + username + "` created.");
                    return res.json(item);
                }
            });
        });
    });
});

// POST: creating a new lead
// step b4 (continuing from client.js): local API endpoint in server.js
app.post('/leads', function (req, res) {
    // step b5: send the local data to the database
    Lead.create({
        position: req.body.position,
        company: req.body.company,
        funnelStage: req.body.funnelStage,
        companyOverview: req.body.companyOverview,
        companySize: req.body.companySize,
        positionLocation: req.body.positionLocation,
        salaryBenefits: req.body.salaryBenefits,
        jobDescription: req.body.jobDescription,
        applicationDate: req.body.applicationDate,
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        applicationMaterials: req.body.applicationMaterials,
        interviewDate: req.body.interviewDate,
        interviewFollowUp: req.body.interviewFollowUp,
        leadSource: req.body.leadSource,
        notes: req.body.notes,
        rating: req.body.rating,
        username: req.body.username
    }, function (err, lead) {
        // step b6: return the result of DB call
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        // step b7: send the result back to client.js
        res.status(201).json(lead);

    });
});

// PUT: updating a lead
app.put('/leads/:id', function (req, res) {
    var toUpdate = {};
    var updateableFields = ['position', 'company', 'funnelStage', 'companyOverview', 'companySize', 'positionLocation', 'salaryBenefits', 'jobDescription', 'applicationDate', 'contactName', 'contactEmail', 'applicationMaterials', 'interviewDate', 'interviewFollowUp', 'leadSource', 'notes', 'rating'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });
    Lead.findByIdAndUpdate(req.params.id, {
        $set: toUpdate
    }).exec().then(function (lead) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// DELETE: deleting a lead
app.delete('/leads/:id', function (req, res) {
    Lead.findByIdAndRemove(req.params.id).exec().then(function (lead) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
