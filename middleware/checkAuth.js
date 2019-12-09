const jwt = require('jsonwebtoken');
const config = require('config');

module.exports =  function(req, res, next) {
    // get token from header
    const token = req.header('x-auth-token');

    //check if not token 
    if(!token) {
        res.status(401).json({ msg: 'no token = no autorization'})
    }

    try {
        const decoded =  jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error.message)
        res.status(401).json({ msg: 'token is not valid'})
    }
}