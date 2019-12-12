const express = require('express');
const router = express.Router();
// const checkAuth = require('../middleware/checkAuth')
const APIFeatures = require('../utils/apiFeatures');

 const Quote = require('../models/QuoteModel')

// @route  get api/pbquotes
// @desc   get all user qoute
// @accses private


router.get('/',async (req, res) => {
    try {
        
        // const Quot = await Quote.find({ statu: "public"}).sort({date: -1});
        const countQuotes = await Quote.countDocuments()
        console.log(countQuotes)
        const features = new APIFeatures(Quote.find(), req.query)
        .sort()
        .search()
        .paginate();
      const quotes = await features.query;
            
        res.json({quotes, countQuotes});
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})

module.exports = router;