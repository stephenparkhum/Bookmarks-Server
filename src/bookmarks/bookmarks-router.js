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
        logger.info(`Bookmark with id ${id} created`);

        if (!title) {
            logger.error(`Title is required`);
            return res
                    .status(400)
                    .send('Title is required');
        }

        if (!content) {
            logger.error(`Content is required`);
            return res
                .status(400)
                .send('Content is required');
        }

        const newBookmark = bookmarks.find(bookmark => bookmark.id == id);

        res.send(newBookmark);
    });

bookmarksRouter
    .route('/bookmarks/:id')
    .get((req, res) => {
        const {id} = req.params;
        const bookmarkList = bookmarks.find(bookmark => bookmark.id == id);

        if (!bookmarkList) {
            logger.error(`Bookmark with id ${id} was not found`);
            return res
                    .status(404)
                    .send('Bookmark not found');
        }

        res.send(bookmarkList);
        
    })
    .delete((req, res) => {
        const {id} = req.params;

        const bookmarkIndex = bookmarks.findIndex(bookmark => bookmark.id == id);
        
        if (bookmarkIndex === -1) {
            logger.error(`Bookmark with id ${id} not found`);
            return res
                    .status(400)
                    .send('Not found');
        }

        bookmarks.splice(bookmarkIndex, 1);

        logger.info(`Bookmark with id ${id} deleted.`);
        res
            .status(204)
            .send(`Bookmark with id ${id} successfully deleted`);
            
        

    });

module.exports = bookmarksRouter;