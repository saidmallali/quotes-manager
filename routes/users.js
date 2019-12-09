const express = require('express');
const router = express.Router();
const bcrybt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check, validationResult} = require('express-validator')

const User = require('../models/UsersModel');


// @route  get api/users
// @desc   register a user
// @accses public


router.post('/', [
    check('name', 'please enter your name')
    .isLength({min: 5}).withMessage('please anter a name more then 5 caracter'),
    check('email', 'enter your email')
    .isEmail().withMessage('enter avalide email'),
    check('password','please enter a password valide min 6 max 12')
    .isLength({min:6, max:12}),
    check('username', 'please enter a username').isLength({min:5})
],async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password, username} = req.body;
    try {

        let user = await User.findOne({email});
        let userName = await User.findOne({username})

        if(userName){
            return res.status(400).json({msg: 'user already exits'})
        }
        if(user ){
            return res.status(400).json({ msg: 'user already exists'})
        }

        user = new User({
            name,
            email,
            password,
            username
        })

        const salt = await bcrybt.genSalt(10);

        user.password = await bcrybt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
            }
        };
        const expiresTime = 3600;
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: expiresTime
        }, (err, token) => {
            if(err) throw err;
            res.json({ token, expiresTime})
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server errur')
    }

})

module.exports = router;