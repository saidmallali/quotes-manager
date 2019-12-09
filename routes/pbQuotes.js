const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth')

const Quote = require('../models/QuoteModel')

// @route  get api/pbquotes
// @desc   get all user qoute
// @accses private


router.get('/',async (req, res) => {
    try {
        const quotes = await Quote.find({ statu: "public" }).sort({date: -1});
        res.json(quotes);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

module.exports = router;