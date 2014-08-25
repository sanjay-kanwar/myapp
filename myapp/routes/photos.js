/**
 * Created by sanjaykanwar on 22/08/2014.
 */
var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
var mongoose = require('mongoose');

var photos = [];
photos.push({
    name: "Node.js Logo",
    path: "http://nodejs.org/images/logos/nodejs-green.png"
});

photos.push({
    name: "Ryan Speaking",
    path: "http://nodejs.org/images/ryan-speaker.jpg"
});

exports.form = function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
};
Photo = mongoose.model('Photo');


exports.submit = function (dir) {
    return function (req, res, next) {
        var name = req.body.photo.name;
        Photo.create({
            name: name
        });
        res.redirect('/');
        res.end();
    };
};


exports.list = function (req, res, next) {
    Photo.find({}, function (err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
};


exports.search = function (dir) {
    return function (req, res, next) {
        var name = req.params.name;
        console.log(name);
        Photo.findByName({ name: name}, function (err, photo) {
            if (err) return next(err);
            res.render('photos/show.ejs',
                {
                    name: photo.title,
                    image: photo.image
                });
        });
    };
};

exports.edit = function (req, res) {
    Photo.find(function (err, photos) {
        res.render('photos/edit.ejs', {
            title: 'Express Todo Example',
            photos: photos,
            current: req.params.id
        });
    });
};

exports.update = function (req, res) {
    Photo.findById(req.params.id, function (err, photo) {
        photo.name = req.body.name;
        photo.save(function (err, photo, count) {
            res.redirect('/');
        });
    });
};