// Create web server using express
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// GET /comments
// Route for all comments
router.get('/', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) {
      return next(err);
    }
    res.json(comments);
  });
});

// POST /comments
// Route for creating a new comment
router.post('/', function(req, res, next) {
  var comment = new Comment({
    username: req.body.username,
    body: req.body.body,
    created: new Date()
  });
  comment.save(function(err, comment) {
    if (err) {
      return next(err);
    }
    res.status(201).json(comment);
  });
});

// GET /comments/:id
// Route for specific comment
router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    res.json(comment);
  });
});

// PUT /comments/:id
// Route for updating a comment
router.put('/:id', function(req, res, next) {
  var id = req.params.id;
  Comment.findById(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    comment.username = req.body.username;
    comment.body = req.body.body;
    comment.save(function(err, comment) {
      if (err) {
        return next(err);
      }
      res.json(comment);
    });
  });
});

// DELETE /comments/:id
// Route for deleting a comment
router.delete('/:id', function(req, res, next) {
  var id = req.params.id;
  Comment.findByIdAndRemove(id, function(err, comment) {
    if (err) {
      return next(err);
    }
    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }
    res.json(comment);
  });
});

module.exports = router;