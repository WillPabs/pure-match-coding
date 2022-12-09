const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.id;
    const secret = 'secretKey';
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        next();
    } catch (e) {
        console.log(e);
        res.status(401).send("Unable to verify token");
    }
}

const createJWT = (user, secretKey) => {
    try {
        const token = jwt.sign({ user: user}, secretKey);
        return token;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    verifyJWT,
    createJWT
}