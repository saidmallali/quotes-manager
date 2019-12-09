const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!']
      },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true
        },
    username:{
        type:String,
        required:[true,'Please provide a username' ]
    },
    avatar:{
        type:String,
    },
    password: {
        type: String,
        required: [true, 'please provied a passworde']
    },
    date: {
        type: Date,
        default: Date.now
    },
    // imgProfile: {

    // }

});

module.exports = mongoose.model('users', UserSchema);
