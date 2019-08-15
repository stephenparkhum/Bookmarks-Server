const express = require('express');
const bookmarksRouter = express.Router();
const bodyParser = express.json();
const logger = require('../logger');
const uuid = require('uuid/v4');
const bookmarks = require('../store');

bookmarksRouter
    .route('/bookmarks')
    .get((req, res) => {
        res.json(bookmarks);
    })
    .post(bodyParser, (req, res) => {
        const id = uuid();

        const {title, content} = req.body;

        const bookmark = {
            id, 
            title, 
            content
        };

        bookmarks.push(bookmark);
        logger.info(`Book mark with id ${id} created`);

        if (!title) {
            logger.error(`Title is required`);
            return res;
        }

        if (!content) {
            logger.error(`Content is required`);
            return res;
        }
    });

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {

    })
    .delete((req, res) => {

    });

module.exports = bookmarksRouter;