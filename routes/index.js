const express = require('express');
const router = express.Router();

const tweetController = require('../controllers/tweetController');
const modelController = require('../controllers/modelController');


router.get('/', tweetController.listTweets);
router.get('/tweet/:id', tweetController.tweetDetail);
router.get('/dashboard', modelController.dashboard);


module.exports = router;
