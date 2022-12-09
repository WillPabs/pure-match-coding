const jwt = require('jsonwebtoken');

const verifyJWT = (token, secretKey) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (e) {
        console.log(e);
        return null;
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