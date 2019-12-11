const mongoose = require('mongoose');


const QuoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    quote: {
        type: String,
        required: [true, 'please enter a Quote']
      },
    username:{
        type:String,
    },
    name:{
        type:String
    },
    avatar:{
        type:String
    },
    like: {
        type: Number,
        default:0,
        },
    date: {
        type: Date,
        default: Date.now
    },
    statu: {
        type: String,
        default: "private",
        // enum: {
        //     values: ['private', 'public'],
        //     message: 'private or public'
        //   }
    }


});

QuoteSchema.index({
    quote: 'text',
    // description: 'text',
  });
  // {
    //     weights: {
    //       name: 5,
    //       description: 1,
    //     },
    //   }

module.exports = mongoose.model('Quotes', QuoteSchema);
