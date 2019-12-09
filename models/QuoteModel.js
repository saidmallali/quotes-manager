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

module.exports = mongoose.model('Quotes', QuoteSchema);
