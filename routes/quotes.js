const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth')
const config = require('config')
const {check, validationResult} = require('express-validator')

// const User = require('../models/UsersModel');
const Quote = require('../models/QuoteModel')
// const LikeDislike = require('../models/LikeDislikeModel')

// @route  get api/quotes
// @desc   get all user qoute
// @accses private


router.get('/',checkAuth,async (req, res) => {
    try {
        const quotes = await Quote.find({ user: req.user.id }).sort({date: -1});
        res.json(quotes);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
})


// @route  GET api/quotes
// @desc   add new quote
// @accses private


router.post('/',
[
    checkAuth,
    [
      check('quote', 'quote is required')
        .not()
        .isEmpty()
    ]
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { quote, statu} = req.body;

    try {
      const newQuote = new Quote({
        quote,
        statu,
        user: req.user.id
      });

      const Quotes = await newQuote.save();

      // const newldk =new LikeDislike({
      //   quoteId: Quotes._id
      // })
      
      // const likedislike = await newldk.save();
      
      // res.json({Quotes: Quotes, likedislike: likedislike});
      res.json(Quotes);
    } catch (err) {
      console.error(er.message);
      res.status(500).send('Server Error');
    }
  });

// @route  PUT api/quotes/:id
// @desc   update quote
// @accses private


router.put('/:id',checkAuth, async (req, res) => {
  const { quote,statu} = req.body;

  // Build task object
  const quoteFields = {};
  if (quote) quoteFields.quote = quote;
  if (statu) quoteFields.statu = statu;

  try {
    let quotes = await Quote.findById(req.params.id);

    if (!quotes) return res.status(404).json({ msg: 'quote not found' });

    // Make sure user owns task (check id validation) 
    if (quotes.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    updateQuote = await Quote.findByIdAndUpdate(req.params.id,{ $set: quoteFields },{ new: true });

    res.json(updateQuote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/tasks/:id
// @desc   Delete task
// @accses private


router.delete('/:id',checkAuth, async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) return res.status(404).json({ msg: 'quote not found' });

    // Make sure user owns contact
    if (quote.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Quote.findByIdAndRemove(req.params.id);
    // await LikeDislike.findOneAndDelete({quoteId: req.params.id})

    res.json({ msg: 'quote removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
