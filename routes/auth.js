const express = require('express');
const router = express.Router();
const bcrybt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const {check, validationResult} = require('express-validator');

const checkAuth = require('../middleware/checkAuth')
const User = require('../models/UsersModel');

// @route  get api/auth
// @desc   get logged in user
// @accses private


router.get('/',checkAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server erreur')
    }
});

// @route  post api/auth
// @desc   auth user & get token
// @accses public


router.post('/',[
    check('email', 'enter a valid email')
    .isEmail().withMessage('enter avalide email'),
    check('password','password is required')
    .exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
    }
    const { email, password} = req.body;

    try {
        let user = await User.findOne({ email});

        if(!user) {
            return res.status(400).json({ msg: "invalid credentials"})
        }
        const isMatch = await bcrybt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'invalid password'})
        }

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

});

module.exports = router;
