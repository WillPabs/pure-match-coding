const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.id;
    const secret = 'secretKey';
    try {
        if (token === null || token === undefined) 
            return res.status(403).send({ message: 'Please Login' });
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                console.log('Verification error')
                return res.redirect('../auth/login');
            }
            else {
                req.user = user;
                next();
            }
        });
    } catch (e) {
        console.log(e);
        res.status(401).send("Unable to verify token");
    }
}

const createJWT = (user) => {
    try {
        const token = jwt.sign({ id: user.id}, config.secret, { expiresIn: config.jwtExpiration });
        return token;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    verifyJWT,
    createJWT
}